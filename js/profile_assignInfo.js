

/** test control**/
var now = new  Date (2014,8,30) ;
var currentUser = Parse.User.current() ;
var $D = $(document);
//console.log ("outer success , ",$("#assignModalInfo").length);
//var nth =  assignNth// 

 var getAsnDone,getInfoDone ;

// 原始頁面也需要的資訊


var AssignInfoArr = [];
var PersonalAssignArr = [] ;


	function qurPersonalAssign (profileUser){  /* FOR PERSONAL */
		var Assign = Parse.Object.extend("Assign");
		var q = new Parse.Query(Assign);
		console.log ('QURING assings , profileUser id = '+profileUser.id);
		q.equalTo("maker",profileUser);
		q.ascending("nth");
		//q.include("maker");
		return q.find();
	}
	function qurAssignInfo (){
		var AsnInfo = Parse.Object.extend("Assign_Info");
		var q = new Parse.Query(AsnInfo);
		return	q.find();
	}
	function getPersonalAssignByNthFromArr(nth){
		var a = PersonalAssignArr.getIndexByAttr("nth", nth) ;
		if (a >= 0 ){
			return PersonalAssignArr[a];
		}else{
			return undefined;
		}
	}
	function getAssignInfoByNthFromArr(nth){
		var a = AssignInfoArr.getIndexByAttr("nth", nth) ;
		if (a >= 0 ){
		//	console.log(AssignInfoArr[a]);
			return AssignInfoArr[a];
		}else{
			return undefined;
		}
	}
	
	qurPersonalAssign(profileUser).then(function (a){ 
		//console.log ("1!!!!!!!!!");
		getAsnDone = true; 
		PersonalAssignArr = a ;
		isNewAsn = (typeof (a) === 'undefined') ;
		//controller();
	});
	qurAssignInfo().then(function(i){
		getInfoDone = true; 
		AssignInfoArr = i; 
		//controller();
	});
	function addProfileGameSHref(userAsns){		
		console.log ('userAsns',userAsns);
		$('.game').each(function(i, e) {
			var $e = $(e);
			var nth = $e.data('nth').toString();
			var j = userAsns.getIndexByAttr('nth',nth) ;
			if (j === -1 ){
				return true ;
			}else{
				console.log ("showing");
				var gameUrl = 'play.html?aid='+userAsns[j].id;
				$e.attr('href',gameUrl);
				$e.attr('target','_blank');
				$e.find('img').first().attr('src','img/games/dark-0'+nth+'.png');
			}
		});	
	}

	function ShowAssignStart(profileUser){
		qurPersonalAssign(profileUser)
		 .then(addProfileGameSHref);
	}




/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function generateAssignInfo (nth) {
	console.log ("nth: ",nth);
	var asnInfo = getAssignInfoByNthFromArr(nth);
	var asn = getPersonalAssignByNthFromArr(nth);
	var isNewAsn =  typeof(asn) ==='undefined';

	var btns = "";
		makeAsnInfoBtns();
		return prepareModal ();
	

	function makeAsnInfoBtns (){
		var submitDate = asnInfo.get("submitDate");
		var reviewDate = asnInfo.get("reviewDate");
		var reviewDue = asnInfo.get("reviewDue");
		console.log ("submitDate: " +submitDate.toLocaleString());
		console.log ("reviewDate: " +reviewDate.toLocaleString());
		console.log ("reviewDue : " +reviewDue.toLocaleString());
		var uploadBtn =  
			'<div class="note">\
				<input class=" form-control input-md input-asnUrl" type="text" placeholder="請貼入遊戲play.html連結">\
				<a class="btn btn-default assignInfo-link submit-asnUrl" data-nth="'+nth+'" >上傳遊戲連結</a>\
			</div>';

		var renewBtn =  
			'<div class="note">\
				<input class=" form-control input-md input-asnUrl" type="text" placeholder="貼入更新的遊戲play.html連結">\
				<a class="btn btn-default assignInfo-link submit-asnUrl" data-nth="'+nth+'" >更新連結</a>\
			</div>';

			
		var preUpload = 
			'<div class="note" style="color:black;">\
			 	 遊戲開放繳交日期：’'+submitDate.toLocaleString()+' ~ '+reviewDue.toLocaleString()+'\
			 </div>';
				//<a class="btn btn-default assignInfo-link submit-asnUrl disabled" >上傳遊戲連結</a>\
			
		console.log (isNewAsn);
		var viewSelfBtn ='<a class="btn btn-default assignInfo-link view-self" href="play.html?aid='+ (!isNewAsn ? asn.id :"")  +'">看自己的遊戲</a><hr class="assignInfo-line">';
		var reviewBtn =  '<a class="btn btn-default assignInfo-link to-review" href="review.html">前往評分</a>';
		var viewAllBtn =	'<a class="btn btn-default assignInfo-link view-other" href="assign.html?nth='+nth+'">看別人遊戲</a>';
	
		var l ="";
		if (submitDate > now) { status = 1 ;l=" 第一區間：還沒開始作業" ;
			btns +=preUpload;}
		if (reviewDate > now && now > submitDate ){status = 2 ;	l =" 第二區間：開始作業";
			if (!isNewAsn){ 
				btns+=(viewSelfBtn);
				btns+= renewBtn ;
			}else{
			btns+= uploadBtn ;
			}
		}
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

		var intro = asnInfo.get("intro");
		var req = asnInfo.get("req");
		var n = asnInfo.get("name");
		
		var assignInfoModal = '<div class="modal fade assignModalInfo" id="assignModalInfo'+nth+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
		<div class="modal-dialog modal-lg" >\
			<div class="modal-content" >\
			\
			<div class="assign-info-outer">\
				<div class="assignInfo container-fluid">\
					<div class="row">\
							<div class="col-xs-3 ">\
								<div class="assignInfo-photo">\
			\						<img  src="'+imgUrl+'" width="100%" >\
								</div>\
							</div>\
						<div class=" col-xs-9">\
			\				<h2 class="assignInfo-name">'+n +'</h2>\
							<div class="des-block intro">\
								<h4>Introduction</h4>\
			\					<div class="des assignInfo-intro">'+intro+'</div>				\
							</div>\
							<div class="des-block requirement">\
								<h4>Requirement</h4>\
			\					<div class="des assignInfo-requirement">'+req+'</div>\
							</div>\
							<div class="links">\
								'+btns+' \
							</div>\
						</div>\
					</div>\
				</div>\
				</div>\
				</div>\
			</div>\
		</div>';
		console.log (assignInfoModal);
		return assignInfoModal;
	}	
}

// 在初始化的時候就要去判斷是否有 null 這個值


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




$D.on('click',".submit-asnUrl",function(e){
	
	$aI = $('.assignModalInfo');
	e.stopPropagation();
	var nth = $(this).data("nth").toString();
	
	var asn = getPersonalAssignByNthFromArr (nth);
	var isNewAsn = typeof(asn)

	var URL = 	$aI.find(".input-asnUrl").first().val();
	checkCode(URL); // it would both invoke check url and code ;

	function checkCode(URL){
		console.log (URL);
		$.ajax({
			url:"http://ghost.cs.nccu.edu.tw/~programming101/getcode.php",
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
		var asnUrl = URL ;
		var Asn = Parse.Object.extend("Assign");
		if (isNewAsn) {
			var savingasn = new Asn();
			savingasn.set("nth",nth);
			savingasn.set("maker",profileUser);
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
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
