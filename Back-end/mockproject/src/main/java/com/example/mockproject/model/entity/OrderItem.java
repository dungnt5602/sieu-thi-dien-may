package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
@Entity @EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor @AllArgsConstructor
@Data @Table(name = "order_items")
public class OrderItem extends BaseModel {

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "discount")
    @NotNull
    private int discount;

    @Column(name = "quantity")
    @NotNull
    private int quantity;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private  Product product;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    public OrderItem(CartItem cartItem, Order order) {
        this.price = cartItem.getPrice();
        this.discount = cartItem.getDiscount();
        this.quantity = cartItem.getQuantity();
        this.product = cartItem.getProduct();
        this.order = order;
    }
}
