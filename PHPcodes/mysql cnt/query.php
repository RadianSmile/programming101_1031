<?php

require ('connect_db.php');

$q = 'SHOW TABLES';
$r = mysqli_query($bc , $q) ;

if ($r) 
{
	echo '<h1> Resource Link Returned OK </h1>';
}else{
	echo '<p>'; //. mysqli_error($dbc). '</p>';
}
?>