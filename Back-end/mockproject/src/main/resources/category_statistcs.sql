use market;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `category_statistics`()
BEGIN
   select category_name, count(product_name) as product_quantity from 
	(select category.id, category.name as category_name, product.name as product_name from product 
	inner join category on category.id = product.category_id) as tab group by category_name;
END; $$

