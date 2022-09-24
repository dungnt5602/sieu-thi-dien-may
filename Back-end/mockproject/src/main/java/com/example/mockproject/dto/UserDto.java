package com.example.mockproject.dto;

import com.example.mockproject.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    @Email
    private String email;
    private String mobile;
    private String gender;
    private String address;
    private String username;
    private int ordersQuantity;
    private String totalCost;

    private String role;

    public UserDto(User obj) {
        this.id = obj.getId();
        this.name = obj.getName();
        this.email = obj.getEmail();
        this.mobile = obj.getMobile();
        this.gender = obj.getGender();
        this.address = obj.getAddress();
        this.username = obj.getUsername();
        this.role = obj.getRole();
        this.ordersQuantity = obj.getOrdersQuantity();
        this.totalCost = obj.getTotalCost();
    }
}
