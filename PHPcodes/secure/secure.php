<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

</head>

<body>

<form action="secure.php" method="POST" >
<p> New Name : <input type="text" name ="name" /><input type="submit"  /></p>
</form>

<?php
$dbc = mysqli_connect ( 'localhost','root','hotopholic','try' ) OR die (mysqli_connect_error());
mysqli_set_charset ($dbc , 'utf-8');
?>

<?php

#validation statement 
if (!empty ($_POST['name']) && !is_numeric ($_POST['name'])){
	$name = $_POST['name'];
	
	#security statements
	$name = mysqli_real_escape_string ($dbc, $name) ;
	$name = strip_tags ($name);
	
	$q = 'ÚPDATE cars SET name = "ggg"  WHERE id= 1 ';
	if ( !mysqli_query ($dbc , $q )) {
		echo mysqli_error ($dbc);
	}
	}else{
		echo 'No valid new name subbmitted ';
	}

$q = 'SELECT * FROM  cars WHERE id=1 ';
$r = mysqli_query ($dbc , $q) ;


	while ($row = mysqli_fetch_array ($r , MYSQLI_NUM)){
		echo "<p> Name : $row[2] </p> ";
	}	mysqli_close ($dbc);

?>


</body>
</html>