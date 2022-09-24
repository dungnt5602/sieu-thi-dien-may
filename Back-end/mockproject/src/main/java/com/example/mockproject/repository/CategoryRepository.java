package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Category;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends BaseRepository<Category, Long> {
}
