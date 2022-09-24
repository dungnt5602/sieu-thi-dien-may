package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "user")
public class User extends BaseModel implements UserDetails {
    @Column(name = "name")
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cart> carts;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email not valid")
    private String email;

    @Column(name = "mobile")
    @NotBlank
    private String mobile;

    @Column(name = "address")
    private String address;

    @Column(name = "username")
    @NotBlank(message = "Username cannot be empty")
    private String username;

    @Column(name = "password")
    @NotBlank(message = "Password cannot be empty")
    private String password;

    @Column(name = "created_on", insertable = false, updatable = false)
    private String createdDate;

    @Column(name = "last_login", insertable = false)
    private String lastLogin;

    @Column(name = "role")
    private String role;
    @Column(name = "status", insertable = false)
    private String status;
    public List<Order> getOrder() {
        return this.orders == null ? null : new ArrayList<>(this.orders);
    }

    public String getTotalCost() {
        List<Order> orders = this.getOrders();
        Double totalCost = Double.valueOf(0);
        for (final Order order: orders) {
            totalCost += order.getTotal();
        }
        return totalCost.toString();
    }

    public int getOrdersQuantity() {
        List<Order> orders = this.getOrders();
        return orders.size();
    }

    public void setOrder(List<Order> orders) {
        if (orders == null) {
            this.orders = null;
        } else {
            this.orders = Collections.unmodifiableList(orders);
        }
    }

    public List<Cart> getCarts() {
//        return this.orders == null ? null : new ArrayList<>(this.carts);
        return this.carts;
    }

    public void setCarts(List<Cart> carts) {
        if (carts == null) {
            this.carts = null;
        } else {
            this.carts = Collections.unmodifiableList(carts);
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", address='" + address + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
