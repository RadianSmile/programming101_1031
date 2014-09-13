
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});
Parse.Cloud.define("getRole",function(rq,rp){
	Parse.Cloud.useMasterKey();
	
	var q = new Parse.Query(Parse.Role);
	q.find().then(rp.success,rp.error);
	
})


/*Parse.Cloud.beforeSave("Event_Record",function(request){
	
});*/

Parse.Cloud.beforeSave(Parse.User,function(request,response){
	Parse.Cloud.useMasterKey();
	var obj = request.object;
	console.log ("----------------------------------------------" + obj.get("rolePwd"));
	if (typeof (obj.get("rolePwd")) === 'undefined' ){ // 這時候代表不是註冊或是已經處理完了，完全不用處理
		console.log ("已經註冊過/或是新增FB資料中~沒有事情發生");
		response.success();
	}else { // 這時候代表剛註冊完///
		console.log ("Obj.id = "+obj.id) ;
		if (typeof(obj.id) === 'undefined'){response.success();}
		var q = new Parse.Query (Parse.User);
		q.get(obj.id).then(JudgeRole,noAction)
		.then(addRoleToUser)  //新增角色
		 // 東西都完成了，密碼可以解除，之後就不會再進來initialize了
		.then(sucs,error); // 
	} // end if 
	
	function sucs (s){
		obj.unset("rolePwd");
		console.log ("有成功做到最後一步！")
		response.success();
	}
	function error (e){
		console.log (e.message);	
		response.error(e.message);
	}
	function statusRowExist(e){
		console.log ("使用者狀態已經存在，是否出錯了？");
		error(e);
	}
	
	function JudgeRole (pwd){
		console.log ("正在判斷使用者");
		var pwd = obj.get("rolePwd"); 
		var q = new Parse.Query(Parse.Role);

		if (pwd === "std781"){
			q.equalTo("name","Student");
			return q.first();
		}else if (pwd === "m6s/6cl6781!") {
			q.equalTo("name","Teacher");
			return q.first()
		}else if (pwd === "ta-781!"){
			q.equalTo("name","Assistant");
			return q.first()
		}else { //密碼錯誤
			console.log ("! the wrong pwd");
			response.error("密碼有誤，請重新整理頁面再操作一次！");
		}
	}
	
	function noAction(e){// 這時候代表，我還沒存進系統，暫時不處理。
		console.log ("! Adding FB ~ will Add role next step");			
		response.success("Fb Add Done");
	}
	function addRoleToUser (role){
		console.log ("把使用者塞進角色");
		role.getUsers().add(obj);
		return role.save();
	}
	function error (e) {
		//console.log ("! "+e.message);
		response.error (e);
	}
});
Parse.Cloud.afterSave(Parse.User,function(rq){
	Parse.Cloud.useMasterKey();
	var Status = Parse.Object.extend("User_status");
	var obj = rq.object;
	firstStatusRow()
		.then(addStatusRow)
		.then(function(s){
			//console.log ("Status Row 新增成功！！！");			
		},function(e){console.log (e.message);})
	
	function firstStatusRow (){
		console.log ("正在抓取status");
		var q = new Parse.Query(Status);
		q.equalTo("User",obj);
		return q.first();
	}
	function addStatusRow (s){ // 再次確認他有沒有 status
		//console.log ("first的長度 "+typeof(s));
		if (typeof(s)=== 'undefined'){ // 代表這時候還沒有任何 status///
		 console.log ("這時候還沒有任何的status row");
			var status = new Status ();		
			status.set("User",obj);
			status.set("HP",90);
			status.set("XP",0);
			status.set("Life",3);
			status.set("Level",1);
			return status.save();
		}else{
			console.log ("已經有UserStatus了") ;
		}		
	}
});




Parse.Cloud.beforeSave("User_status",function(request,response){
	var obj = request.object ; 
	var hp = obj.get("HP");
	console.log ("HP" + hp.toString());
	if ( hp  > 100 ){
		hp = 100 ;
		obj.set("HP" ,100);
		console.log ("hp Overflowed!! now hp set to 100");
	}
	response.success();
});


