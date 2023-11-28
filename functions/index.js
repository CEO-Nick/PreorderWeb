/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.updateInventoryOnOrder = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
        const newOrderData = change.after.data();
        const oldOrderData = change.before.data();
    

        if (oldOrderData.status !== "ACCEPTED" && newOrderData.status === "ACCEPTED") {
            const items = newOrderData.items;

            const stockRef = db.collection('inventory').doc('stock');

            logger.log("Processing order", { orderId: context.params.orderId, numberOfItems: items.length });

            for (const item of items) {
                const productName = item.productName;
                logger.log("Processing item", { productName });

                // 제품 및 옵션 재고 업데이트
                await updateProductStock(productName, item.options, item.quantity, stockRef);
                await updateOptionsStock(item.options, item.quantity, stockRef);
            }
        } else {
            logger.log("status가 ORDER 에서 ACCEPTED 로 변경되지 않았습니다");
            return null;
        }
    });

async function updateProductStock(productName, options, quantity, stockRef) {
    for (const category of ['ADE & ICE TEA', 'BEVERAGE', 'COFFEE(HOT)', 'COFFEE(ICE)', 'FRUIT TEA & BLENDING TEA', 'MILK TEA & BUBBLE TEA']) {
        const drinkRef = db.collection('category').doc(category).collection('drinks').doc(productName);
        const drinkDoc = await drinkRef.get();

        if (drinkDoc.exists) {
            let ingredients = drinkDoc.data().ingredient;
            logger.log("Found matching product", { category, productName, ingredients });

            // 옵션에 따른 재료 사용량 조정
            for (const option of options) {
                if (option.optionName === "사이즈업") {
                    ingredients = await adjustIngredientsForOption(ingredients, option.optionName);
                }
            }

            // 재고를 업데이트합니다.
            await updateStock(ingredients, quantity, stockRef);
        }
    }
}

async function adjustIngredientsForOption(ingredients, optionName) {
    const optionRef = db.collection('option').doc(optionName);
    const optionDoc = await optionRef.get();

    if (!optionDoc.exists) {
        logger.warn("Option document not found", { optionName });
        return ingredients;
    }

    const optionData = optionDoc.data();
    const optionFactor = optionData.ingredient[optionName];

    // 옵션의 인자에 따라 제품의 재료 사용량 조정
    for (const ingredient in ingredients) {
        ingredients[ingredient] *= optionFactor;
    }

    return ingredients;
}

async function updateOptionsStock(options, quantity, stockRef) {
    for (const option of options) {
        const optionName = option.optionName;

        if (optionName === "사이즈업") {
            continue;
        }
        
        const optionRef = db.collection('option').doc(optionName);
        const optionDoc = await optionRef.get();

        // 옵션 문서가 존재하지 않는 경우 로그를 남기고 다음 옵션으로 넘어갑니다.
        if (!optionDoc.exists) {
            logger.warn("Option document not found", { optionName });
            continue;
        }

        const optionData = optionDoc.data();
        const ingredients = optionData.ingredient;
        logger.log("Found matching option", { optionName, ingredients });

        // 옵션 재고를 업데이트합니다.
        await updateStock(ingredients, quantity, stockRef);
    }
}

async function updateStock(ingredients, quantity, stockRef) {
    await db.runTransaction(async (transaction) => {
        const stockDoc = await transaction.get(stockRef);
        if (!stockDoc.exists) {
            throw "Stock document does not exist!";
        }

        const stockData = stockDoc.data();

        for (const [ingredient, amount] of Object.entries(ingredients)) {
            const ingredientField = `${ingredient}.quantity`;
            if (!stockData.hasOwnProperty(ingredient) || !stockData[ingredient].hasOwnProperty('quantity')) {
                throw "Ingredient or quantity not found in stock!";
            }

            const originQuantity = stockData[ingredient].quantity
            logger.log("Before Quantity", { ingredient, originQuantity });
            const newQuantity = stockData[ingredient].quantity - amount * quantity;
            logger.log("After Quantity", { ingredient, newQuantity });
            transaction.update(stockRef, {[ingredientField]: newQuantity});
            logger.log("Updated stock for ingredient", { ingredient, newQuantity });
        }
    });
}