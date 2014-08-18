<title>ggg</title>
<?php 

set_error_handler ('error_handler');

function error_handler ($level , $message , $file , $line)
{
	echo "Error [$level] : $message <br> (Check line $line in $file )";
}
$num = 500 ;

if ($num > 100)
{
	trigger_error ('Num must be less than 100' , E_USER_ERROR );
}


?>