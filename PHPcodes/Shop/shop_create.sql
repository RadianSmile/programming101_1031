CREATE TABLE  `shop` (
 `item_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `item_name` VARCHAR( 20 ) NOT NULL ,
 `item_desc` VARCHAR( 200 ) NOT NULL ,
 `item_img` VARCHAR( 20 ) NOT NULL ,
 `item_price` INT UNSIGNED NOT NULL
) ENGINE = INNODB;

-------------------------------------------------------------------------
INSERT INTO shop 
	(item_name, item_desc, item_img,item_price)
VALUES 
	("City" , "A bit of blue." , "images/a.jpg" , 20),
	("Purple","It is pretty purple.","images/b.jpg",22),
	("Colors","Beautiful colors!","images/c.jpg",25),
	("Dots","Full of circles!","images/d.jpg",30),
	("Light","Wonderful lights cross.","images/e.jpg",28),
	("Green","A leaf with water.","images/f.jpg",25,)

-------------------------------------------------------------------------
CREATE TABLE  `orders` (
 `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `user_id` INT UNSIGNED NOT NULL ,
 `total` INT NOT NULL ,
 `order_date` DATETIME NOT NULL
) ENGINE = INNODB;

-------------------------------------------------------------------------

CREATE TABLE  `order_contents` (
 `content_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `order_id` INT UNSIGNED NOT NULL ,
 `item_id` INT UNSIGNED NOT NULL ,
 `quantity` INT UNSIGNED NOT NULL DEFAULT  '1',
 `price` INT UNSIGNED NOT NULL
) ENGINE = INNODB;
