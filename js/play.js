function qurAssign (id){
	var Assign = Parse.Object.extend("Assign");
	var assign = new Assign();
	var q = new Parse.Query(Assign);
	q.include("maker");
	return q.get(id) ;
}
function qurAssignInfo (nth){
	var AssignInfo = Parse.Object.extend ("Assign_Info");
	var q = new Parse.Query(AssignInfo);
	q.equalTo("nth",nth);
	return q.first();
}
function qurAssigns ( nth ,descendBy) {
	var Assign = Parse.Object.extend("Assign");
	var q = new Parse.Query(Assign);
	q.equalTo("nth",nth);
	q.limit (5) ;
	q.descending(descendBy);
	q.ascending("grade")
	q.include("maker");
	return q.find() ;
}
function getCode (url,callback){
	console.log("Getting Code...");
	$.ajax({
		url : "/getcode.php",
		async : true,
		type: "POST",
		data:{url:url},
		dataType : 'text', //explicitly requesting the xml as text, rather than an xml document
		success : callback
	});
}
function showCode (data, status, xhr) {		
console.log ("get code!")
	if (status === 'success') {
		console.log ($(".editor").get(0));
		var editor =  $(".editor").get(0);
		editor = ace.edit( editor );
		console.log (editor);
		editor.setValue(data);
	}else {
		alert("發生了某些狀況，請重新整理!");
	}
}
function qurBugs (id){
	var BugRecord = Parse.Object.extend("Bug_Record");
	var q = new Parse.Query (BugRecord);
	q.equalTo("assign",id);
	q.ascending("createdAt");
	return q.find();
}

function apdBug(b){
	var reviewer = b.get("reviewer");
	var des = b.get("des");
	var imgUrl = b.get("img").url();
	var time = b.createdAt;
	console.log ("bugi" ,des);
	var html =	
	'<div id="'+b.id+'" class="bug">\
		<!--div class="bug-reviewer col-md-1">'+reviewer.get("name")+'</div-->\
		<div class="bug-img"><a class="fancy" tabindex="10" href="'+imgUrl+'"><img class="bug-img-img" src="'+imgUrl+'" /></a>'+'</div>\
		<span class="bug-des">'+""+'</span>\
		<div class="bug-time">'+time+'</div>\
	</div>';
		$(".bugs").append(html);
		$("#"+b.id).find(".bug-des").text(des);

}


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
function showPlay (url) {
	var ifm = document.createElement("iframe");
	ifm.src = url ;
	ifm.width = 640 ;
	ifm.height = 490 ;
	ifm.border = 0 ;
	ifm.className	+= "playFrame";
	ifm.frameBorder = 0;
	var play = document.getElementsByClassName("play")[0];
	play.appendChild(ifm);	
}
function pprEditor (){ // Prepare
	var editorEle =  $(".editor").first().get(0); //editorElement
	var editor = ace.edit( editorEle );
	editor.setTheme("ace/theme/twilight");
	editor.getSession().setUseWrapMode(true);
	editor.getSession().setTabSize(2);
	editorEle.style.fontSize='14px';	
	editor.getSession().setMode("ace/mode/java");
	return editor;
}
function showFB (href){
	var cmtEle = document.getElementsByClassName("comment")[0];  
	cmtEle.innerHTML = "<fb:comments href='" + href+ "' num_posts='10' data-width='100%'></fb:comments>";  
	FB.XFBML.parse(cmtEle);
	
	var likeEle = document.getElementsByClassName("fblike")[0];  
	likeEle.innerHTML = '<div class="fb-like" data-href="'+href+'" data-width="300" data-layout="standard" data-action="like" data-show-faces="false" data-share="false"></div>';
	FB.XFBML.parse(likeEle);
}
function FBinitDone(){
	console.log ("document.fbinitDine!!!!!!!!!!!");
	showFB (document.location);
}

function showOther (other){
	var n = other.get("maker").get("uid	"),
			p = other.get("maker").get("photo"),
			g = other.get("grade"),
			s = other.get("star"),
			h = other.get("url"),
			
			$p = $(".others").first();
	var html = 
			'<a class="other" href="play.html?asn='+other.id+'">\
				<span class="other-head"><img src="'+p+'"></span>\
				<span class="other-name">'+n+'</span>\
				<span class="other-grade">'+g+'</span>\
				<span class="other-star">'+s+'</span>\
			</a>';
	$p.append(html);
	
}