Parse.Cloud.afterSave("Event_Record",function(request){
	var user = new Parse.User();
	var userOid = 	request.object.get("target").id;
	user.id = userOid;


			
	function qurStatus (){
		var UserStatus = Parse.Object.extend("User_status");
		var q = new Parse.Query(UserStatus);	
		q.equalTo("User",user);
		return q.first();
	}



	var eid = request.object.get("eid");
			EI = Parse.Object.extend("Event_Info"),
			q = new Parse.Query(EI);
	
	var OwnCard = Parse.Object.extend("Owncard");
	
	q.equalTo("eid",eid.toString());
	q.first().then(function (evt){
		//console.log (JSON.stringify(evt));
		var eft = evt.get("effect_target") ;
		var dXP = parseInt(eft[0]);
		var dHP = parseInt(eft[1]);
		//console.log ((typeof (dXP)));
		//console.log ( user.id);
		qurStatus().then(function(status){
			status.increment("XP",dXP);
			status.increment("HP",dHP);
			status.save().then(function(s){
				console.log ("add XP "+dXP );
				console.log ("add HP "+dHP );
			},function (e){console.log (e.message)});
			
		});

		if (eft[2] > 0 ){
			console.log ("Sending Cards... " + eft[2] );
			var ownCardArr = new Array ();
			for (var j = 0 ; j < eft[2] ; j++){
				var ownCard = new OwnCard ();
				ownCard.set("user",user);
				ownCardArr.push(ownCard);
			}
			Parse.Object.saveAll(ownCardArr).then (function (r){
				console.log ("Card sent.");
			},function (e){
				console.log ("Card send faild");
			});
		}
	},function(e){
		console.log (e.message);
	});
});





Parse.Cloud.job("Random_review", function(rq, status) {
	
var ASSIGN_NTH = rq.params.assignNum	 ;	
var STD_NUM = 0 ; //user(role=std).length
var REVIEW_MAX = 5 ; 



function getReviewNumArr (){
	var reviewList = [];

	var arr = [];
	for (var i = 0 ; i <= REVIEW_MAX; i++) {
		arr =  (i === 0 ) ? makeArrBtw(0,STD_NUM) : shuffle(makeArrBtw(0,STD_NUM)) ;
		reviewList.push(arr);		
	} //!show (reviewList,"Origin:");
	var hw = checkDuplicate(reviewList);
	var stdHwArr = breakHW (hw);
		//show(stdHwArr);
		return stdHwArr ;
}

var overflowX = [] ;
function checkDuplicate (hw) {
		for( var x = 0 ; x < STD_NUM ; x ++){ // 直排檢查開始  
		Vcheck(hw,x);
	}//
	if (overflowX.length > 0 ){//!show(overflowX);
		var a = overflowX.shift() ;
		while (typeof a  !== 'undefined')
		{	//!show(["Rechecking",a]);
			var obj = Vcheck(hw,a,true);
			a = overflowX.shift() ;
		}//!show(["success"]);
	}//!show (hw,"Alter:");
	return (hw);
}
function Vcheck(hw,x,isOverflow){
		for( var y = 1 ; y <= REVIEW_MAX ; y++){		
			var obj = Hcheck(hw,x,y);			// 執行到這裡代表Unique，會得到一個新的X
			switch (obj.status) {
				case 3:  //!console.log("obj.x: ",obj.x);
					overflowX.push(obj.x);
				case 2 :  // 執行交換  //!var testArr =["原y",y,"原x",x,"後y",y,"後x",obj.x];
					if(isOverflow){overflowX.push(obj.x);} //!show(testArr,"test");
					var temp = hw[y][x] ;
					hw[y][x] = hw[y][obj.x];
					hw[y][obj.x] = temp ; 
					break ;
				case 1 ://!if(isOverflow) {show(["Unique"]);}
					break;
				default :
					break; 
			}
		}//	
	
}	
function Hcheck(hw,x,y){
	//判別：下面這邊開始要縱項檢查
	var obj = new Object();
	obj.status = 0 ; //!console.log("tempY",y);                          
	tempY = y ; 								//正在變動的Y
	tempX = x ; 								//正在變動的X
		while ( --tempY >= 0 ){			//檢查下一個縱向檢查值 //!console.log("tempY",y);
			var vCheck = hw[tempY][x]; //變動的縱向檢查值
			var hCheck = hw[y][tempX]; //變動的橫向檢查值
			if( hCheck !== vCheck  ){
				obj.status = (obj.status < 1) ? 1 : obj.status;
			}else{
				obj.status =  (obj.status < 2) ? 2 : obj.status;
				if (tempX < STD_NUM -1 ){ 		//開始往右   //讓回圈用下一個橫向檢查值，來做縱向檢查。
					tempX++;
				}else {
				obj.status =  (obj.status < 3) ? 3 : obj.status;
					tempX = 0 ;
				}
				tempY = y ; //讓Y值回歸，重新縱向檢查。
			}
		}//while
		obj.x = tempX;
		obj.y = tempY; 	//console.log(obj.status);
	return obj ;
}
function breakHW (hw){
	var stdHW = [];
	var HW = hw.slice();
	HW.shift();
	
	for (var x = 0 ; x < STD_NUM ; x++){
		var arr = [] ;
		for (var y = 0 ; y < REVIEW_MAX  ; y++ ){
			arr.push (HW[y][x]);
		}
		stdHW.push(arr);
	}
	return stdHW ;

}

function makeArrBtw (lowEnd , highEnd ){
	var arr = [] ; 
	for (var i = lowEnd; i < highEnd; i++) {
		arr.push(i);
	}
	return arr ;
}
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x   );
    return o;
};



