<?php
//$url = $_POST["url"];
//http://stackoverflow.com/questions/845220/get-the-last-modified-date-of-a-remote-file
$curl = curl_init("http://radiansmile.github.io/CodeEDU/final_11/play.html");
curl_setopt($curl, CURLOPT_NOBODY, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FILETIME, true);
$result = curl_exec($curl);
if ($result === false) {
    die (curl_error($curl)); 
}
$timestamp = curl_getinfo($curl, CURLINFO_FILETIME);
if ($timestamp != -1) { //otherwise unknown
    echo date("Y-m-d H:i:s", $timestamp); //etc
} 