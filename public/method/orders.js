function changeStatus(btn, orderId) {
    //console.log("changeStatus called with orderId:", orderId);

    // Find the document with the specified orderId in the orders collection
    db.collection("orders").where("orderId", "==", Number(orderId)).get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            const currentStatus = doc.data().status;
            let newStatus = '';
    
            switch (currentStatus) {
                case "ORDER":
                    newStatus = 'ACCEPTED';
                    break;
                case "ACCEPTED":
                    newStatus = 'READY';
                    break;
                case "READY":
                    newStatus = 'FINISHED';
                    break;
                default:
                    console.log("Unknown status: ", currentStatus);
                    return;
            }

            // Update Firestore document
            doc.ref.update({
                status: newStatus
            }).then(() => {
                console.log("Status updated successfully in Firestore for orderId:", orderId);
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        });
    }).catch((error) => {
        console.error("Error finding document: ", error);
    });
}



function viewDetails(orderId) {
    db.collection("orders").where("orderId", "==", Number(orderId)).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const order = doc.data();

            let orderDetailsHtml = "";
            let total = 0;
            let totalDrinks = 0;
            let specialRequest = "";

            // 주문번호 표시
            orderDetailsHtml += `<div class="order-detail-row">
                <div class="product-name">주문번호</div>
                <div class="quantity"></div>
                <div class="price">${orderId}</div>
            </div>`;
            orderDetailsHtml +=  `<div class="border-line"></div>`; 

            // 픽업 시간 계산 및 표시
            let pickupDate = new Date(order.timestamp.toDate());
            pickupDate.setMinutes(pickupDate.getMinutes() + order.pickupTime);

            let pickupTimeString = pickupDate.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit' });  // 시간과 분만 표시

            orderDetailsHtml += `<div class="order-detail-row">
                <div class="product-name">픽업 시간</div>
                <div class="quantity"></div>
                <div class="price">${pickupTimeString}</div>
            </div>`;
            orderDetailsHtml +=  `<div class="border-line"></div>`; 
            
            // 요청사항 표시
            specialRequest = order["specialRequest"]
            orderDetailsHtml += `<div class="order-detail-row">
                <div class="product-name">요청 사항</div>
                <div class="quantity"></div>
                <div class="price">${specialRequest}</div>
            </div>`;
            orderDetailsHtml +=  `<div class="border-line"></div>`; 

            // 주문 내역 출력
            order.items.forEach((item, index) => {
                let itemTotal = item.productPrice * item.quantity;
                totalDrinks += item.quantity;

                orderDetailsHtml += `<div class="order-detail-row">
                    <div class="product-name">${item.productName}</div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="price">${itemTotal.toLocaleString('ko-KR')}</div>
                </div>`;


                item.options.forEach(option => {
                    let optionTotal = option["optionPrice"] * item.quantity;

                    orderDetailsHtml += `<div class="order-detail-row">
                        <div class="product-name">↳ ${option["optionName"]}</div>
                        <div class="quantity">${item.quantity}</div>
                        <div class="price">${optionTotal.toLocaleString('ko-KR')}</div>
                    </div>`;

                    itemTotal += optionTotal;
                });

                total += itemTotal;
                if (index !== order.items.length-1) {
                    orderDetailsHtml +=  `<div class="dotted-line"></div>`; 
                }
            });

            orderDetailsHtml += `<div class="border-line"></div>`;
            orderDetailsHtml += `<div class="order-detail-row">
                                    <div class="product-name">합계</div>
                                    <div class="quantity">${totalDrinks}</div>
                                    <div class="price">${total.toLocaleString('ko-KR')}</div>
                                </div>`;

            document.getElementById('orderDetailContent').innerHTML = orderDetailsHtml;
            const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
            modal.show();
        });
    }).catch((error) => {
        console.error("Error finding order details: ", error);
    });
}

