<!DOCTYPE html>
<html>
<head>
<title>Sticky forms </title>
</head>

<form action ="sticky.php" method ="POST">
	<p>Name: 
		<input type="text" name="name" value= "<?php if (isset ($_POST['name'])) echo $_POST['name'] ; ?>"></p>
	<p>Mail:
		<input type ="text" name ="mail" value ="<?php if (isset ($_POST['mail'])) echo $_POST['mail'] ?>"></p>
	<p><input type ="submit"> </p>
</form>

<?php
if ($_SERVER ['REQUEST_METHOD'] == "POST") 
{
	$error = array();

	if (empty ($_POST['name'])) 
	{
		$error[] = 'name';
	}else{
		$name = trim ($_POST['name']);
	}

	if (empty ($_POST['mail'])) 
	{
		$error [] = 'mail' ;
	}else{
		$mail = trim ($_POST ['mail']);
	}

	if (!empty($error))
	{
		echo 'Error! Please enter yor ';
		foreach ($error as $msg) {echo "- $msg";}
	}else{
		echo "  Success ! Thanks $name " ;
	}
}
?>
</html>