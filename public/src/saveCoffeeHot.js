var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();
  
  const products = [
    "에스프레소",
    "아메리카노(HOT)",
  "바닐라 카페라떼(HOT)",
  "순바닐라 카페라떼(HOT)",
  "달달 아메리카노(HOT)",
  "카페라떼(HOT)",
  "카라멜 카페라떼(HOT)",
  "헤이즐넛 카페라떼(HOT)",
  "민트 카페라떼(HOT)",
  "다크 카페라떼(HOT)",
  "자바칩 카페라떼(HOT)",
  "달달 카페라떼(HOT)",
  "카페모카(HOT)",
  "카푸치노(HOT)",
  "카라멜마끼야또(HOT)"
  ];
  
  const costs = [
    1500,1500,1900,
    2000,1700, 1800,
    1900,1900,2000,
    2000,2000,2000,
    1900,1800,1900
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
    const categoryRef = db.collection("category").doc("coffee hot");
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