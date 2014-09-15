Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");

function checkUser(){
	if (!Parse.User.current()){
		alert ("你尚未登入，系統將自動跳轉到首頁");
		window.location = 'index.html';
	}
}
checkUser ();