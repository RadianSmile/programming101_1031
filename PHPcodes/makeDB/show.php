<?php
require ("dbc.php");

$q =' SELECT * FROM cars ';
$r = mysqli_query ($dbc , $q );

echo '<table width="400px">
<tr>
	<th> <h1>Name</h1></th>
    <th> <h1>Style</h1></th>
    <th> <h1>Price</h1></th>
</tr>';

while ($row = mysqli_fetch_array ($r,MYSQLI_ASSOC ))
{
	echo '<tr>';
	echo '<td>' . $row['name'] . '</td>';
	echo '<td>' . $row['style'] . '</td>';
	echo '<td>' . $row['price'] . '</td>';
	echo '</tr>';
}	echo '</table>'

?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>別人的車子</title>
</head>
</html>