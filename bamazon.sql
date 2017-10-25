CREATE DATABASE bamazon_db;

USE bamazon_db

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Converse", "Clothing, Shoes &amp; Jewelry", 65, 100),
("Echo", "Amazon Devices", 100, 1000),
("Golden Devil's Ivy Plant", "Lawn &amp; Garden", 4, 150),
("Pantone Coffee Mug", "Home &amp; Kitchen", 9.40, 10),
("Wool Wrap Trench Coat", "Clothing, Shoes &amp; Jewelry", 395, 75),
("Assorted Plastic Dinosaurs", "Toys &amp; Games", 13.59, 40),
("Harry Potter Gryfffindor Tie", "Toys &amp; Games", 5.59, 100),
("Mortar &amp; Pestal", "Home &amp; Kitchen", 20, 50),
("Beetlejuice Martha Mask", "Costumes &amp; Accessories", 36, 200),
("Star Wars Rey Costumes", "Costumes &amp; Accessories", 28.90, 500)

SELECT * from products