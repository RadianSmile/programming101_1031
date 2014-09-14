// JavaScript Document
var userImageLink="http://static.mimigd.cc/wp-content/uploads/2009/01/kan.png";
var userName="Anonymous";
var linkTo="http://radiansmile.github.io/CodeEDU/dashboard.html";
var userimageHeight=40;

$("title").append(" | 程式學習平台");
		Parse.initialize("9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq", "R8SWwYxpJcy73ogQKuSD43y7FigrlDGjBLcy1lzC");

  window.fbAsyncInit = function() {
		Parse.FacebookUtils.init({
			appId      : '1452756891666119',
			cookie     : true,  // enable cookies to allow the server to access 
			xfbml      : true,  // parse social plugins on this page
			version    : 'v1.0' // use version 2.1
  });

	
	// 規定只能使用這種，使用 status:true 會造成Parse出問題
  FB.getLoginStatus(function(response) {
		FBinitDone();
		changeBarView(response);
  });
};
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


Parse.User.prototype.ID = function () {
	return this.get("ID");
}

function getLoginStatus () {
	
	}
function FBinitDone(){}
/* make the API call */
/*
FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
   
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
  } else {
    // the user isn't logged in to Facebook.
  }
 });
*/


$(document).on("click",".toTop",function(e){
	var scroll_pos=(0);          
   $('html, body').animate({scrollTop:(scroll_pos)}, '1000');
	
});

$(document).on("scroll","window",function(e){
	console.log($(document).scrollTop());
	if($(document).scrollTop() > 50 ){
		$(".toTop").fadeIn();	
	}else {
		$(".toTop").fadeOut();	
	}
	
});












function each (arr,func ){
	console.log (arr.length);
	for (var i = 0 ; i < arr.length ; i++){
		func(arr[i] , i);
	}
}


function qurClass (name) {
	var Class = Parse.Object.extend(name),
			q = new Parse.Query (Class);
	q.limit (20000);
	return q.find ();
}

function Log(o){
	console.log (o) ;
}

function pointer (objectID,className){
	var c = (typeof(className) !== 'undefined') ? className : "Test_Assign";
	console.log (c);
  var pointer = new Parse.Object(c);
  pointer.id = objectID;
  return pointer;
}

//## search Querys 
function getQueryString () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
};

//## handle error ;


// Parse Error
function handleError(e){
	var Error = Parse.Object.extend ("Error");
	var error = new Error();
	error.set("location");
	error.set("error",JSON.stringify(e));
	error.set("msg",e.message);
	error.save().then(function(){
		alert (e.message +"\n 試著重新整理頁面在操作一次，\n錯誤訊息我們以經回報給系統了~")	;
	});
}
// Hyperlink no parameter

function paraCheck (para,msg){
	if ( typeof(para) === "undefined"){
		alert(msg);
		return false ;
	}else {
		return true;
	}
}


function renameClass (oldClass , newClass) {
	qurClass("Event_List").then(function(a){
		var newArr = [],
				 			N = Parse.Object.extend(newClass);

		each(a,function (r , i){
					newArr[i]= new N ();
			$.map(r.attributes,function (o,k){
				newArr[i].set(k,o);
			});
		});
		Parse.Object.saveAll(newArr).then(Log,Log);
	},Log);
}



Array.prototype.getIndexByAttr = function (attr, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i]['attributes'][attr] == value) {
            return i;
        }
    }
		return -1
}
Array.prototype.getIndexById = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].id == value) {
            return i;
        }
    }
		return -1
}



// -------------------------change logint to picture--------------------------
function changeBarView(response){
	if(response.status=="connected"){
		$(".navbar-right a").empty();
		$(".navbar-right a").attr("href",linkTo);
		loadPic(userImageLink,".navbar-right a",userName)
	}
}
function loadPic(userImageLink,dom,userName){
	var img=new Image();
	img.src=userImageLink;
	var loadChecker = window.setInterval(function(){
		if(img.complete){
			window.clearInterval(loadChecker);
			img.height=userimageHeight;
			//console.log(img);
			$(".navbar-right a").append(img);
			$(".navbar-right a").append(userName);
		}
		},100);
}
