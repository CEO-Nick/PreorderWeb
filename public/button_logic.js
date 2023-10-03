// 상태 버튼 함수
function changeStatus(btn, orderId) {
    console.log("changeStatus called with orderId:", orderId);
    let newStatus = '';
    let btnNewText = '';
    let btnRemoveClass = '';
    let btnAddClass = '';

    // Check the current button state and define next state and styles
    if (btn.innerText === "접수하기") {
        newStatus = 'ACCEPT';
        btnNewText = '준비완료';
        btnRemoveClass = 'btn-primary';
        btnAddClass = 'btn-warning';
    } else if (btn.innerText === "준비완료") {
        newStatus = 'READY';
        btnNewText = '픽업완료';
        btnRemoveClass = 'btn-warning';
        btnAddClass = 'btn-secondary';
    } else if (btn.innerText === "픽업완료") {
        newStatus = 'FINISH';
        btnNewText = '처리완료';
        btnRemoveClass = 'btn-secondary';
        btnAddClass = 'btn-success';
    }

    // Find the document with the specified orderId in the orders collection
    db.collection("orders").where("orderId", "==", orderId).get()
        .then((querySnapshot) => {
            // Go through the results (should be only one if orderId is unique)
            querySnapshot.forEach((doc) => {
                // Get the document ID and update
                const docId = doc.id;

                // Update the Firestore document
                db.collection("orders").doc(docId).update({
                    status: newStatus
                }).then(() => {
                    // Update the button state and style in the UI
                    btn.innerText = btnNewText;
                    btn.classList.remove(btnRemoveClass);
                    btn.classList.add(btnAddClass);

                    // Disable the button if the order is finished
                    if (newStatus === 'FINISH') {
                        btn.disabled = true;
                    }
                }).catch((error) => {
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


function printReceipt(orderId) {
    alert("영수증 출력하기: " + orderId);
}

function viewDetails(orderId) {
    alert("주문 상세 : " + orderId);
}