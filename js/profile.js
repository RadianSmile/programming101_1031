
var profileUser ;
var pfofileUid = (function (){
	var srh = getQueryString();
	var profileUser = new Parse.User();
	var q = new Parse.Query(Parse.User);
	q.equalTo('ID',srh.uid);
	q.first().then(function(p){
		console.log (p);
		profileUser = p ;
		console.log(profileUser);
		showPersonAndCard(profileUser);
		ShowAssignStart(profileUser);
	},Log);

	return srh.uid ;
})();


