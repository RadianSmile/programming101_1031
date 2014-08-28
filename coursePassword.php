<?php
$pwd = 'std';
$teacherPwd = 'teacher' ; 
$TAPwd = 'TA';
$enterPwd = "";
if ( isset($_POST["pwd"] )){
	$enterPwd = $_POST["pwd"] ;
}

if ($enterPwd == $pwd){
	echo "true";
}else if ($enterPwd == $teacherPwd ){
	echo "teacher";
	}else if ($enterPwd == $TAPwd ){
			echo "TA";
	}else {
		echo "false";
	}
?>