<?php
session_start ();

if (!isset ($_SESSION['user_id']))
{
	require ('login_tools.php');
	load();
}

$page_title = 'HOME';

include('includes/header.html');

echo "<h1>HOME</h1>
<p> You are new logged in, {$_SESSION['first_name']} {$_SESSION['last_name']} </p>";

echo '<p><a href="Shop.php">Shop</a>|
<a href="cart.php">View Cart</a>|
<a href="forum.php">Forum</a>|
<a href="home.php">Home</a>|
<a href="goodbye.php">Logout</a>';

include ('includes/footer.html');

?>