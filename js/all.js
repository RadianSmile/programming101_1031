// JavaScript Document

$("title").append(" | 程式學習平台");

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
   $('html, body').animate({scrollTop:(scroll_pos)}, '2000');
	
});

$(document).on("scroll","window",function(e){
	console.log($(document).scrollTop());
	if($(document).scrollTop() > 50 ){
		$(".toTop").fadeIn();	
	}else {
		$(".toTop").fadeOut();	
	}
	
});

