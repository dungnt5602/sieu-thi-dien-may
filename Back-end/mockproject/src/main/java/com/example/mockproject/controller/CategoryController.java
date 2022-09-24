package com.example.mockproject.controller;

import com.example.mockproject.dto.CategoryDto;
import com.example.mockproject.model.entity.Category;
import com.example.mockproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RequestMapping("admin/categories")
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category createCategory(@RequestBody @Valid Category category) {
        return categoryService.save(category);
    }

    @GetMapping
    public Page<Category> getCategories(Pageable pageable) {
        return categoryService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable(value = "id") Long id) {
        return categoryService.findById(id);
    }

    @PutMapping("/{id}")
    public Category updateCategoryById(@PathVariable(value = "id") Long id,
                                       @RequestBody Category category) {
        return categoryService.updateById(category, id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategoryById(@PathVariable(value = "id") Long id) {
        categoryService.deleteById(id);
    }

    @GetMapping("statistics")
    public List<CategoryDto> getCategoryStatistic() {
        return categoryService.getCategoryStatistic();
    }
}
