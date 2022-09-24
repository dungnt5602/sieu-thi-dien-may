use market;
CREATE DEFINER=`root`@`localhost` PROCEDURE `make_analysis`(in date1 date, in date2 date)
BEGIN
	Select modified_date as date, sum(total) as total from orders
    where modified_date between date1 and date2 && status = "Đã giao"
    group by modified_date;
END

use market;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `make_analysis`(in date1 date, in date2 date)
BEGIN
	Select modified_date as date, sum(total) as total from orders
    where modified_date between date1 and date2 && status = "Đã giao"
    group by modified_date;
END; $$
