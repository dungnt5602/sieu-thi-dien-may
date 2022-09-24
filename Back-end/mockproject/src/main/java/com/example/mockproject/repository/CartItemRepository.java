package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Cart;
import com.example.mockproject.model.entity.CartItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends BaseRepository<CartItem, Long> {

}
