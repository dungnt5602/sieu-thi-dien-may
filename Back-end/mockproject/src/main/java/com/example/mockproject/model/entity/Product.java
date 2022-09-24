package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.util.*;

@Entity @EntityListeners(AuditingEntityListener.class)
@Table(name = "product")
@Data @NoArgsConstructor @AllArgsConstructor
public class Product extends BaseModel {
//    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "product_tag",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name="name")
    @NotBlank
    private String name;

    @Column(name="title")
    @NotBlank
    private String title;

    @Column(name="category_code", updatable = false, insertable = false)
    private String categoryCode;

    @Column(name="description")
    @NotBlank
    private String description;

    @Column(name="characteristic")
    private String characteristic;

    @Column(name="img_link")
    private String imgLink;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="new_price", updatable = false, insertable = false)
    private BigDecimal newPrice;

    @Column(name="discount")
    private int discount;

    @Column(name = "status", insertable = false)
    private String status;

    @Column(name="quantity")
    private int quantity;

    @Column(name = "code")
    private String code;

    @CreatedDate
    @Column(name="created_on", updatable = false)
    private String createdDate;

    @LastModifiedDate
    @Column(name="modified_date")
    private String modifiedDate;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "cartsitem",
//            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "cart_id", referencedColumnName = "id"))
//    private List<Cart> carts;
}

