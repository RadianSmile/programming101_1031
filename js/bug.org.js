
// 抓取 BUG
function getBug (assignID){ // old name QueryBug
	var BugRecord = Parse.Object.extend("Bug_Record");
	var q = new Parse.Query (BugRecord);
	q.equalTo("assign",assignID);
	q.include("reviewer");
	q.ascending("createdAt");
	return q.find();
}



// 把霸個秀出去
function apdBug(i,b){
		var reviewer = b.get("reviewer");
		var des = b.get("des");
		var imgUrl = b.get("img").url();
		var time = b.createdAt;
		//console.log ("bugi" , i ,des);
		var html =	'<div id="'+b.id+'" class="bug container-fluid">\
				<!--div class="bug-reviewer col-md-1">'+reviewer.get("name")+'</div-->\
				<div class="bug-img col-md-2"><a class="fancy" tabindex="10" href="'+imgUrl+'"><img class="bug-img-img" src="'+imgUrl+'" /></a>'+'</div>\
				<div class="bug-des col-md-5">'+""+'</div>\
				<div class="bug-time">'+time+'</div>\
			</div>';
	//	$(html).find(".bug-des").first().text(des);
		$($(".tab-pane")[i]).find(".bug-list").append(html);
		$("#"+b.id).find(".bug-des").text(des);
}
// 這裡是註冊 Fancy Box
$(".bug-pane").on("focusin", function(){
//	console.log("fuck");
	$("a.fancy").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false,
			'type' : "image"
		});
});


$(document).on('click','.add-bug-img',function(e){
	$(this).siblings("input:file.add-img-input").first().trigger('click');
});



// 這裡是偵測點選上傳圖片時
$("input:file.add-img-input")	.change(function () {				
	var $p = $(this).closest(".tab-pane") ;

		var reader =  new  FileReader ();
		 reader.onload = function (e) {
			 var i = new Image ();
					i.src = e.target.result ;
			var finalWitdh = 800 ;
			var finalHeight =  i.naturalHeight  /i.naturalWidth * finalWitdh   ;
					$ ( i ). css ( 'width' , finalWitdh+'px' )	;		
			//  $("body").append(i);
			var cvs = document.createElement ( 'canvas' );
			cvs.width = finalWitdh ;
			cvs.height = finalHeight;
			var ctx = cvs.getContext( "2d" ).drawImage( i,0,0,finalWitdh,finalHeight);
			var newImageData = cvs.toDataURL ( "image/jpeg" , .6 );
			var result_image_obj =  new  Image ();
				 result_image_obj.src = newImageData ;

				$p.find('.add-bug-img').first().css('background-image', 'url('+newImageData+')');

		 //   $("body").append(result_image_obj);
			$('.add-bug-img').data("base64",newImageData.replace("data:image/jpeg;base64,", ""));
				 //console.log (base64);
		 }
		reader.readAsDataURL ( this.files[0] );			
});


// 呈交BUG
$(document).on('click',".submit-bug",function (e){
	//檢查BUg 是否新增完成	
	e.preventDefault();
	//console.log ("true");
	var $p = $(this).closest(".tab-pane") ;
	var i = $p.index();
	var form = $p.find(".add-bug").get(0);;
	var $img = $p.find(".add-img-input").first();
	var $preImg = $p.find(".add-bug-img")
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
	
			var BugRecord = Parse.Object.extend("Bug_Record");
			var bugRecord = new BugRecord();
		
			var file = fileUploadControl.files[0];
			var name = file.name;
			var bugImg = new Parse.File("Bug",{base64:base64});
			//http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
			bugImg.save().then(function(img){
				console.log(img);
				bugRecord.set("reporter",currentUser);
				bugRecord.set("assign",AssignArr[i].get("assign"));
				bugRecord.set("debugger",AssignArr[i].get("assign").get("maker"));
				bugRecord.set("img",img);
				bugRecord.set("des",des);
				return bugRecord.save();
			}).then (function(bugRecord){
				console.log(bugRecord);
				apdBug (i,bugRecord);
				$p.find(".add-bug-form").trigger('reset');
				$preImg.removeAttr("style");
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
