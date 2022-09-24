package com.example.mockproject.service;

import com.example.mockproject.model.entity.Cart;
import com.example.mockproject.model.entity.CartItem;
import com.example.mockproject.model.entity.Product;

import java.util.List;

public interface CartService extends BaseService<Cart, Long> {
    public List<Cart> getCartsByUserId(Long id);
    public List<Product> getCartItemsByUserId(Long id);

    public List<CartItem> getCartItemsByUserId2(Long id);
    public List<CartItem> updateCartItemByUserId(Long userId, Long productId, CartItem cartItem);
    public List<CartItem> removeCartItemByUserId(Long userId, CartItem cartItem);
    public List<CartItem> addProductToCart(Long userId, CartItem cartItem);
}
