var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();
  
  const products = [
    "아메리카노(ICE)",
    "바닐라 카페라떼(ICE)",
    "순바닐라 카페라떼(ICE)",
    "달달 아메리카노(ICE)",
    "카페라떼(ICE)",
    "카라멜 카페라떼(ICE)",
    "헤이즐넛 카페라떼(ICE)",
    "민트 카페라떼(ICE)",
    "다크 카페라떼(ICE)",
    "자바칩 카페라떼(ICE)",
    "달달 카페라떼(ICE)",
    "카페모카(ICE)",
    "카라멜마끼야또(ICE)"
  ];
  
  const costs = [
    1500,
    2100,
    2200,
    1900,
    2000,
    2100,
    2100,
    2200,
    2200,
    2200,
    2200,
    2100,
    2100
  ];
  
  const options = [
    "option/바닐라 시럽추가",
    "option/버블추가",
    "option/사이즈업",
    "option/샷추가",
    "option/카라멜 시럽추가",
    "option/헤이즐넛 시럽추가"
  ].map(optionPath => db.doc(optionPath));  // Convert paths to references
  
  
const updateData = async () => {
    const categoryRef = db.collection("category").doc("coffee ice");
    const drinksCollection = categoryRef.collection("drinks");
  
    for(let i = 0; i < products.length; i++) {
      const productDoc = drinksCollection.doc(products[i]);
      await productDoc.update({
        제품명: products[i],
        가격: costs[i],
        판매여부: true,
        옵션: options
      });
    }
  
    console.log("데이터 저장 완료");
  }
  
  updateData();