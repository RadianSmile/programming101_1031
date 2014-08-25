<?php
require '../vendor/autoload.php';
use Parse\ParseClient;
ParseClient::initialize('9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq', 'CIwiquHYxfkUwcpDqJlaQJNB1maUgrKu5Dhpuwxn', 'eaZQgR00D42lVdRIXZNUp5agsCWxZ5D9o9TP3X9E');


use Parse\ParseObject;
 
$uid = $_POST["uid"];
$name = $_POST["name"];



$testObject = ParseObject::create("TestObject");
$testObject->set("name",$name);
$testObject->set("uid",$uid);




try {
	$testObject->save();
	$a = json_encode ($testObject);
	echo $a ;
  echo 'New object created with objectId: ' . $testObject->getObjectId();
} catch (ParseException $ex) {  
  // Execute any logic that should take place if the save fails.
  // error is a ParseException object with an error code and message.
  echo 'Failed to create new object, with error message: ' + $ex->getMessage();
}

?>
