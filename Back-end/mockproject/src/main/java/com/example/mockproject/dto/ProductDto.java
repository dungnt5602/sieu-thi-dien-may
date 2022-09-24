package com.example.mockproject.dto;

import com.example.mockproject.model.entity.Category;
import com.example.mockproject.model.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data @AllArgsConstructor @NoArgsConstructor
public class ProductDto {
    private Category categorySet;
    private String name;
    private String title;
    private String categoryCode;
    private String description;
    private String imgLink;
    private BigDecimal price;
    private int discount;
    private int quantity;
    private String createdDate;
    private String modifiedDate;
    private BigDecimal newPrice;

    public ProductDto(Product product) {
        this.categorySet = product.getCategory();
        this.name = product.getName();
        this.title = product.getTitle();
        this.categoryCode = product.getCategoryCode();
        this.description = product.getDescription();
        this.imgLink = product.getImgLink();
        this.price = product.getPrice();
        this.discount = product.getDiscount();
        this.quantity = product.getQuantity();
        this.createdDate = product.getCreatedDate();
        this.modifiedDate = product.getModifiedDate();
        this.newPrice = product.getPrice()
                .multiply(BigDecimal.valueOf(100 - product.getDiscount()))
                .divide(BigDecimal.valueOf(100));
        System.out.println(this.newPrice);
    }
}
