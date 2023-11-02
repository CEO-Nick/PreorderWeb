var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = firestore.getFirestore();


const predefinedOrders = [
  // 여기에 미리 정의된 주문 데이터를 배열로 배치합니다.
  {
    "orderId": "001",
    "uid": "m87pDkxHMscp65ZY7030o6APMEn1",
    "timestamp": admin.firestore.FieldValue.serverTimestamp(),
    "pickupTime": 15, // 15분 후
    "items": [
      {
        "productName": "카페라떼(HOT)",
        "quantity": 1,
        "productPrice": 1800,
        "options": [
          {
            "optionName": "사이즈업",
            "optionPrice": 300
          },
          {
            "optionName": "샷 추가",
            "optionPrice": 500
          }
        ]
      },
      {
        "productName": "자바칩 카페라떼(ICE)",
        "quantity": 2,
        "productPrice": 2200,
        "options": [
          {
            "optionName": "사이즈업",
            "optionPrice": 300
          },
          {
            "optionName": "샷 추가",
            "optionPrice": 500
          }
        ]
      }
    ],
    "totalPrice": 8600,
    "status": "ORDER"
  },
  {
    "orderId": "002",
    "uid": "5ftXqfVGZbdTZQ0SAiEIcz5fEEo2",
    "timestamp": admin.firestore.FieldValue.serverTimestamp(),
    "pickupTime": 5, // 5분 후
    "items": [
      {
        "productName": "아메리카노(HOT)",
        "quantity": 1,
        "productPrice": 1500,
        "options": [
            {
              "optionName": "사이즈업",
              "optionPrice": 300
            },
            {
              "optionName": "헤이즐넛 시럽추가",
              "optionPrice": 500
            }
        ]
      },
      {
        "productName": "아메리카노(HOT)",
        "quantity": 1,
        "productPrice": 1500,
        "options": 
          [
            {
              "optionName": "헤이즐넛 시럽추가",
              "optionPrice": 500
            }
        ]
      }
    ],
    "totalPrice": 4300,
    "status": "ORDER"
  },
  {
    "orderId": "003",
    "uid": "RMleD2zwroMD9XLTiamnVSlIGmg1",
    "timestamp": admin.firestore.FieldValue.serverTimestamp(),
    "pickupTime": 10, // 20분 후
    "items": [
      {
        "productName": "아메리카노(ICE)",
        "quantity": 5,
        "productPrice": 1500,
        "options": [
            {
              "optionName": "사이즈업",
              "optionPrice": 300
            },
            {
              "optionName": "헤이즐넛 시럽추가",
              "optionPrice": 500
            }
        ]
      },
    ],
    "totalPrice": 7500,
    "status": "ORDER"
  },
  {
    "orderId": "004",
    "uid": "RMleD2zwroMD9XLTiamnVSlIGmg1",
    "timestamp": admin.firestore.FieldValue.serverTimestamp(),
    "pickupTime": 3, 
    "items": [
      {
        "productName": "바닐라 카페라떼(ICE)",
        "quantity": 1,
        "productPrice": 2100,
        "options": [
            {
              "optionName": "사이즈업",
              "optionPrice": 300
            },
          ]
      },
      {
        "productName": "민트 카페라떼(ICE)",
        "quantity": 1,
        "productPrice": 2200,
        "options": []
      },
      {
        "productName": "카라멜마끼야또(ICE)",
        "quantity": 3,
        "productPrice": 2100,
        "options": [
            {
              "optionName": "사이즈업",
              "optionPrice": 300
            },
          ]
      },
    ],
    "totalPrice": 11800,
    "status": "ORDER"
  },
  // 추가 주문 데이터...
];

const saveOrders = async () => {
  for (let i = 0; i < predefinedOrders.length; i++) {
    await new Promise(resolve => {
      setTimeout(async () => {
        const orderRef = db.collection("orders").doc(`order${i + 1}`);
        await orderRef.set(predefinedOrders[i]);
        console.log(`Order${i + 1} 저장 완료`);
        resolve();
      }, 5000); //5초 간격으로 주문 데이터 저장
    });
  }
};

saveOrders();