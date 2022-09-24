package com.example.mockproject.controller;

import com.example.mockproject.dto.OrderDto;
import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.model.entity.Order;
import com.example.mockproject.model.entity.OrderItem;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.service.OrderService;
import com.example.mockproject.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RequestMapping("orders")
@RestController
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping
    public Page<Order> getOrders(Pageable pageable) {
        return orderService.findAll(pageable);
    }

    @GetMapping("/paid")
    public Page<Order> getPaidOrders(Pageable pageable, @RequestParam(value = "date") String date) {
        return orderService.findAllPaid(pageable, date);
    }

    @GetMapping("/unpaid")
    public Page<Order> getUnpaidOrders(Pageable pageable, @RequestParam(value = "date") String date) {
        return orderService.findAllUnpaid(pageable, date);
    }

//    @GetMapping("user/{id}")
//    public List<Order> getAllOrdersById(@PathVariable(value = "id") Long id) {
//        User user = userService.findById(id);
//        return user.getOrders();
//    }

    @PostMapping("/users/{userId}")
    public List<OrderItem> createOrder(@PathVariable(value = "userId") Long userId,
                                       @RequestBody Order orderRequest) {
        return orderService.createOrderByUserId(userId, orderRequest);
    }

    @DeleteMapping("/users/{userId}")
    public Order cancelOrder(@PathVariable(value = "userId") Long userId,
                                       @RequestBody Order orderRequest) {
        return orderService.cancleOrderByUserId(userId, orderRequest);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable(value = "id") Long id) {
        return orderService.findById(id);
    }

    @GetMapping("date={date}")
    public Page<Order> getOrdersByDate(@PathVariable(value = "date") String date, Pageable pageable) {
        return orderService.findAllOrdersByDate(pageable, date);
    }

//    @PutMapping("/{id}")
//    public Order updateOrder(@PathVariable(value = "id") Long id,
//                             @RequestBody Order orderRequest) {
//        return orderService.updateById(orderRequest, id);
//    }

    //Get products in a order
    @GetMapping("/{id}/products")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable(value = "id") Long id) {
        return orderService.getOrderItemsByOrderId(id);
    }

    //update status of an order
    @PatchMapping("/{id}")
    public Order updateOrderStatus(@PathVariable(value = "id") Long id,
                                   @RequestBody Order orderRequest) {
        return orderService.updateOrderStatus(id, orderRequest);
    }

    @GetMapping("/users/{userId}")
    public List<OrderDto> getOrdersByUserId(@PathVariable(value = "userId") Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserIdAdmin(@PathVariable(value = "userId") Long userId) {
        return orderService.getOrdersByUserIdAdmin(userId);
    }
}
