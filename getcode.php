<?php
error_reporting(0);;
$url ;
if (isset($_POST['url']) )
{
	$url = $_POST['url'];
}else {
	//$url = "http://radiansmile.github.io/CodeEDU/final_11/play.html";
	//$url = "http://stackoverflow.com/questions/5975526/iframe-onload-eventt";
	//$url = "http://github.com/radiansmile";
	//$url = "http://radiansmile.github.io/CodeEDU/final_11/final_11.pde";
	
	echo $_POST['url'] ;
	echo "no val";
	return false ;
}
/********* 暫時不貼心




if (!file_get_contents($url)){ // 這邊在確定 file get content 能不能存取到 play.html
//	echo file_get_contents($url);
	echo "no play";
	return false;
}else{  // 這邊在確定是不是為 github.io
	$parse = parse_url($url);
	$domain = $parse['host'];
	$host = substr($domain, strpos($domain, ".") +1);
	if ($host != "github.io"){
		echo "wrong host" ;
		return false;
	}
}

	//echo $host ;

******************/


$root = substr($url, 0 , strripos($url, "/") ) . "/";

//echo $filename = substr ()

$doc = new DomDocument;
// We need to validate our document before refering to the id
$doc->validateOnParse = true;
libxml_use_internal_errors(true);
$doc->loadHtml(file_get_contents($url));
libxml_clear_errors();

$a = $doc->getElementById("pde");
if (gettype ($a) === "NULL"){
	echo "wrong play" ;
	return false;
}
$b = $root . $a->getAttribute("data-processing-sources");

//error_reporting(0);
$content = file_get_contents($b) ;
echo  $content ? $content  : 'no code';


/**Rn** http://stackoverflow.com/questions/5045598/getting-elements-of-a-div-from-another-page-php  */
?>


