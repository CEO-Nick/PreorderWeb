var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();


const products = [
    "블랙 버블티", "곡물 버블티", "쿠키앤크림 버블티",
    "자색고구마 버블티", "망고 버블티", "딸기 버블티"
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
    const categoryRef = db.collection("category").doc("milk tea & bubble tea");
    const drinksCollection = categoryRef.collection("drinks");
  
    for(let i = 0; i < products.length; i++) {
      const productDoc = drinksCollection.doc(products[i]);
      await productDoc.set({
        제품명: products[i],
        가격: 2800,
        판매여부: true,
        옵션: options
      });
    }
  
    console.log("데이터 저장 완료");
  }
  
  saveData();