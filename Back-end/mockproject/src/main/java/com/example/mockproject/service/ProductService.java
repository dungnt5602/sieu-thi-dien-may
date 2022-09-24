package com.example.mockproject.service;

import com.example.mockproject.model.entity.Category;
import com.example.mockproject.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface ProductService extends BaseService<Product, Long> {
    Product createProduct(Product product);
    Page<Product> findByCategory(Category category, Pageable pageable);
    Page<Product> findByName(String name, Pageable pageable);
    Page<Product> findTop10ByDiscount(Pageable pageable);
    Page<Product> findWithFilter(Specification<Product> spec, Pageable pageable);
    List<String> findDistinctBrands();
    List<String> findDistinctBrandsByCategory(Category category);
    Page<Product> findAllProductLowQuantity(Pageable pageable);
    Page<Product> searchProductAdmin(String name, Pageable pageable);
    Product delete(Long id, Product product);
}
