CREATE TABLE  `users` (
 `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `first_name` VARCHAR( 20 ) NOT NULL ,
 `last_name` VARCHAR( 40 ) NOT NULL ,
 `email` VARCHAR( 60 ) NOT NULL ,
 `pass` VARCHAR( 40 ) NOT NULL ,
 `reg_date` DATETIME NOT NULL ,
UNIQUE ( `email` )
) ENGINE = INNODB;