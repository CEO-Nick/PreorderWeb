var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();

const orderData = {
    items: [
      {
        itemPrice: 3200,
        options: [
          { optionName: "바닐라 시럽추가", optionPrice: 500 },
          { optionName: "버블추가", optionPrice: 500 }
        ],
        productId: "hHZ2WQ77tE34GfQTiKlj",
        productName: "다크 카페라떼(ICE)",
        productPrice: 2200,
        quantity: 1
      }
    ],
    orderId: 55,
    pickupTime: 1,
    specialRequest: "",
    status: "ORDER",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    totalPrice: 3200,
    uid: "xRvZpioDkkfGmYkoKBAIVjuvFA63"
  };
  
  // Firestore에 문서 추가
  db.collection('orders').doc('order5').set(orderData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });