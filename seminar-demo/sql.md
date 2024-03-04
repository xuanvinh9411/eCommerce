// Create table 

CREATE TABLE  test_table (
    id int NOT NULL,
    name varchar(255) DEFAULT NULL,
    age int DEFAULT NULL,
    address varchar(255) Default Null,
    primary key (id)
) ENGINE= InnoDB Default CHARSET=utf8mb4 

// Create procedure
create definer = `tipjs `@`%` PROCEDURE `INSERT_DATA` ( )
BEGIN 
DECLARE max_id INT defaule 10,000,000;
DECLARE i int default 1 ;
while i <= max_id Do 
insert into test_table (id, name ,age, address) values (i, CONCAT('name', i),i%100, CONCAT ('Address',i));
SET i = i + 1;
END WHILE;
END ;