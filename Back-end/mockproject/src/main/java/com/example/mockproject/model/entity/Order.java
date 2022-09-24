package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "orders")
@Data @NoArgsConstructor @AllArgsConstructor

public class Order extends BaseModel {

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "ordersitem",
//            joinColumns = @JoinColumn(name = "order_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id")
//    )
//    private Set<Product> productSet = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "status")
    private String status;

    @Column(name = "shipping")
    private Double shipping;

    @Column(name = "total")
    private Double total;

    @Column(name = "note")
    private String note;

    @Column(name = "buyer_name")
    @NotBlank(message = "Name cannot be empty")
    private String buyerName;

    @Column(name = "mobile")
    @NotBlank(message = "Mobile number cannot be empty")
    private String mobile;

    @Column(name = "email")
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email not valid")
    private String email;

    @Column(name = "address")
    @NotBlank(message = "Address cannot be empty")
    private String address;

    @Column(name = "created_on")
    private String createDate;

    @Column(name = "modified_date")
    private String modifiedDate;

    @JsonIgnore
    public User getUser() {
        return user;
    }
}