(function start (){
	var srh = getQueryString () ,
			asnId =   srh.id,//typeof (srh.asn) === 'undefined' ? "LbQeJFDvRT" : srh.asn ,
			nth  ,
			curUser = Parse.User.current();
	if (typeof asnId ==='undefined' ){
		alert("系統無法辨別你要看哪個遊戲，請重新點取");
		
	/*	if (document.referrer === ""){
			document.location = "http://codedu.com";
		}else {
			document.location = document.referrer;
		}
		return false ;	*/
	}
	
	
	qurAssign(asnId).then(function(a){
		console.log ("fuck");
		var url = a.get("url") ;
		nth = a.get("nth");
		showPlay (url); 
		console.log ("what?");
		$(".maker").text(a.get("maker").get("name"));
		$(".count").text(a.get("count"));
		$(".grade").text(a.get("grade"));
		if (a.get("isBest")) $(".isBest").fadeIn();
		
		//if( curUser ){
			pprEditor();
			getCode(url,showCode);
			qurBugs(asnId).then(function(bs){
				console.log ("bugggg pull done");
				each(bs,apdBug);
			},handleError);
		//}
		
		qurAssigns(nth,"isBest,star,grade,createdAt").then(function (assigns){
		each(assigns,showOther);
	});
		
	},function (e){console.log(e);})

})();


$(document).on('click' ,".submit-bug",function (e){
	//Rn!!!!!!!!!
	
	var aid = (this).data('aid');
	
	var Assign = Parse.Object.extend ("Assign"),
	assign = new Assign ();
	assign.id = aid ;
	
	var user = new Parse.User();
	console.log ("tTargetUserId",tTargetUserId);
	user.id  = isSet(tTargetUserId) ?  tTargetUserId : currentUser.id;
	//!!!!!!!!
	
	
	//檢查BUg 是否新增完成	
	e.preventDefault();
	//console.log ("true");
	var $p = $(this).closest(".bug") ;
	var i = $p.index();
	var form = $p.find(".add-bug-form").get(0);;
	var $img = $p.find(".add-img-input").first();
	var $preImg = $p.find(".add-bug-img").first();
	var base64 = $preImg.data("base64");
	var $btn = $p.find(".submit-bug").first();
	var des = $p.find(".add-des-input").first().val();
	
	var fileUploadControl = $img[0];
	
	if(des.length < 10 ){ 
		alert("你的描述太過精簡，請至少超過十個字。"); 
		return false ;
	}
	
	if (fileUploadControl.files.length > 0) {
		if (Validate(form)){
			$btn.attr("disabled","disabled");
			$btn.addClass('disabled');
			var BugRecord = Parse.Object.extend("Bug_Record");
			var bugRecord = new BugRecord();
		
			var file = fileUploadControl.files[0];
			var name = file.name;
			var bugImg = new Parse.File("Bug",{base64:base64});
			
			//http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
			bugImg.save().then(function(img){
				console.log(img);
				bugRecord.set("reporter",currentUser);
				bugRecord.set("assign",assign);
				bugRecord.set("bugger",user);
				bugRecord.set("img",img);
				bugRecord.set("des",des);
				return bugRecord.save();
			}).then (function(bugRecord){
				alert("BUG舉報成功，請等待作者確認");
				console.log(bugRecord);
				showBug(bugRecord);
				bugInit();

				$p.find(".add-bug-form").trigger('reset');
				$preImg.removeAttr("style");
				$btn.removeClass('disabled');
				$btn.removeAttr("disabled");
			},function(e){console.log(e);});
		}else { // file is not image;
			$img.trigger('click');
		}
	}else { // if 沒有點選附檔
		alert("請附上Bug圖片");
	}
	return false ;
});

function Validate(oForm) { // http://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file
		var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
    var arrInputs = oForm.getElementsByTagName("input");
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }
                if (!blnValid) {
                    alert("抱歉" + sFileName +"不符合格式！請重新選擇圖檔！ \n 允許格式：JPG,PNG,BMP,GIF");// + _validFileExtensions.join(", "));
                    return false;
                }
            }
        }
    }

    return true;
}
