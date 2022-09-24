package com.example.mockproject.controller;

import com.example.mockproject.model.entity.Cart;
import com.example.mockproject.model.entity.CartItem;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.service.CartService;
import com.example.mockproject.service.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("carts")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
    }

    @GetMapping
    public Page<Cart> getAllCarts(Pageable pageable) {
        return cartService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public List<Cart> getCartsByUserId(@PathVariable(value = "id") Long id) {
        return cartService.getCartsByUserId(id);
    }

    @GetMapping("/users/{id}")
    public List<CartItem> getCartItemsByUserId(@PathVariable(value = "id") Long id) {
        return cartService.getCartItemsByUserId2(id);
    }
    @PutMapping("/users/{userId}/products/{productId}")
    public List<CartItem> updateProductToCartByUserId(@PathVariable(value = "userId") Long userId,
                                                   @PathVariable(value = "productId") Long productId,
                                                     @RequestBody CartItem cartItem) {
        return cartService.updateCartItemByUserId(userId, productId, cartItem);
    }

    @DeleteMapping("/users/{userId}")
    public List<CartItem> removeProductFromCartByUserId(@PathVariable(value = "userId") Long userId,
                                                        @RequestBody CartItem cartItem) {
        return cartService.removeCartItemByUserId(userId, cartItem);
    }
    @PostMapping("/users/{userId}")
    public List<CartItem> addProductToCart(@PathVariable(value = "userId") Long userId,
                                                       @RequestBody CartItem cartItem) {
        return cartService.addProductToCart(userId, cartItem);
    }
}
