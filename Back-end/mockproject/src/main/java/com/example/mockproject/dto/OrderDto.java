package com.example.mockproject.dto;

import com.example.mockproject.model.entity.Order;
import com.example.mockproject.model.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class OrderDto {
    private Long orderId;
    private Order orderInfo;
    private List<OrderItem> orderItemList;
}
