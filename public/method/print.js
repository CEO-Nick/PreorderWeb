function printOrderDetails() {
    let printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write('<html><head><title>Print</title>');
    // 여기에 필요한 CSS 파일 또는 스타일을 추가합니다.
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.getElementById('orderDetailContent').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

