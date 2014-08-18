<?php

require 'vendor/autoload.php';
 
use Parse\ParseClient;
 
ParseClient::initialize('9eo5r1mHWoIPSTCzmrpdKa3lcHPjySx4y5D6q8Nq', 'CIwiquHYxfkUwcpDqJlaQJNB1maUgrKu5Dhpuwxn', 'eaZQgR00D42lVdRIXZNUp5agsCWxZ5D9o9TP3X9E');


use Parse\ParseObject;
 
$testObject = ParseObject::create("TestObject");
$testObject->set("foo", "bar");
$testObject->save();

?>
