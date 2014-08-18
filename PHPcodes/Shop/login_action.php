<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
	require ('../dbc.php');
	require ('login_tools.php');
	
	list ($check , $data ) = validate ($dbc , $_POST['email'] , $_POST['pass']);

	if ($check)
	{
		session_start();
		
		$_SESSION['user_id'] = $data ['id'];
		$_SESSION['first_name'] = $data ['first_name'];
		$_SESSION['last_name'] = $data ['last_name'];
		
		load('home.php');
		
	}else{
		$errors = $data ;
	}
	mysqli_close($dbc);
}
include ('login.php');

?>