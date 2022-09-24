use market;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `make_year_analysis`(in year_pick int)
BEGIN
	select DATE_FORMAT(modified_date, '%Y-%m') as date,  sum(total) as total from orders
	where YEAR(modified_date) = year_pick && status = "Đã giao"
	group by date;
END; $$
