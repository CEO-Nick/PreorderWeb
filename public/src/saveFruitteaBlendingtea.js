var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();


const products = [
    "자몽차(HOT)", "자몽차(ICE)", "레몬차(HOT)",
    "레몬차(ICE)", "유자차(HOT)", "유자차(ICE)",
    "루이보스 허브티(HOT)", "루이보스 허브티(ICE)", "케모마일 허브티(HOT)",
    "케모마일 허브티(ICE)", "페퍼민트 허브티(HOT)", "페퍼민트 허브티(ICE)",
    "히비스커스애플 블렌딩티(HOT)", "히비스커스애플 블렌딩티(ICE)", "네이블오렌지 블렌딩티(HOT)",
    "네이블오렌지 블렌딩티(ICE)"
];

const costs = [
    1500, 1700, 1500,
    1700, 1500, 1700,
    1500, 1700, 1500,
    1700, 1500, 1700,
    1500, 1700, 1500,
    1700
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
    const categoryRef = db.collection("category").doc("fruit tea & blending tea");
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