var Test_User = Parse.Object.extend("Test_User");
var Test_Assign =	Parse.Object.extend("Test_Assign");

var qa= new Parse.Query(Test_Assign);
qa.equalTo("nth",ASSIGN_NTH);
qa.include("maker");
var AssignArr =[];

var qu = new Parse.Query(Test_User);
qu.equalTo("role","std");
var UserArr = [];

STD_NUM;REVIEW_MAX // two var used in  "getReviewNumArr()";

var reviewRandomArr = []; 

qa.find().then(function(o){AssignArr = o ;}).then(function(e){
	qu.find().then(function(o){UserArr = o ; 
		STD_NUM = UserArr.length;
		console.log ("STD_NUM",STD_NUM);
		reviewRandomArr = getReviewNumArr ();
		Record();
	},function(e){console.log(e);});
});



function Record (){
	AssignArr ;
	UserArr ;
	reviewRandomArr ;
	var saveAllArr = [];
	var ReviewRecord = Parse.Object.extend("Test_Review_Record");
	for ( var i = 0 ; i < reviewRandomArr.length; i++){
		var  row = reviewRandomArr[i] ;
		for ( var j = 0  ; j < row.length; j++){
			var makerIndex = row[j]
			for ( var k = 0 ; k < AssignArr.length; k++){
				var assign = AssignArr[k] ;
				if (assign.get("maker").id === UserArr[makerIndex].id ){//
					var reviewRecord = new ReviewRecord ();
					reviewRecord.set("reviewer",UserArr[i]);
					reviewRecord.set("assign",assign);
					reviewRecord.set("nth",ASSIGN_NTH);	
					saveAllArr.push (reviewRecord);		
				}
			}
		}
	}
	console.log("saveAllArr",saveAllArr);
	Parse.Object.saveAll(saveAllArr).then(function(l){
		console.log("Fuck");
		console.log(l);
		status.success("Random Done!! Congratulations!!");
		}
	,function(e){
		console.log (e);	
		status.error(e.message);	
	});
}
});



