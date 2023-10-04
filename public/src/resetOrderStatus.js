var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();

const updateOrderStatus = async () => {
  // "orders" 컬렉션의 모든 문서를 가져옵니다.
  const ordersRef = db.collection("orders");
  const snapshot = await ordersRef.get();

  // 각 문서의 'status' 필드를 'ORDER'로 업데이트합니다.
  const updatePromises = [];
  snapshot.forEach(doc => {
    updatePromises.push(ordersRef.doc(doc.id).update({ status: "ORDER" }));
  });

  // 모든 업데이트 프로미스가 완료될 때까지 기다립니다.
  await Promise.all(updatePromises);
  console.log(`Updated status to 'ORDER' for ${updatePromises.length} documents.`);
};

updateOrderStatus();
