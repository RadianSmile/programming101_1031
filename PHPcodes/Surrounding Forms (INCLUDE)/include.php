<?php

$page_title = 'PHP Include';
include ('includes/header.html');

if ($_SERVER ['REQUEST_METHOD'] != 'POST') 
{
	echo' <form action ="include.php" method= "POST">
			<p> Name:<input type= "text" name ="name" ></p>
			<p> Email: <input type ="text" name = "mail"> </p>
			<p> <input type = "submit" > </p> 
		</form>';
}
else
{
	$name = $_POST['name'];
	echo "$name";
}

include ('includes/footer.html');
