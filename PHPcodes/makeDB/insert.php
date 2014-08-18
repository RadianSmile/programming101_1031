<?php
$name = $_POST ['name'];
$style = $_POST['style'];
$price = $_POST['price'];

require ('dbc.php');


$q = "INSERT INTO cars (name , style , price) VALUES ('$name', '$style', '$price' )";

if (mysqli_query ($dbc , $q )){
	header('Location: show.php');
	exit();
}else {
	echo '<p>' . mysqli_error ($dbc).'</p>';
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>傳輸中...</title>
</head>
</html>




