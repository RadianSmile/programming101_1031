Parse.initialize("sdPsOfCJu21F7DIrFF08tDwuVtfZZbx1sLwMbMDB", "11wLPl0BPrkmtTlba00jZfvPtxKR9TNCxoLp3Rrb");

function checkUserAndNoti(){
	var user = Parse.User.current();
	if (!user){
		alert ("你尚未登入，系統將自動跳轉到首頁");
		window.location = 'index.html';
	}else{
		var CardRecord = Parse.Object.extend("Card_record");
		var EventRecord = Parse.Object.extend("Event_Record");
		
		// check card not noti length ;
		var qCrd = new Parse.Query (CardRecord);
		qCrd.equalTo('targetuser',user);
		qCrd.notEqualTo('isNotif',true);
		qCrd.notEqualTo('type','get');
		qCrd.find().then(noti);
		
		// check event not noti length
		var qErd = new Parse.Query (EventRecord);
		qErd.equalTo('target',user);
		qErd.notEqualTo('isNoti',true);
		qErd.find().then(noti);
		
		// the control function
		function noti (count){
			console.log (count)
			if (count.length > 0 ){
				$("#bell").addClass('hasNoti');
			}
		}	
	}
}
checkUserAndNoti ();