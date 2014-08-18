<?php

session_start();

if (!isset($_SESSION['user_id']))
{
	require ('login_tools.php');
	load();
}

$page_title = "Shop";
include ("includes/header.html");
require ('..\dbc.php');

$q = "SELECT * FROM shop";
$r = mysqli_query($dbc ,$q);
if (mysqli_num_rows($r) > 0)
{
	echo '<table><tr>'	;
	while($row = mysqli_fetch_array($r , MYSQLI_ASSOC))
	{
		echo '<tr><td><strong>' .$row['item_name'] . '</strong><br>'.
		$row['item_desc'] .'<br><img width="100px" height=auto src ="'.$row['item_img']. '"><br>$' .
		$row['item_price'] . '<br> <a href ="added.php?id='.$row['item_id']. 
		'">Add To Cart</a></td></tr>';
	}
	echo '</tr></table>';
	mysqli_close($dbc);
}else{
	echo '<p>There are currently no itwms in this shop </p>';
}

echo '<p><a href="cart.php">View Cart</a>|
<a href="forum.php">Forum</a>|
<a href="home.php">Home</a>|
<a href="goodbye.php">Logout</a>';

include ('includes/footer.html');

?>

