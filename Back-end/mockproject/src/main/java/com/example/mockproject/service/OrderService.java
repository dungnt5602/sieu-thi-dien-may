package com.example.mockproject.service;

import com.example.mockproject.dto.OrderDto;
import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.model.entity.Order;
import com.example.mockproject.model.entity.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface OrderService extends BaseService<Order, Long> {
    Page<Order> findAllOrdersById(Pageable pageable, Long id);

    Page<Order> findAllPaid(Pageable pageable, String date);

    Page<Order> findAllUnpaid(Pageable pageable, String date);

    List<OrderItem> createOrderByUserId(Long userId, Order orderRequest);

    Order cancleOrderByUserId(Long userId, Order orderRequest);

    List<OrderItem> getOrderItemsByOrderId(Long orderId);

    Order updateOrderStatus(Long orderId, Order orderRequest);

    List<OrderDto> getOrdersByUserId(Long userId);

    List<Order> getOrdersByUserIdAdmin(Long userId);

    Page<Order> findAllOrdersByDate(Pageable pageable, String date);
}
