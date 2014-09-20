

/** test control**/
var now = new  Date ()//(2014,8,30) ;
var currentUser = Parse.User.current() ;
var $D = $(document);
//console.log ("outer success , ",$("#assignModalInfo").length);
//var nth =  assignNth// 

var getAsnDone,getInfoDone ;

// 原始頁面也需要的資訊


var AssignInfoArr = [];
var PersonalAssignArr = [] ;




	function qurPersonalAssign (currentUser){  /* FOR PERSONAL */
		var Assign = Parse.Object.extend("Assign");
		var q = new Parse.Query(Assign);
		q.equalTo("maker",currentUser);
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
	
	qurPersonalAssign(currentUser).then(function (a){ 
		//console.log ("1!!!!!!!!!");
		getAsnDone = true; 
		PersonalAssignArr = a ;
		isNewAsn = (typeof (a) === 'undefined') ;
		controller();
	});
	qurAssignInfo().then(function(i){
		getInfoDone = true; 
		AssignInfoArr = i; 
		controller();
	});
	function controller (){
		if (getAsnDone && getInfoDone){
			start();
		}
	}
	function start(){
		$apd = $("#assignInfoArea");
		for (var i = 1 ; i <= AssignInfoArr.length ; i++){    // Rn 6
			//console.log ("正在 append");
			//console.log (generateAssignInfo( i.toString()));
			$apd.append(generateAssignInfo( i.toString()));
			
		}
	}

/////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

		var l ="";
		if (submitDate > now) { 
			status = 1 ;
			l=" 第一區間：還沒開始作業" ;
		}
		if (reviewDate > now && now > submitDate ){
			status = 2 ;	
			l =" 第二區間：開始作業";
		}
		if (reviewDue > now && now  > reviewDate  ){	
			status = 3 ; l =" 第三區間：開始評分";
			btns+= reviewBtn + viewSelfBtn ;
		}
		if (now > reviewDue){  
			status = 4 ;
			l ="四區間：結束評分";
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
		
		var assignInfoModal = '<div class="modal fade" id="assignModalInfo'+nth+'" tabindex="-1" role="dialog"  aria-hidden="true">\
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

$('.modal').on('hidden.bs.modal', function () {
	$('.modal').modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
})
// 在初始化的時候就要去判斷是否有 null 這個值


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



