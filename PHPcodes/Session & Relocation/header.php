<?php
if (isset($_POST['id']))
{
	$id = $_POST['id'];
	# Handler be inserted here

	if ($id == 123)
	{
		session_start();
		$_SESSION['id'] = $id ;
		header('Location:location.php');
		exit(); 
		# the exit fun is used to stoping this page go through the following script ;
	}else{
		echo "Your ID #$id is incorrect !!";
	}
}

echo '<form action="header.php" method="POST">
<fieldset>
	<legend>Enter your id here</legend>
	<p> ID: <input type="text" name="id" > </p>
	<p> <input type ="submit">
</fieldset>'
?>
