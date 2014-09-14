
/** test control**/
var now = new Date (2014,8,29,1);
var currentUser = Parse.User.current() ;
var $D = $(document);

var $p = $("#assignInfoInnerApd");
//console.log ("outer success , ",$("#assignModalInfo").length);
var nth = "1"; // 
var btns = "";

// 原始頁面也需要的資訊
/** test control**/
(function start(){
	
	var getAsnDone,getInfoDone ;

	function getAssign (currentUser,nth){
		var Assign = Parse.Object.extend("Assign");
		var q = new Parse.Query(Assign);
		q.equalTo("maker",currentUser);
		q.equalTo("nth",nth);
		//q.include("maker");
		return q.first();
	}
	function getAssignInfo (nth){
		var AsnInfo = Parse.Object.extend("Assign_Info");
		var q = new Parse.Query(AsnInfo);
		q.equalTo("nth",nth);
		return	q.first();
	}
	function controller (){
		if (getAsnDone && getAssignInfo){
			start();
		}
	}
	getAssign(currentUser,nth).then(function (a){ getAsnDone = true; asn = a ; controller()});
	getAssignInfo(nth).then(function(i){getInfoDone = true; asnInfo = i ; controller()});
	
	function start(){
		makeAsnInfoBtns();
		$p.append(prepareModal());
	}
	

	function makeAsnInfoBtns (){
		var submitDate = asnInfo.get("submitDate");
		var reviewDate = asnInfo.get("reviewDate");
		var reviewDue = asnInfo.get("reviewDue");
		console.log (submitDate.toDateString(),reviewDate.toDateString(),reviewDue.toDateString());
		var uploadBtn =  
			'<div class="note">\
				<input class=" form-control input-md input-asnUrl" type="url">\
				<a class="btn btn-default assignInfo-link submit-asnUrl" >上傳遊戲</a>\
			</div>';
			
		var preUpload = 
			'<div class="note">\
				<a class="btn btn-default assignInfo-link submit-asnUrl disabled" >上傳遊戲</a>\
			</div>';
		console.log (typeof(asn));
		var viewSelfBtn ='<a class="btn btn-default assignInfo-link view-self" href="play.html?id='+(function(){if (typeof(asn) !== 'undefined')  return asn.id })() +'">看自己的遊戲</a>';
		var reviewBtn =  '<a class="btn btn-default assignInfo-link to-review" href="review.html">前往評分</a>';
		var viewAllBtn =	'<a class="btn btn-default assignInfo-link view-other" href="assign.html?nth='+nth+'">看別人遊戲</a>';
	
		var l ="";
		if (submitDate > now) { status = 1 ;l=" 第一區間：還沒開始作業" ;
			btns +=preUpload;}
		if (reviewDate > now && now > submitDate ){status = 2 ;	l =" 第二區間：開始作業";
			btns+= uploadBtn ;
			if (typeof(asn) !== 'undefined') btns+=(viewSelfBtn);} 
		if (reviewDue > now && now  > reviewDate  ){	status = 3 ; l =" 第三區間：開始評分";
			btns+= reviewBtn + viewSelfBtn ;}
		if (now > reviewDue){  status = 4 ;l ="四區間：結束評分";
			btns+=viewSelfBtn + viewAllBtn + uploadBtn ;}	
		alert (l);
		return btns;
		
	}
	
	

	function prepareModal(){
		//alert(btns);
		var imgUrl = 'img/games/' ;
		if (status < 4  ){
			if (typeof(asn) === 'undefined'){
				imgUrl+= "broke-0"+nth+".png" ;
			}else{
				imgUrl+= "dark-0"+nth+".png";
			}
		}else{
			imgUrl+= "light-0"+nth+".png";
		}
			
		
		
		  //asnInfo.get("img") ;
		//var nth = asnInfo.get("nth");
		var intro = asnInfo.get("intro");
		var req = asnInfo.get("req");
		var n = asnInfo.get("name");
		//var reviewBtn = '<a class="btn btn-default assignInfo-link submit-asnUrl"  href="review.html" ></a>';


/*<div class="link-block">	\
																				\							<a class="btn btn-default assignInfo-link" href="assign.html?nth='+nth+'">所有人遊戲</a>\
																											<div class="note">\
																												<input class=" form-control input-md input-asnUrl" type="url">\
																												<a class="btn btn-default assignInfo-link submit-asnUrl" >上傳遊戲</a>\
																											</div>\
																										</div>			\ */
		var assignInfoModal = '<div class="assign-info-outer">\
			<div class="assignInfo container-fluid">\
				<div class="row">\
						<div class="col-xs-4 ">\
							<div class="assignInfo-photo">\
		\						<img  src="'+imgUrl+'" width="100%" >\
							</div>\
							<div class="links">\
							'+btns+' \
							</div>\
						</div>\
					<div class=" col-xs-8">\
		\				<h1 class="assignInfo-name">'+n +'</h1>\
						<div class="des-block intro">\
							<h2>Introduction</h2>\
		\					<div class="des assignInfo-intro">'+intro+'</div>				\
						</div>\
						<div class="des-block requirement">\
							<h2>Requirement</h2>\
		\					<div class="des assignInfo-requirement">'+req+'</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>';
		return assignInfoModal;
	}	
	
})();

// 在初始化的時候就要去判斷是否有 null 這個值





$D.on('click',".submit-asnUrl",function(e){
	e.stopPropagation();
	var asnUrl = $(".input-asnUrl").val();
	checkUrl(asnUrl); // it would both invoke check url and code ;

	function checkUrl(asnUrl){
		var request = new XMLHttpRequest();  
		request.open('GET',asnUrl, true);
		request.onreadystatechange = function(){
			alert("? " , request.readyState.toString() ,request.readyState.toString());
		if (request.readyState==4 ){
			console.log (request.status);
			if  (request.readyState==200){
				checkCode(asnUrl);
			}else {
				alert("沒有正常存取到遊戲，請檢查\n1.連結是否正確\n2.檔案是否已經上傳到gh-pages\n如果仍無法解決，請聯絡助教。");
			}
		}};
		request.send();
	}	
	function checkCode(asnUrl){
		console.log (asnUrl);
		$.ajax({
			url:"getcode.php",
			dara:	{url:asnUrl},
			type: "POST",
			success: function(d,s,x){
				if (d === "false"){
					alert("沒有正確存取到原始碼，請檢查\n1.play.html內data-processing-sources是否正確\n2.請確認檔案是否已經上傳到gh-pages\n如果仍無法解決，請聯絡助教。");
				}else{
					alert(d);
					saveAssign();
				}		
			}
		});
	}
	function saveAssign (){
		var asnUrl = $(".input-asnUrl").val();
		var Asn = Parse.Object.extend("Assign");
		var asn = new Asn();
		asn.set("nth",nth);
		asn.set("url",asnUrl);
		asn.set("maker",currentUser);
		asn.save().then(function(s){
			alert("作業繳交成功");
		},function(e){
			alert(e.message);
		})
	}
});

