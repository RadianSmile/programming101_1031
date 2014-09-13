<!doctype html>
<html>
<head>
<meta charset="UTF-8">

<!-- Common links -->
<!----><link rel="icon" type="image/png" href="/include/icon.png" />
<!----><link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
<!----><script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<!----><script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<!----><script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.2.19.min.js"></script>
<!----><link href="../css/all.css" rel="stylesheet" />
<!----><script src="../js/all.js"></script>
<!---------------------->
<style>
#editor-container {
	position:relative;
	margin:50px;
	height:3000px;
	
}
 #editor { 
	margin: 0;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>

<script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="../pkgs/processing/minim.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.8/processing.min.js"></script> 


<script>


</script>
<title>Codedu</title>
</head>

<body>

<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Submit Assign 1
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
       <form id="submitAssign">
					<input id="submitURL" type="url" placeholder="請貼入連入作業 play.html 的網址 " style="width:400px; padding:10px;"><br>
				</form>

      </div>
			
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="submitAssignAction" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div id="play">
</div>
<div id="editor-container">
	<div id="editor">

	</div>
</div>


<script>
var assignToSubmit = "1";

$("#submitAssignAction").click(function (){
	//getLoginStatus();
		var currentUser = Parse.User.current();		
		
		var Assign = Parse.Object.extend("Assign");
		var query = new Parse.Query(Assign);
		query.equalTo("uid",currentUser.get("authData").facebook.id );
		query.equalTo("assign",assignToSubmit);
		query.first({
		success: function(existAssign) {
		if (typeof(existAssign) !== "undefined") {
			existAssign.set("url",$("#submitURL").val());
			existAssign.save(null, {
				success: function() {
				// Execute any logic that should take place after the object is saved.
					$("#myModal").modal('hide');
					alert ("update success");
					
					},
				error: function(gameScore, error) {
					alert('Failed to create new object, with error code: ' + error.message);
				 }
				});
			}else {
				var assign = new Assign();
				assign.set("uid", currentUser.get("authData").facebook.id );
				assign.set("url",$("#submitURL").val());
				assign.set("assign",assignToSubmit);
				$("#submitURL").val("");
				assign.save(null, {
				success: function(assign) {
					
					$("#myModal").modal('hide');

					alert ("new success");
			},
				error: function(gameScore, error) {
				alert('Failed to create new object, with error code: ' + error.message);
				}
			});
				
			}
		},error : function () {
				alert ("Find Faild");
		}
		});	
			
		
		
		
		

	
});

</script>



<script type="text/javascript">


</script>

<script data-file="這是程式預覽" >
$("#submitAssignAction").on('click',function(){
    getCode($('#submitURL').val());
		var play = document.createElement("iframe");
		play.setAttribute("src",$('#submitURL').val());
		$("#play").html(play);
		return false;
});

var callback = function (data, status, xhr) {		
	console.log(data);
	if (status == 'success') {
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/twilight");
		editor.getSession().setTabSize(2);
		editor.getSession().setUseWrapMode(true)
		document.getElementById('editor').style.fontSize='16px';
		editor.getSession().setMode("ace/mode/java");
		editor.setValue(data);
	}	
}
function getCode (url){
		$.ajax(
				{
						url : "http://codedu.com/getcode.php" ,
							type: "POST",
							data:{url:url},
						dataType : 'text', //explicitly requesting the xml as text, rather than an xml document
						success : callback
				}
		);
}
</script>
</body>
</html>
