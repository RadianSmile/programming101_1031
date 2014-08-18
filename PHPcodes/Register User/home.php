<?php
session_start ();

if (!isset ($_SESSION['id']))
{
	require ('login_tools.php');
	load();
}

$page_title = 'HOME';

include('includes/header.html');

echo "<h1>HOME</h1>
<p> You are new logged in, {$_SESSION['first_name']} {$_SESSION['last_name']} </p>";

echo '<a href="logout_action.php">Log Out </a>' ;

include ('includes/footer.html');


?>

