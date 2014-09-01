
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.job("Random_review", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.useMasterKey();
  var counter = 0;
  // Query for all users

	query.each(function(user) {
      // Update to plan value passed in
      user.set("plan", request.params.plan);
      if (counter % 100 === 0) {
        // Set the  job's progress status
        status.message(counter + " users processed.");
      }
      counter += 1;
      return user.save();
  }).then(function() {
    // Set the job's success status
    status.success("Migration completed successfully.");
  }, function(error) {
    // Set the job's error status
    status.error("Uh oh, something went wrong.");
  });
});








Parse.Cloud.define("RadomAssign",function(rq,rp){
//// test
// about the nth type


	//var arr2 = arr1.slice(0);
var ASSIGN_NTH = rq.params.assignBum	 ;	
var STD_NUM = 60 ;
var REVIEW_MAX = 5 ;

var Test_User = Parse.Object.extend("Test_User");
var Test_Assign =	Parse.Object.extend("Test_Assign");

var q = new Parse.Query(Test_Assign);
q.equalTo("nth",ASSIGN_NTH.toString())
var AssignArr =[];
q.find().then(function(o){AssignArr = o ;});

var q = new Parse.Query(Test_User);
q.equalTo("role","std");
var UserArr = [];
q.find().then(function(o){UserArr = o ; });



STD_NUM;REVIEW_MAX // two var used in  "getReviewNumArr()";
var reviewRandomArr = getReviewNumArr ();



for (var i = 0 ; i < STD_NUM ; i++ ){
	var qArr = [] ;
	var reviewArr = reviewRandomArr[i] ;
	for (var j = 0 ; j < REVIEW_MAX ; j++){
		var qAssign = new Parse.Query(Test_Assign);
		qAssign.equalTo("maker",UserArr[reviewArr[j]]);
		q.push(qAssign);
	}
	var queryAssignToReview = new Parse.Query.or(q[0],q[1],q[2],q[3],q[4]);
	queryAssignToReview.find().then(function(o){
		UserArr[i].set("AssignToReview",o);
		UserArr[i].save().then(function(){console.log("yes 1 \t");},
		function(e){
			console.log(e);
		});
	},function(e){console.log(e)});
}
console.log ("done!");


var ReviewUser = new Parse.Object.extend("Test_Review_User");



function getReviewNumArr (){
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
});

