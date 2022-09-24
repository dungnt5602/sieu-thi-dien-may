package com.example.mockproject.service.impl;

import com.example.mockproject.dto.OrderDto;
import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.entity.*;
import com.example.mockproject.repository.*;
import com.example.mockproject.service.OrderService;
import com.example.mockproject.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl extends BaseServiceImpl<Order, Long>
implements OrderService {
    private OrderRepository orderRepository;
    private OrderItemRepository orderItemRepository;
    private CartRepository cartRepository;
    private UserRepository userRepository;

    private CartItemRepository cartItemRepository;
    private RecommendService recommendService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                            CartRepository cartRepository, UserRepository userRepository,
                            CartItemRepository cartItemRepository, RecommendService recommendService) {
        super(orderRepository);
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.recommendService = recommendService;
    }

    @Override
    public Page<Order> findAllOrdersById(Pageable pageable, Long id) {
        return null;
    }

    @Override
    public Page<Order> findAllPaid(Pageable pageable, String date) {
        return orderRepository.findAllPaid(pageable, date);
    }

    @Override
    public Page<Order> findAllUnpaid(Pageable pageable, String date) {
        return orderRepository.findAllUnpaid(pageable, date);
    }

    @Override
    public List<OrderItem> createOrderByUserId(Long userId, Order orderRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        Cart cart = user.getCarts().get(0);
        List<CartItem> cartItems = cart.getCartItems();
        for (CartItem cartItem: cartItems) {
            if (cartItem.getProduct().getStatus().equals("active")) {
                if (cartItem.getProduct().getQuantity() <= cartItem.getQuantity()) {
                    throw new ResourceNotFoundException("Product", cartItem.getProduct().getId().toString());
                } else {
                    cartItem.getProduct().setQuantity(cartItem.getProduct().getQuantity() - cartItem.getQuantity());
                }
            }
        }
        // Create empty cart with input information
        Order order = new Order();

        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);

        order.setUser(user);
        order.setStatus("Chờ duyệt");
        order.setShipping(0.1);
        order.setTotal(cart.getTotal());
        order.setNote(orderRequest.getNote());
        order.setBuyerName(orderRequest.getBuyerName());
        order.setMobile(orderRequest.getMobile());
        order.setEmail(orderRequest.getEmail());
        order.setAddress(orderRequest.getAddress());
        order.setCreateDate(dateToStr);
        order.setModifiedDate(dateToStr);

        // Convert cart items to order items
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem: cartItems) {
            if (cartItem.getProduct().getStatus().equals("active")) {
                orderItems.add(new OrderItem(cartItem, order));
                recommendService.saveRecommendDataForLoginUser(userId, cartItem.getProduct().getId());
            }
        }

        order.setOrderItems(orderItems);
        orderRepository.save(order);

        // delete cart order
        cart.getCartItems().clear();
        user.getCarts().clear();

        return order.getOrderItems();
    }

    @Override
    public Order cancleOrderByUserId(Long userId, Order orderRequest) {
        Order order = orderRepository.findById(orderRequest.getId()).orElseThrow(() -> new ResourceNotFoundException("Order", orderRequest.getId().toString()));
        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);
        order.setStatus("Hủy");
        order.setModifiedDate(dateToStr);
        return orderRepository.save(order);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order", orderId.toString()));
        return order.getOrderItems();
    }

    @Override
    public Order updateOrderStatus(Long orderId, Order orderRequest) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order", orderId.toString()));
        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);
        order.setStatus(orderRequest.getStatus());
        order.setModifiedDate(dateToStr);
        return orderRepository.save(order);
    }
    @Override
    public List<OrderDto> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        List<Order> orders = user.getOrders();
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Order order: orders) {
            OrderDto orderDto = new OrderDto();
            orderDto.setOrderId(order.getId());
            orderDto.setOrderInfo(order);
            orderDto.setOrderItemList(order.getOrderItems());
            orderDtos.add(orderDto);
        }
        return orderDtos;
    }

    @Override
    public List<Order> getOrdersByUserIdAdmin(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        return user.getOrders();
    }


    @Override
    public Page<Order> findAllOrdersByDate(Pageable pageable, String date){
        return orderRepository.findAllOrdersByDate(pageable, date);
    }
}
