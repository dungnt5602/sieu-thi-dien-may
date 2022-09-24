package com.example.mockproject.service.impl;

import com.example.mockproject.dto.CategoryDto;
import com.example.mockproject.model.entity.Category;
import com.example.mockproject.repository.BaseRepository;
import com.example.mockproject.repository.CategoryRepository;
import com.example.mockproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl extends BaseServiceImpl<Category, Long>
implements CategoryService {
    private CategoryRepository categoryRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        super(categoryRepository);
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getCategoryStatistic() {
        String query = "CALL category_statistics()";
        List<CategoryDto> result = jdbcTemplate.query(query, new BeanPropertyRowMapper(CategoryDto.class));
        System.out.println(result.size());
        return result;
    }
}
