
	$(document).on("change",".grade-select",function(){
		var $this = $(this);
		var $p = $this.closest(".tab-pane") ;
		var i = $p.index();
		console.log(i);		
		var g = $this.val();	
		$($(".tab").get(i)).find(".grade-preview").first().text(g)
		gradeArr[i][1] = g ;
		localStorage["gradeArr"] = JSON.stringify (gradeArr);
	} );

  $(document).on('click','.star-btn',function () {
		
		var $this = $(this);
		var radio = $this.siblings('input:radio[name=star]')[0];
		radio.checked = !radio.checked ;

    $('.star-btn').each(function(i, e) {
			if ($(e).siblings('input:radio[name=star]')[0].checked){ //被選了
				$(e).addClass("btn-warning").removeClass("btn-default");
				$($(".tab").get(i)).find(".glyphicon-star.preview").first().removeClass("hidden");
				gradeArr[i][2] = true ;
			}else { // 被取消
				$(e).removeClass("btn-warning").addClass("btn-default");
				$($(".tab").get(i)).find(".glyphicon-star.preview").first().addClass("hidden");
				gradeArr[i][2] = false ;
			}
			localStorage["gradeArr"] = JSON.stringify (gradeArr);

		});
  });


////////////////////////////////////////////////////////////////////////////////////////////////

$('#review-tab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
var assignToReview = '1';
var AssignArr = [] ;
var CodeArr =  [] ;
var TimeArr = [] ;
var gradeArr = [];
init();

function init (){	
	for (var i = 0 ; i < 5; i++){
		// Prepare editor
		var tabEditor =  $($(".tab-pane")[i]).find(".editor").first().get(0);
		var editor = ace.edit( tabEditor );
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setUseWrapMode(true);
		editor.getSession().setTabSize(2);
		tabEditor.style.fontSize='14px';
		editor.getSession().setMode("ace/mode/java");
	}
	// 判斷是否有 local gradeArr
	if (localStorage.getItem("gradeArr") !== null){
		console.log (localStorage["gradeArr"],typeof(localStorage["gradeArr"]));
		gradeArr = JSON.parse(localStorage["gradeArr"]);
		console.log("init,local",gradeArr);
		
		showLocal();
		
	}else {
		// 如果沒有，創造Local
		for (var i = 0 ; i < 5 ; i++){
			var arr = ["","-",false];
			gradeArr.push(arr);
		}
	}
	showAssignAndBug();
}

function showLocal (){
	for (var i = 0 ;  i < gradeArr.length ; i++){
		if (gradeArr[i][1] !== '-'){
			var Select = $($(".tab-pane").get(i)).find(".grade-select");
			var opt = Select.find('option:contains("'+gradeArr[i][1]+'")');
			$($(".tab").get(i)).find(".grade-preview").first().text(gradeArr[i][1]);
			opt.attr("selected",true);
			console.log (Select.val());
			Select.val(gradeArr[i][1]);
		}
		if (gradeArr[i][2]){
			var radio = $($(".tab-pane").get(i)).find(".star-btn").click();
		}
	}	
}


function QueryAssigns (){
var promise = new Parse.Promise();
var Assign = Parse.Object.extend("Review_Record");
console.log (currentUser , assignToReview); 
var q = new Parse.Query(Assign);
q.equalTo("reviewer",currentUser);
q.equalTo("nth",assignToReview);
q.ascending("createdAt");
q.include("assign");
q.limit(1000);
q.find().then(function(r){
	console.log (r);
	for (var i = 0 ; i < r.length ; i++) gradeArr[i][0] =  r[i].id ;
	AssignArr = r ;
	console.log ("AssignArr",AssignArr);
	promise.resolve(r);
	//console.log("Parse Done, Querying Data..");

},function(e){
	promise.reject(e.message);
	console.log(e.message);
});
	return promise ;
}

function showAssignAndBug(){
	
	var jobCount = 0 ;
	var finalCount = 0 ; 
	
	QueryAssigns().then (function(r){
		finalCount = r.length ;
		for (var i = 0 ; i < r.length ; i++){
			var url = 	r[i].get("assign").get("url"); 	
			isInTime(url,i);	
			getCode(url,i); ///
			var id = AssignArr[i].get("assign").id; 
			show(id , i );
		}
	},function (e){console.log (e);});
	
	function show (id,i){
		qurBugs(id).then(function(r){
				for ( var j = 0 ; j < r.length ; j++ ){
					var  b = r[j] ;
					console.log (j);
					showBug(b,i);
				}
				finishCortrol (jobCount++);
			},function(e){console.log(e);
		});
	}
	function finishCortrol(){
		console.log ("BugInit");
		 jobCount === finalCount && bugInit() ;
	}
}


function submitReview (e) {
	//checkResult ; /**************************************/
	$(this).addClass("disabled");
	var checkStar = false ;
		for (var i = 0 ; i < AssignArr.length ; i++){
			var g  =  gradeArr [i] ;
			if (g[1] === "-"){ alert("#"+(i+1)+" 還沒評等喔！"); return false}	
			AssignArr[i].set("grade",g[1]);
			AssignArr[i].set("star",g[2]);
			AssignArr[i].set("overtime",TimeArr[i]);
			if (g[2]){checkStar = true ;}
		}
		if (!checkStar){alert("你還沒挑選最佳解喔！");
		return false}
		if (confirm("確定要繳交了嗎?繳交後就不能再更改囉")){
			$(this).attr("disabled","disabled");
			Parse.Object.saveAll(AssignArr).then (function (re){
				console.log ("SaveResult",re);
				localStorage.clear();
				alert("繳交成功了!");
				document.location="dashboard.html";
			},function(e){
				console.log ("e");
			});
		}
}


function isInTime(url,i){
	console.log("Check Last Modified...");
		$.ajax({
			url : "lastModify.php",
			async : false,
			type: "POST",
			data:{url:url},
			dataType : 'text', //explicitly requesting the xml as text, rather than an xml document
			success : function (data, status, xhr) {	
			  data = JSON.parse(data);
				console.log ("time",data['timenum']);
				var t = Math.round(new Date().getTime() / 1000);
				console.log ("t",t);
				TimeArr[i] = data ;
				var play = document.createElement("iframe");
				play.frameBorder = 0 ;
				play.style.width = "600px";
				play.style.height = "400px";
				play.setAttribute("src",url);
				$($(".tab-pane")[i]).find(".play").first().html(play);
			}
		});
}

////////////////////////////////////////////////////////////////////////////////////////////////


/**這是程式預覽**/

function getCode (url,i){
		console.log("Ajaxing");
		$.ajax({
			url : "getcode.php",
			async : true,
			type: "POST",
			data:{url:url},
			dataType : 'text', //explicitly requesting the xml as text, rather than an xml document
			success : function (data, status, xhr) {		
				if (status == 'success') {
					var tabEditor =  $($(".tab-pane")[i]).find(".editor").first().get(0);
					//console.log(tabEditor);
					var editor = ace.edit( tabEditor );
			//		editor.setTheme("ace/theme/twilight");
			//		editor.getSession().setUseWrapMode(true);
			//		editor.getSession().setTabSize(2);
			//		tabEditor.style.fontSize='14px';
			//		editor.getSession().setMode("ace/mode/java");
					editor.setValue(data);
					CodeArr[i] = data ;				
				}	
			}
		});
}


