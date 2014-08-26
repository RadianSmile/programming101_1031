<?php

$url ;
if (isset($_POST['url']) )
{
	$url = $_POST['url'];
}else {
	$url = "http://radiansmile.github.io/CodeEDU/final_11/play.html";
}


//$filename = substr(strrchr($url, "/"), 1);
echo strripos($url, "/") . "<br>" ;
echo strlen($url) . "<br>";
echo substr($url, 0 , strripos($url, "/") ) . "/";

//echo $filename = substr ()

$doc = new DomDocument;
// We need to validate our document before refering to the id
$doc->validateOnParse = true;
libxml_use_internal_errors(true);
$doc->loadHtml(file_get_contents($url));
libxml_clear_errors();

$a = $doc->getElementById("pde");
$b = $url . $a->getAttribute("data-processing-sources");

//echo file_get_contents($b);


/**Rn** http://stackoverflow.com/questions/5045598/getting-elements-of-a-div-from-another-page-php  */
?>


