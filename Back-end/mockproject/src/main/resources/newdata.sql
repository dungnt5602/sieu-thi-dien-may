use `market`;
-- Customer
use `market`;
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (1, 'Hai Nguyen', 'F', 'nguyen@abc.com', '0123456789', '20 Long Bien', 'nguyen', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (2, 'Duy Manh', 'M', 'duy@abc.com', '0123456789', '10 Long Bien 1', 'duymanh', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (3, 'Tan Dung', 'M', 'dung@abc.com', '0123456789', '30 Long Bien', 'tandung', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (4, 'Hung', 'M', 'hung@abc.com', '0123456789', '30 Long Bien', 'hung', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (5, 'Vinh', 'F', 'vinh@abc.com', '0123456789', '50 Long Bien', 'vinh', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (6, 'Hai ', 'F', 'hai@abc.com', '0123456789', '20 Long Bien', 'hai', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (7, 'Meo', 'M', 'meo@abc.com', '0123456789', '20 Long Bien', 'meo', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'USER', '2017-07-13 12:09:49', '2022-01-24 19:44:35');
insert into user (id, name, gender, email, mobile, address, username, password, role, created_on, last_login) values (8, 'Phung Nguyen', 'M', 'nguyenad@abc.com', '0123456789', '20 Long Bien', 'admin', '$2a$10$L9PD2TsMfTqNB.r2K9dtbuJK5W2EG6JJ7mqsL/3riL1PsFWa0Yzmq', 'ADMIN', '2017-07-13 12:09:49', '2022-01-24 19:44:35');

-- category
insert into category (id, name, content, created_on) values (1, 'Máy lạnh - Máy lọc không khí', 'Máy lạnh - Máy lọc không khí', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (2, 'Tivi - Loa - Âm thanh', 'Tivi - Loa - Âm thanh', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (3, 'Máy giặt - Máy sấy', 'Máy giặt - Máy sấy', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (4, 'Đồ gia dụng', 'Đồ gia dụng', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (5, 'Tủ lạnh - Tủ đông - Tủ mát', 'Tủ lạnh - Tủ đông - Tủ mát', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (6, 'Điện thoại - Table - Phụ kiện', 'Điện thoại - Table - Phụ kiện', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (7, 'Laptop - PC - Phụ kiện', 'Laptop - PC - Phụ kiện', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (8, 'Máy ảnh - Máy quay', 'Máy ảnh - Máy quay', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (9, 'Máy in - Thiết bị văn phòng', 'Máy in - Thiết bị văn phòng', '2018-05-07 11:33:54');
insert into category (id, name, content, created_on) values (10, 'Công cụ - Bách hóa', 'Công cụ - Bách hóa', '2018-05-07 11:33:54');

-- product
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1, 'Máy lạnh Toshiba Inverter 1 HP RAS-H10DKCVG-V', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Toshiba',  'Thương hiệu máy lạnh gần gũi với người tiêu dùng Việt, Tosiba thiết kế dòng máy lạnh Toshiba Inverter 1 HP RAS-H10DKCVG-V với kiểu dáng nhỏ gọn, công suất 1 HP phù hợp cho những không gian phòng ngủ hoặc phòng khách có diện tích 15 m2 đổ lại. Tiết kiệm điện năng tối ưu,...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-toshiba-ras-h10dkcvg-v-1-org-fa5ffecd-fe7e-4468-930e-7981e67cf12b.jpg?v=1526179729240', 10.5, 14, 100, '2018-06-01 13:05:17', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9UKH-8', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Panasonic',  'Sản phẩm máy lạnh Panasonic Inverter 1 HP CU/CS-PU9UKH-8 thuộc dòng máy lạnh Inverter tiêu chuẩn 2018 của Panasonic, được khoát lên mình màu trắng ánh ngọc trai tinh tế, quý phái, kèm theo đó cửa gió cũng được thiết kế rộng hơn giúp thổi gió xa hơn mát lạnh nhanh hơn. Công nghệ Inverter...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/panasonic-cu-cs-pu9ukh-8-1-1-org-5ff57c6f-97f7-4e87-ad05-4b1a99859935.jpg?v=1526179558433', 10.6, 12, 100, '2017-09-17 23:11:16', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Daikin Inverter 1 HP FTKQ25SVMV', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Daikin',  'Với thiết kế nhỏ gọn, vẻ ngoài màu trắng tinh tế, máy lạnh Daikin Inverter 1 HP FTKQ25SVMV sẽ mang đến vẻ đẹp thanh lịch cho không gian phòng ốc nhà bạn. Máy có công suất làm lạnh là 1 HP, thích hợp cho khoảng không gian vừa và nhỏ (dưới 15m2) như phòng ngủ, phòng làm việc,...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-daikin-ftkq25svmv-1-org.jpg?v=1526179414280', 10.5, 20, 100, '2017-09-23 21:06:54', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Sharp 1 HP AH-A25UEW', 'Thường, treo tường, 1 HP', 'S7224XB', 'Sharp',  'Sản phẩm máy lạnh Sharp 1 HP AH-A25UEW thuộc dòng máy lạnh Inverter tiêu chuẩn 2018 của Sharp, được khoát lên mình màu trắng ánh ngọc trai tinh tế, quý phái, kèm theo đó cửa gió cũng được thiết kế rộng hơn giúp thổi gió xa hơn mát lạnh nhanh hơn. Công nghệ Inverter...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-sharp-ah-a25uew-1-org.jpg?v=1522674848363', 7.8, 19, 100, '2018-07-10 03:12:05', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Samsung Inverter 1 HP AR10NVFHGWKNSV', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Samsung',  'Với thiết kế nhỏ gọn, vẻ ngoài màu trắng tinh tế, máy lạnh Samsung Inverter 1 HP AR10NVFHGWKNSV sẽ mang đến vẻ đẹp thanh lịch cho không gian phòng ốc nhà bạn. Máy có công suất làm lạnh là 1 HP, thích hợp cho khoảng không gian vừa và nhỏ (dưới 15m2) như phòng ngủ, phòng làm việc,...', 'https://bizweb.dktcdn.net/100/304/529/products/may-lanh-samsung-ar10nvfhgwknsv-1-org.jpg?v=1522674505833', 9.5, 18, 100, '2018-08-23 21:37:47', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Toshiba Inverter 1 HP RAS-H10DKCVG-V', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Toshiba',  'Thương hiệu máy lạnh gần gũi với người tiêu dùng Việt, Tosiba thiết kế dòng máy lạnh Toshiba Inverter 1 HP RAS-H10DKCVG-V với kiểu dáng nhỏ gọn, công suất 1 HP phù hợp cho những không gian phòng ngủ hoặc phòng khách có diện tích 15 m2 đổ lại. Tiết kiệm điện năng tối ưu,...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-toshiba-ras-h10dkcvg-v-1-org-fa5ffecd-fe7e-4468-930e-7981e67cf12b.jpg?v=1526179729240', 12.0, 18, 100, '2019-01-09 19:19:51', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9UKH-8', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Panasonic',  'Sản phẩm máy lạnh Panasonic Inverter 1 HP CU/CS-PU9UKH-8 thuộc dòng máy lạnh Inverter tiêu chuẩn 2018 của Panasonic, được khoát lên mình màu trắng ánh ngọc trai tinh tế, quý phái, kèm theo đó cửa gió cũng được thiết kế rộng hơn giúp thổi gió xa hơn mát lạnh nhanh hơn. Công nghệ Inverter...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/panasonic-cu-cs-pu9ukh-8-1-1-org-5ff57c6f-97f7-4e87-ad05-4b1a99859935.jpg?v=1526179558433', 12.6, 22, 100, '2018-04-15 07:41:40', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Daikin Inverter 1 HP FTKQ25SVMV', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Daikin',  'Với thiết kế nhỏ gọn, vẻ ngoài màu trắng tinh tế, máy lạnh Daikin Inverter 1 HP FTKQ25SVMV sẽ mang đến vẻ đẹp thanh lịch cho không gian phòng ốc nhà bạn. Máy có công suất làm lạnh là 1 HP, thích hợp cho khoảng không gian vừa và nhỏ (dưới 15m2) như phòng ngủ, phòng làm việc,...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-daikin-ftkq25svmv-1-org.jpg?v=1526179414280', 13.5, 13, 100, '2018-07-31 15:07:01', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Sharp 1 HP AH-A25UEW', 'Thường, treo tường, 1 HP', 'S7224XB', 'Sharp',  'Sản phẩm máy lạnh Sharp 1 HP AH-A25UEW thuộc dòng máy lạnh Inverter tiêu chuẩn 2018 của Sharp, được khoát lên mình màu trắng ánh ngọc trai tinh tế, quý phái, kèm theo đó cửa gió cũng được thiết kế rộng hơn giúp thổi gió xa hơn mát lạnh nhanh hơn. Công nghệ Inverter...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-lanh-sharp-ah-a25uew-1-org.jpg?v=1522674848363', 10.1, 12, 100, '2019-06-09 10:46:35', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (1,'Máy lạnh Samsung Inverter 1 HP AR10NVFHGWKNSV', 'Inverter, treo tường, 1 HP', 'S7224XB', 'Samsung',  'Với thiết kế nhỏ gọn, vẻ ngoài màu trắng tinh tế, máy lạnh Samsung Inverter 1 HP AR10NVFHGWKNSV sẽ mang đến vẻ đẹp thanh lịch cho không gian phòng ốc nhà bạn. Máy có công suất làm lạnh là 1 HP, thích hợp cho khoảng không gian vừa và nhỏ (dưới 15m2) như phòng ngủ, phòng làm việc,...', 'https://bizweb.dktcdn.net/100/304/529/products/may-lanh-samsung-ar10nvfhgwknsv-1-org.jpg?v=1522674505833', 10.5, 12, 100, '2019-02-25 07:58:30', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2, 'Internet Tivi Sony 43 inch KDL-43W750E', 'Internet TV, 32 - 43 inch, 720p', 'S7224XB', 'Sony',  'Thiết kế sang trọng, cao cấp Internet Tivi Sony 43 inch KDL-43W750E sở hữu thiết kế viền màn hình mỏng ấn tượng, tạo nên cảm giác mạnh mẽ, hiện đại. Tivi còn được trang bị chân đế nhỏ gọn tinh tế nhưng vẫn không kém phần vững chãi, nhờ đó giúp tivi...', 'http://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivisonykdl43w750e12org.jpg', 16, 22, 100, '2017-09-05 05:01:41', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Android Tivi Sony 4K 43 inch KD-43X7500E', 'Android TV, 32 - 43 inch, 4K', 'S7224XB', 'Sony',  'Thiết kế mỏng ấn tượng Smart Tivi Sony 4K 43 inch KD-43X7500E sở hữu kiểu dáng tinh tế, thời trang cùng với kích thước màn hình rộng 43 inch, kết hợp khung viền chắc chắn, sắc sảo và tông màu đen quý phái. Trải nghiệm hình ảnh rõ ràng, chân thật Không chỉ...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivisonykd43x7500e1org.jpg?v=1522678737737', 22, 31, 100, '2018-06-26 20:25:37', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Smart Tivi Samsung 43 inch UA43K5310', 'Smart TV, 32 - 43 inch, 4K', 'S7224XB', 'Samsung',  'Thiết kế theo phong cách Joiii: mới lạ, trẻ trung và độc đáo Chân đế tivi có thể dễ dàng tháo rời và thay đổi để tạo ra 2 dáng khác nhau tuỳ sở thích của bạn. Smart tivi Samsung giao diện thân thiện, nhiều ứng dụng giải trí đặc sắc Giao diện Tizen của...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivisamsungua43k5310114org.jpg?v=1522678731897', 34, 20, 100, '2019-02-15 13:23:25', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Smart Tivi Samsung 43 inch UA43M5500', 'Smart TV, 32 - 43 inch, 4K', 'S7224XB', 'Samsung',  'Thiết kế tinh tế, hiện đại Smart Tivi Samsung 43 inch UA43M5500 có thiết kế khá tinh tế và hiện đại, giúp làm sống động cho căn nhà của bạn. Độ phân giải màn hình Full HD Tivi Samsung sở hữu độ phân giải màn hình Full HD giúp bạn trải nghiệm nội...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivisamsungua43m55001org.jpg?v=1522678729207', 16, 32, 100, '2017-11-19 12:57:46', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Smart Tivi LG 32 inch 32LJ571D', 'Smart TV, 32 - 43 inch, 4K', 'S7224XB', 'LG',  'Thiết kế mượt mà, tinh tế Thiết kế mượt mà cùng màu xám nổi bật của Smart Tivi LG 32 inch 32LJ571D mang đến sự tinh tế, sang trọng cho ngôi nhà của bạn. Khả năng xử lý hình ảnh mạnh mẽ Thế hệ tivi LG mới với khả năng xử lý hình...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivilg32lj571d11org.jpg?v=1522678727813', 9.4, 26, 100, '2017-12-25 03:32:04', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Internet Tivi Samsung 49 inch UA49J5200', 'Internet TV, 44 - 55 inch, 1080p', 'S7224XB', 'Samsung',  'Thiết kế mỏng, tinh tế và chân đế độc đáo, chắc chắn Hình ảnh Full HD rực rỡ nhờ công nghệ Wide Color Enhancer Plus mang đến hệ màu mở rộng hơn Ngoài ra, tivi còn được trang bị chế độ bóng đá Soccer Mode để tối ưu hình ảnh, âm thanh, tăng thêm...', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/304/529/products/tivisamsung49inchua49j520014or.jpg?v=1522678761387', 16.8, 21, 100, '2018-10-08 11:20:58', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Android Tivi Sony 4K 49 inch KD-49X7500E', 'Android TV, 44 - 55 inch, 4K', 'S7224XB', 'Sony',  'Thiết kế mỏng ấn tượng Smart Tivi Sony 4K 49 inch KD-49X7500E sở hữu kiểu dáng tinh tế, thời trang cùng với kích thước màn hình rộng 49 inch, kết hợp khung viền chắc chắn, sắc sảo và tông màu đen quý phái. Trải nghiệm hình ảnh rõ ràng, chân thật Không chỉ...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivisonykd49x7500e1org.jpg?v=1522678713450', 22, 10, 100, '2017-08-14 22:38:49', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
    -- values ('Smart Tivi QLED Samsung 65 inch QA65Q9F', 'S7224XB', 'Samsung',  'Thiết kế theo phong cách Joiii: mới lạ, trẻ trung và độc đáo Chân đế tivi có thể dễ dàng tháo rời và thay đổi để tạo ra 2 dáng khác nhau tuỳ sở thích của bạn. Smart tivi Samsung giao diện thân thiện, nhiều ứng dụng giải trí đặc sắc Giao diện Tizen của...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivi-samsung-qa65q9f-1-org.jpg?v=1522676040707', 110, 9, 100, '2018-08-12 09:10:50', '2022-01-06 08:02:50');
-- insert into product (name, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Internet Tivi Sony 4K 55 inch KD-55X7000E', 'Internet TV, 44 - 55 inch, 4K', 'S7224XB', 'Sony',  'Thiết kế mỏng, kiểu dáng hiện đại Internet Tivi Sony 4K 55 inch KD-55X7000E sở hữu thiết kế mỏng, kiểu dáng hiện đại, sẽ làm cho căn phòng của bạn thêm phần tinh tế. Độ phân giải 4K kết hợp cùng HDR mang đến hình ảnh rõ nét, tăng độ sâu Nhờ có...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivi-sony-kd-55x7000e-1-org.jpg?v=1522675845733', 22, 9, 100, '2019-07-10 03:53:24', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Smart Tivi LG 4K 43 inch 43UJ633T', 'Smart TV, 32 - 43 inch, 4K', 'S7224XB', 'LG',  'Kiểu dáng hiện đại, sang trọng Smart Tivi LG 4K 43 inch 43UJ633T ra mắt với thiết kế hiện đại cùng tông màu đen sang trọng, lịch lãm. Chân đế tivi hình chữ V úp ngược thanh mảnh nhưng không kém phần vững chắc giúp tivi LG 43 inch có thể trụ vững trên nhiều dạng mặt...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/lg-43uj633t-1-1-org.jpg?v=1522675709577', 11, 4, 100, '2019-05-04 17:27:39', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Smart Tivi Samsung 4K 43 inch UA43MU6400', 'Smart TV, 32 - 43 inch, 4K', 'S7224XB', 'Samsung',  'Thiết kế tinh tế, sang trọng Smart Tivi Samsung 4K 43 inch UA43MU6400 là chiếc Smart tivi vừa được Samsung ra mắt trong năm 2017. Chiếc tivi Samsung này dễ dàng hấp dẫn người dùng ngay từ cái nhìn đầu tiên bởi thiết kế sang trọng, đẹp mắt và tinh tế. Thiết kế mỏng, chân đế sang...', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/304/529/products/tivi-samsung-ua43mu6400-1-1-org.jpg?v=1522675592440', 14.6, 5, 100, '2017-05-02 03:27:34', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (2,'Android Tivi Sony 43 inch KD-43X8000E', 'Android TV, 32 - 43 inch, 1080p', 'S7224XB', 'Sony',  'Thiết kế ấn tượng với màn hình mỏng Đặc biệt, phía sau chiếc tivi Sony này, hãng đã tinh tế trang bị thêm không gian để bạn "giấu" các dây cáp kết nối một cách gọn gàng và thẩm mỹ. Kích thước tivi Sony 43 inch rộng rãi, phù hợp với nhiều không gian bố trí trong...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/tivi-sony-kd-43x8000e-1-10-org.jpg?v=1522675421647', 11, 4, 100, '2019-02-08 01:33:54', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3, 'Máy sấy Electrolux 6.5 kg EDV6552', 'Cửa trước, 6.5 kg', 'S7224XB', 'Electrolux',  'Máy sấy Electrolux EDV6552 sở hữu thiết kế nhỏ gọn, chắc chắn cùng đường nét tinh tế, gam màu trắng trang nhã giúp tô điểm cho không gian nội thất hiện đại của gia đình bạn. Chiếc máy sấy Electrolux 6,5 kg này sẽ mang lại cho gia đình bạn những bộ quần áo khô ráo, thơm mát...', 'https://bizweb.dktcdn.net/100/304/529/products/may-say-quan-ao-electrolux-edv6552-4-org.jpg?v=1522677243847', 8.2, 3, 100, '2019-06-09 04:13:33', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy sấy Electrolux 7.5 kg EDS7552', 'Cửa trước, 7.5 kg', 'S7224XB', 'Electrolux',  'Sở hữu thiết kế nhỏ gọn nhưng không kém phần sang trọng, máy sấy Electrolux EDS7552 sẽ dễ dàng phù hợp với mọi kiểu không gian nội thất. Bạn có thể đặt máy sấy này ở cạnh máy giặt, treo tường hoặc đặt lên trên máy giặt cửa trước Electrolux, rất tiện để tiết kiệm diện tích...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/electrolux-eds7552-1-1-org.jpg?v=1522677128177', 10.9, 10, 100, '2018-01-31 03:14:05', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt Electrolux Inverter 8 kg EWF12844S', 'Cửa trước, 8 kg', 'S7224XB', 'Electrolux',  'Máy giặt lồng ngang có thiết kế cửa trước tiện dụng Với khối lượng giặt là 8 kg, máy giặt Electrolux EWF12844S giặt được một khối lượng lớn các quần áo bẩn trong ngày. Nếu gia đình bạn có từ 4 – 5 thành viên thì chiếc máy giặt này sẽ là sự lựa chọn rất đáng để...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-electrolux-ewf12844s-org-1.jpg?v=1522677014383', 12.4, 3, 100, '2019-05-02 04:30:14', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt Samsung AddWash Inverter 8 kg WW80K5233YW/SV', 'Cửa trước, 8 kg', 'S7224XB', 'Samsung',  'Máy giặt Samsung WW80K5233YW/SV sở hữu thiết kế tinh tế, nhỏ gọn vô cùng hiện đại, kết hợp cùng gam màu trắng sang trọng, giúp tạo điểm nhấn cho không gian nội thất ngôi nhà bạn. Đáp ứng được nhu cầu giặt giũ lớn, chiếc máy giặt Samsung 8 kg này sẽ là lựa chọn phù hợp cho những gia đình có 4 - 5 thành viên...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-samsung-ww80k5233yw-sv-1-2-org.jpg?v=1522676905127', 10.4, 2, 100, '2017-09-27 12:54:24', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt LG inverter 8 kg FC1408S4W2', 'Cửa trước, 8 kg', 'S7224XB', 'LG',  'Máy giặt LG FC1408S4W2 có thiết kế cửa trước hiện đại, sắc trắng trung tính sẽ làm nổi bật lên vẻ đẹp sang trọng cho không gian nội thất của gia đình. Hơn nữa với kiểu lồng giặt ngang, bạn sẽ không phải khom lưng quá nhiều để bỏ vào hoặc lấy quần áo ra khỏi máy, giúp bảo vệ cột sống của bạn...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-lg-fc1408s4w2-org-1-org.jpg?v=1522676790010', 10.7, 9, 100, '2017-07-12 10:00:14', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3, 'Máy sấy Electrolux 6.5 kg EDV6552', 'Cửa trước, 6.5 kg', 'S7224XB', 'Electrolux',  'Máy sấy Electrolux EDV6552 sở hữu thiết kế nhỏ gọn, chắc chắn cùng đường nét tinh tế, gam màu trắng trang nhã giúp tô điểm cho không gian nội thất hiện đại của gia đình bạn. Chiếc máy sấy Electrolux 6,5 kg này sẽ mang lại cho gia đình bạn những bộ quần áo khô ráo, thơm mát...', 'https://bizweb.dktcdn.net/100/304/529/products/may-say-quan-ao-electrolux-edv6552-4-org.jpg?v=1522677243847', 10.2, 12, 100, '2019-06-09 04:13:33', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy sấy Electrolux 7.5 kg EDS7552', 'Cửa trước, 7.5 kg', 'S7224XB', 'Electrolux',  'Sở hữu thiết kế nhỏ gọn nhưng không kém phần sang trọng, máy sấy Electrolux EDS7552 sẽ dễ dàng phù hợp với mọi kiểu không gian nội thất. Bạn có thể đặt máy sấy này ở cạnh máy giặt, treo tường hoặc đặt lên trên máy giặt cửa trước Electrolux, rất tiện để tiết kiệm diện tích...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/electrolux-eds7552-1-1-org.jpg?v=1522677128177', 11.5, 14, 100, '2018-01-31 03:14:05', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt Electrolux Inverter 8 kg EWF12844S', 'Cửa trước, 8 kg', 'S7224XB', 'Electrolux',  'Máy giặt lồng ngang có thiết kế cửa trước tiện dụng Với khối lượng giặt là 8 kg, máy giặt Electrolux EWF12844S giặt được một khối lượng lớn các quần áo bẩn trong ngày. Nếu gia đình bạn có từ 4 – 5 thành viên thì chiếc máy giặt này sẽ là sự lựa chọn rất đáng để...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-electrolux-ewf12844s-org-1.jpg?v=1522677014383', 13.5, 8, 100, '2019-05-02 04:30:14', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt Samsung AddWash Inverter 8 kg WW80K5233YW/SV', 'Cửa trước, 8 kg', 'S7224XB', 'Samsung',  'Máy giặt Samsung WW80K5233YW/SV sở hữu thiết kế tinh tế, nhỏ gọn vô cùng hiện đại, kết hợp cùng gam màu trắng sang trọng, giúp tạo điểm nhấn cho không gian nội thất ngôi nhà bạn. Đáp ứng được nhu cầu giặt giũ lớn, chiếc máy giặt Samsung 8 kg này sẽ là lựa chọn phù hợp cho những gia đình có 4 - 5 thành viên...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-samsung-ww80k5233yw-sv-1-2-org.jpg?v=1522676905127', 15.1, 5, 100, '2017-09-27 12:54:24', '2022-01-06 08:02:50');
insert into product (category_id, name, characteristic, code, title,  description, img_link, price, discount, quantity, created_on, modified_date)
values (3,'Máy giặt LG inverter 8 kg FC1408S4W2', 'Cửa trước, 8 kg', 'S7224XB', 'LG',  'Máy giặt LG FC1408S4W2 có thiết kế cửa trước hiện đại, sắc trắng trung tính sẽ làm nổi bật lên vẻ đẹp sang trọng cho không gian nội thất của gia đình. Hơn nữa với kiểu lồng giặt ngang, bạn sẽ không phải khom lưng quá nhiều để bỏ vào hoặc lấy quần áo ra khỏi máy, giúp bảo vệ cột sống của bạn...', 'https://bizweb.dktcdn.net/thumb/large/100/304/529/products/may-giat-lg-fc1408s4w2-org-1-org.jpg?v=1522676790010', 12.7, 10, 100, '2017-07-12 10:00:14', '2022-01-06 08:02:50');
UPDATE market.product SET price = price * 1000000 WHERE id > 0;

insert into tag (id, name, status, created_on) values (4, 'Điều hòa không khí', 'active', '2022-03-18 02:59:32');
insert into tag (id, name, status, created_on) values (5, 'Chăm sóc quần áo', 'active', '2021-12-21 05:54:16');
insert into tag (id, name, status, created_on) values (6, 'Thiết bị làm sạch', 'active', '2022-04-28 06:26:37');
insert into tag (id, name, status, created_on) values (7, 'Đồ điện nhà bếp', 'active', '2022-01-14 06:59:13');
insert into tag (id, name, status, created_on) values (8, 'Máy nóng lạnh', 'active', '2022-06-09 06:08:40');
insert into tag (id, name, status, created_on) values (9, 'Sản phẩm du lịch', 'active', '2022-08-27 21:38:36');
insert into tag (id, name, status, created_on) values (10, 'Làm mát', 'active', '2022-09-01 19:37:05');
insert into tag (id, name, status, created_on) values (11, 'Phụ kiện PC', 'active', '2022-07-04 19:42:23');
insert into tag (id, name, status, created_on) values (22, 'Giải trí', 'active', '2022-07-04 19:42:23');
insert into tag (id, name, status, created_on) values (23, 'Đồ gia dụng', 'active', '2022-07-04 19:42:23');
insert into tag (id, name, status, created_on) values (24, 'Màn hình', 'active', '2022-07-04 19:42:23');
insert into tag (id, name, status, created_on) values (25, 'Máy giặt', 'active', '2022-07-04 19:42:23');

insert into tag (id, name, status, created_on) values (12, 'Sony', 'active', '2022-04-05 18:50:20');
insert into tag (id, name, status, created_on) values (13, 'Lenovo', 'active', '2021-11-01 06:26:11');
insert into tag (id, name, status, created_on) values (14, 'Samsung', 'active', '2022-03-16 23:42:20');
insert into tag (id, name, status, created_on) values (15, 'Toshiba', 'active', '2021-11-29 04:29:07');
insert into tag (id, name, status, created_on) values (16, 'Panasonic', 'active', '2022-02-02 20:41:50');
insert into tag (id, name, status, created_on) values (17, 'Sharp', 'active', '2022-07-10 10:05:49');
insert into tag (id, name, status, created_on) values (18, 'LG', 'active', '2022-07-16 12:10:17');
insert into tag (id, name, status, created_on) values (19, 'Electrolux', 'active', '2021-12-11 22:52:34');
insert into tag (id, name, status, created_on) values (20, 'Mitsubishi', 'active', '2022-03-26 15:20:57');
insert into tag (id, name, status, created_on) values (21, 'Daikin', 'active', '2021-11-29 04:29:07');

insert into product_tag (product_id, tag_id) values (1, 15);
insert into product_tag (product_id, tag_id) values (1, 10);
insert into product_tag (product_id, tag_id) values (1, 4);
-- insert into product_tag (product_id, tag_id) values (1, 2);
insert into product_tag (product_id, tag_id) values (2, 16);
insert into product_tag (product_id, tag_id) values (2, 4);
insert into product_tag (product_id, tag_id) values (2, 8);
-- insert into product_tag (product_id, tag_id) values (2, 2);
insert into product_tag (product_id, tag_id) values (2, 10);
insert into product_tag (product_id, tag_id) values (3, 21);
insert into product_tag (product_id, tag_id) values (3, 10);
insert into product_tag (product_id, tag_id) values (3, 4);
-- insert into product_tag (product_id, tag_id) values (3, 2);
insert into product_tag (product_id, tag_id) values (4, 17);
insert into product_tag (product_id, tag_id) values (4, 10);
insert into product_tag (product_id, tag_id) values (4, 4);
-- insert into product_tag (product_id, tag_id) values (4, 2);
insert into product_tag (product_id, tag_id) values (5, 14);
insert into product_tag (product_id, tag_id) values (5, 10);
insert into product_tag (product_id, tag_id) values (5, 4);
-- insert into product_tag (product_id, tag_id) values (5, 2);
insert into product_tag (product_id, tag_id) values (6, 15);
insert into product_tag (product_id, tag_id) values (6, 10);
insert into product_tag (product_id, tag_id) values (6, 4);
-- insert into product_tag (product_id, tag_id) values (6, 2);
insert into product_tag (product_id, tag_id) values (7, 16);
insert into product_tag (product_id, tag_id) values (7, 10);
insert into product_tag (product_id, tag_id) values (7, 4);
-- insert into product_tag (product_id, tag_id) values (7, 2);
insert into product_tag (product_id, tag_id) values (8, 21);
insert into product_tag (product_id, tag_id) values (8, 10);
insert into product_tag (product_id, tag_id) values (8, 4);
-- insert into product_tag (product_id, tag_id) values (8, 2);
insert into product_tag (product_id, tag_id) values (9, 17);
insert into product_tag (product_id, tag_id) values (9, 10);
insert into product_tag (product_id, tag_id) values (9, 4);
-- insert into product_tag (product_id, tag_id) values (9, 2);
insert into product_tag (product_id, tag_id) values (10, 14);
insert into product_tag (product_id, tag_id) values (10, 10);
insert into product_tag (product_id, tag_id) values (10, 4);
-- insert into product_tag (product_id, tag_id) values (10, 2);

insert into product_tag (product_id, tag_id) values (11, 22);
insert into product_tag (product_id, tag_id) values (11, 12);
insert into product_tag (product_id, tag_id) values (11, 24);
insert into product_tag (product_id, tag_id) values (12, 22);
insert into product_tag (product_id, tag_id) values (12, 12);
insert into product_tag (product_id, tag_id) values (12, 24);
insert into product_tag (product_id, tag_id) values (13, 22);
insert into product_tag (product_id, tag_id) values (13, 14);
insert into product_tag (product_id, tag_id) values (13, 24);
insert into product_tag (product_id, tag_id) values (14, 22);
insert into product_tag (product_id, tag_id) values (14, 14);
insert into product_tag (product_id, tag_id) values (14, 24);
insert into product_tag (product_id, tag_id) values (15, 22);
insert into product_tag (product_id, tag_id) values (15, 18);
insert into product_tag (product_id, tag_id) values (15, 24);
insert into product_tag (product_id, tag_id) values (16, 22);
insert into product_tag (product_id, tag_id) values (16, 18);
insert into product_tag (product_id, tag_id) values (16, 24);
insert into product_tag (product_id, tag_id) values (17, 22);
insert into product_tag (product_id, tag_id) values (17, 12);
insert into product_tag (product_id, tag_id) values (17, 24);
insert into product_tag (product_id, tag_id) values (18, 22);
insert into product_tag (product_id, tag_id) values (18, 12);
insert into product_tag (product_id, tag_id) values (18, 24);
insert into product_tag (product_id, tag_id) values (19, 22);
insert into product_tag (product_id, tag_id) values (19, 18);
insert into product_tag (product_id, tag_id) values (19, 24);

insert into product_tag (product_id, tag_id) values (20, 22);
insert into product_tag (product_id, tag_id) values (20, 14);
insert into product_tag (product_id, tag_id) values (20, 24);
insert into product_tag (product_id, tag_id) values (21, 22);
insert into product_tag (product_id, tag_id) values (21, 12);
insert into product_tag (product_id, tag_id) values (21, 24);
insert into product_tag (product_id, tag_id) values (22, 5);
insert into product_tag (product_id, tag_id) values (22, 6);
insert into product_tag (product_id, tag_id) values (22, 23);
insert into product_tag (product_id, tag_id) values (22, 19);
insert into product_tag (product_id, tag_id) values (23, 5);
insert into product_tag (product_id, tag_id) values (23, 6);
insert into product_tag (product_id, tag_id) values (23, 23);
insert into product_tag (product_id, tag_id) values (23, 19);

insert into product_tag (product_id, tag_id) values (24, 5);
insert into product_tag (product_id, tag_id) values (24, 25);
insert into product_tag (product_id, tag_id) values (24, 23);
insert into product_tag (product_id, tag_id) values (24, 19);
insert into product_tag (product_id, tag_id) values (25, 5);
insert into product_tag (product_id, tag_id) values (25, 25);
insert into product_tag (product_id, tag_id) values (25, 23);
insert into product_tag (product_id, tag_id) values (25, 14);
insert into product_tag (product_id, tag_id) values (26, 5);
insert into product_tag (product_id, tag_id) values (26, 25);
insert into product_tag (product_id, tag_id) values (26, 23);
insert into product_tag (product_id, tag_id) values (26, 18);
-- cart

-- orders
-- cart_items
-- order_items 

