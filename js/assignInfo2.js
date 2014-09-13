
/** test control**/
var now = new Date (2014,8,29,1);
var currentUser = Parse.User.current() ;


function generateAssignModal(nthAssign){

var $D = $(document);

var $p = $("#assignInfoInnerApd");
//console.log ("outer success , ",$("#assignModalInfo").length);
var nth = nthAssign; // 
var btns = "";
var asnInfo,asn;
var getAsnDone,getInfoDone,isNewAsn ;

// 原始頁面也需要的資訊

/** test control**/
(function start(){
	

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
	getAssign(currentUser,nth).then(function (a){ getAsnDone = true; asn = a ;isNewAsn = (typeof (a) === 'undefined') ;controller()});
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
				<input class=" form-control input-md input-asnUrl" type="text" placeholder="請貼入遊戲play.html連結">\
				<a class="btn btn-default assignInfo-link submit-asnUrl" >上傳遊戲</a>\
			</div>';
			
		var preUpload = 
			'<div class="note">\
				<a class="btn btn-default assignInfo-link submit-asnUrl disabled" >上傳遊戲連結</a>\
			</div>';
		console.log (isNewAsn);
		var viewSelfBtn ='<a class="btn btn-default assignInfo-link view-self" href="play.html?id='+ (!isNewAsn ? asn.id :"")  +'">看自己的遊戲</a>';
		var reviewBtn =  '<a class="btn btn-default assignInfo-link to-review" href="review.html">前往評分</a>';
		var viewAllBtn =	'<a class="btn btn-default assignInfo-link view-other" href="assign.html?nth='+nth+'">看別人遊戲</a>';
	
		var l ="";
		if (submitDate > now) { status = 1 ;l=" 第一區間：還沒開始作業" ;
			btns +=preUpload;}
		if (reviewDate > now && now > submitDate ){status = 2 ;	l =" 第二區間：開始作業";
			btns+= uploadBtn ;
			if (!isNewAsn) btns+=(viewSelfBtn);} 
		if (reviewDue > now && now  > reviewDate  ){	status = 3 ; l =" 第三區間：開始評分";
			btns+= reviewBtn + viewSelfBtn ;}
		if (now > reviewDue){  status = 4 ;l ="四區間：結束評分";
			btns+=viewSelfBtn + viewAllBtn + uploadBtn ;}	
		//alert (l);
		return btns;
		
	}
	
	

	function prepareModal(){
		//alert(btns);
		var imgUrl = 'img/games/' ;
		if (status < 4  ){
			if (isNewAsn){
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
		var assignInfoModal = '<div class="modal fade" id="assignModalInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
		<div class="modal-dialog modal-lg" >\
			<div class="modal-content" >\
			\
			<div class="assign-info-outer">\
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
	var URL = $(".input-asnUrl").val();
	checkCode(URL); // it would both invoke check url and code ;

	/*function checkUrl(asnUrl){
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
	}	*/
	function checkCode(URL){
		console.log (URL);
		$.ajax({
			url:"getcode.php",
			data:	{url:URL},
			type: "POST",
			success: function(d,s,x){
				if (d==="no val"){
					alert("你沒有貼入連結");
				}else if (d==="no play"){
					alert("無法讀取play.html檔，請確認\n1.連結是否正確\n2.檔案是已經否上傳了\n如果仍無法解決，請聯絡助教。")
				}else if (d === "wrong host"){
					alert("要貼入的連結應該是 xxx.github.io/xxxx\n你是不是貼錯了?\n如果仍無法解決，請聯絡助教。")
				}else if (d === "wrong play"){
					alert ("不正確的play.html，請確認\n1.你可能貼到的不是play.html的連結\n2.你的play.html內容或位置不正確，可嘗試重新做一個play.html\n如果仍無法解決，請聯絡助教。")
				}else if (d === "no code"){
					alert("沒有正確存取到Play.html內data-processing-sources是否正確\n2.請確認檔案是否已經上傳到gh-pages\n如果仍無法解決，請聯絡助教。");
				}else{
					console.log (d);
					//alert(d);
					saveAssign();
				}		
		//		alert(d);
			}
		});
	}
	function saveAssign (){
		var asnUrl = $(".input-asnUrl").val();
		var Asn = Parse.Object.extend("Assign");
		if (isNewAsn) {
			var savingasn = new Asn();
			savingasn.set("nth",nth);
			savingasn.set("maker",currentUser);
		}else {
			savingasn = asn ;
		}
		savingasn.set("url",asnUrl);
		savingasn.save().then(function(s){
			if (isNewAsn){
				alert("作業繳交成功");
			}else{
				alert("作業更新成功");
			}
		},function(e){
			alert(e.message);
		})
	}
});

}