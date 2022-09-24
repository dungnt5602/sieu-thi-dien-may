package com.example.mockproject.service;

import com.example.mockproject.dto.CategoryDto;
import com.example.mockproject.model.entity.Category;

import java.util.List;

public interface CategoryService extends BaseService<Category, Long> {
    List<CategoryDto> getCategoryStatistic();
}
