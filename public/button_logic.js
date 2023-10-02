function changeStatus(btn) {
    if (btn.innerText === "접수하기") {
        btn.innerText = "준비완료";
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    } else if (btn.innerText === "준비완료") {
        btn.innerText = "픽업완료";
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-warning');
    } else if (btn.innerText === "픽업완료") {
        btn.innerText = "처리완료";
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-success');
        btn.disabled = true;
        
    }
}

function printReceipt(orderId) {
    alert("영수증 출력하기: " + orderId);
}

function viewDetails(orderId) {
    alert("주문 상세 : " + orderId);
}