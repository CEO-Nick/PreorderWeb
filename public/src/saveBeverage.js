var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();


const products = [
    "초코(HOT)", "초코(ICE)", "그린티라떼(HOT)",
    "그린티라떼(ICE)", "자색고구마 라떼(HOT)", "자색고구마 라떼(ICE)",
    "쿠키앤크림 라떼(HOT)", "쿠키앤크림 라떼(ICE)", "민트초코 라떼(HOT)",
    "민트초코 라떼(ICE)", "자바칩초코 라떼(HOT)", "자바칩초코 라떼(ICE)",
    "다크초코 라떼(HOT)", "다크초코 라떼(ICE)"
];

const costs = [
    1700, 1900, 2000, 
    2200, 2000, 2200, 
    2000, 2200, 2000,
    2200, 2000, 2200,
    2000, 2200
];

const options = [
    "option/바닐라 시럽추가",
    "option/버블추가",
    "option/사이즈업",
    "option/샷추가",
    "option/카라멜 시럽추가",
    "option/헤이즐넛 시럽추가"
  ].map(optionPath => db.doc(optionPath));  // Convert paths to references
  
  
const saveData = async () => {
    const categoryRef = db.collection("category").doc("beverage");
    const drinksCollection = categoryRef.collection("drinks");
  
    for(let i = 0; i < products.length; i++) {
      const productDoc = drinksCollection.doc(products[i]);
      await productDoc.set({
        제품명: products[i],
        가격: costs[i],
        판매여부: true,
        옵션: options
      });
    }
  
    console.log("데이터 저장 완료");
  }
  
  saveData();