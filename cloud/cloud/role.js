Parse.Cloud.definde("getRole",function(rq,rp){
	Parse.Cloud.useMasterKey();
	
	var q = new Parse.Query(Parse.Role);
	q.find().then(Log,Log);
	
})