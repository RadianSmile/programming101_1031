<?php
$stdPwd = 'std781';
$teacherPwd = 'm6s/6cl6781!' ; 
$TAPwd = 'ta-781!';
$enterPwd = "";
if ( isset($_POST["pwd"] )){
	$enterPwd = $_POST["pwd"] ;
}

if ($enterPwd == $stdPwd){
	echo "student";
}else if ($enterPwd == $teacherPwd ){
	echo "teacher";
	}else if ($enterPwd == $TAPwd ){
			echo "TA";
	}else {
		echo "false";
	}
?>