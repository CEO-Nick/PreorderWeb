function signOutUser() {
    auth.signOut().then(() => {
        alert(`성공적으로 로그아웃되었습니다.`);
        window.location.href = "login.html";
    }).catch((error) => {
        alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
        console.error("Error signing out: ", error);
    });
}

