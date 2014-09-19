
var profileUser ;
var pfofileUid = (function (){
	var srh = getQueryString();
	var profileUser = new Parse.User();
	var q = new Parse.Query(Parse.User);
	q.equalTo('ID',srh.uid);
	q.first().then(function(p){
		if (typeof p === 'undefined') {
			alert('系統無法判別你選取的使用者，請重新點取\n系統將跳返至個人主頁');
			document.location = 'dashboard.html';
		}
		console.log (p);
		profileUser = p ;
		console.log(profileUser);
		showPersonAndCard(profileUser);
		ShowAssignStart(profileUser);
	},Log);

	return srh.uid ;
})();


