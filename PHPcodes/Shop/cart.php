<?php

session_start();

if (!isset($_SESSION['user_id']))
{
	require ('login_tools.php');
	load();
}

$page_title ='Cart';
include ('includes/header.html');

if ($_SERVER['REQUEST_METHOD'] == "POST") 
{
	foreach ($_POST['qty'] as $item_id => $item_qty)
	{
		$id = (int) $item_id;
		$qty = (int) $item_qty ;
		
		if ($qty == 0 ) 
		{
			unset($_SESSION['cart'][$id]);	
		}else if ($qty > 0){
			$_SESSION['cart'][$id]['quantity'] = $qty ;
		}
	}
}
$total =0 ;

if (!empty ($_SESSION['cart']))
{
	require('..\dbc.php');
	$q = "SELECT * FROM shop WHERE item_id IN (";
	foreach($_SESSION['cart'] as $id => $value)
	{
		$q.= $id .',';	
	}
	$q = substr ($q ,0 , -1 ).')ORDER BY item_id ASC'; #substr 用法: http://php.net/manual/en/function.substr.php
	$r = mysqli_query ($dbc , $q);
	
	echo '<form action="cart.php" method="post"><table><tr><th colspan="5">Items in your cart </th></tr><tr>';
	while ($row = mysqli_fetch_array ($r , MYSQLI_ASSOC))
	{
		#Calculate sub-tatal and grand total.
		$subtotal = $_SESSION['cart'][$row['item_id']]['quantity'] * $_SESSION['cart'][$row['item_id']]['price'];
		$total += $subtotal;
	
		#display the roew 
		echo"<tr><td>{$row['item_name']}</td>
		<td>
		<input type=\"text\" size=\"3\" name =\"qty[{$row['item_id']}]\" 
		value=\"{$_SESSION['cart'][$row['item_id']]['quantity']}\" />
		</td>
		<td>@{$row['item_price']} = </td>
		<td>".number_format($subtotal,2)."</td></tr>";
	}
	echo '<tr><td colspan="5" >
	Total = '.number_format($total,2).' </td><tr>
	</table>
	<input type="submit" value="Update My Chart">
	</form>';
	
	mysqli_close($dbc);			
}else {
	echo '<p>Your cart id currently empty. </p>';
}


echo '<p><a href="Shop.php">Shop</a>|
<a href="checkout.php?total='.$total.'">Checkout</a>|
<a href="forum.php">Forum</a>|
<a href="home.php">Home</a>|
<a href="goodbye.php">Logout</a>';

include ('includes/footer.html');
?>






            
            

            
	