var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();

const inventoryItems = {
  "복숭아 아이스티 파우더": 1000,
  "레몬청": 1000,
  "유자청": 1000,
  "자몽청": 1000,
  "녹차 파우더": 1000,
  "우유": 1000,
  "초코 파우더": 1000,
  "다크 초코 파우더": 1000,
  "민트초코 파우더": 1000,
  "자바칩": 1000,
  "자색 고구마 파우더": 1000,
  "쿠키앤크림 파우더": 1000,
  "시럽": 1000,
  "원두": 1000,
  "민트 파우더": 1000,
  "바닐라 시럽": 1000,
  "순바닐라 파우더": 1000,
  "카라멜 시럽": 1000,
  "헤이즐넛 시럽": 1000,
  "레몬 티백": 200,
  "네이블오렌지 티백": 200,
  "루이보스허브 티백": 200,
  "유자 티백": 200,
  "자몽 티백": 200,
  "케모마일 허브 티백": 200,
  "페퍼민트 허브 티백": 200,
  "히비스커스애플 티백": 200,
  "펄": 1000
};

const saveInventoryData = async () => {
  const inventoryRef = db.collection("inventory").doc("stock");

  // Enhanced inventory items with status
  const enhancedInventoryItems = {};
  Object.entries(inventoryItems).forEach(([itemName, quantity]) => {
      enhancedInventoryItems[itemName] = {
          quantity: quantity,
      };
  });

  await inventoryRef.set(enhancedInventoryItems);

  console.log("재고 데이터 저장 완료");
};

saveInventoryData();
