package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Cart;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends BaseRepository<Cart, Long> {
}
