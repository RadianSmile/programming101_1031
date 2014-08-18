<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Single</title>
</head>

<body>
<?php

if($_SERVER['REQUEST_METHOD'] != 'POST')
{
	#form display statements
	echo '
	<center>
	<form action= "single.php" method = "POST">
		<fieldset>
			<legend>Send us your comment</legend>
			<textarea row="5" cols ="40" name="comment"></textarea>
		</fieldset>
		<p><input type = "submit"></p>
	</form> 
	</center>';
}
else
{
	# form handling statements 
	if( !empty( $_POST['comment']))
	{
		$comment = $_POST['comment'] ;
		echo "Comment : $comment ";
	}
	else
	{
		$comment = NULL ; echo 'You must enter a comment';
	}
}


?>
</body>
</html>