package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;

@Entity @EntityListeners(AuditingEntityListener.class)
@Table(name = "cart")
@Data @NoArgsConstructor @AllArgsConstructor
public class Cart extends BaseModel {
    @Column(name = "status")
    private String status;

    @Column(name = "total")
    private Double total;

    @Column(name = "created_on")
    @CreatedDate
    private String createdDate;

    @Column(name = "modified_date")
    private String modifiedDate;

//    @JsonIgnore
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "cartsitem",
//            joinColumns = @JoinColumn(name = "cart_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id")
//    )
//    private Set<Cart> cartSet = new HashSet<>();

//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "cartsitem",
//            joinColumns = @JoinColumn(name = "cart_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
//    private List<Product> products;

    @JsonIgnore
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    public User getUser() {
        return user;
    }

}
