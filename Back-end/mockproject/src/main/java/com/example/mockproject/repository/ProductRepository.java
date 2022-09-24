package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Category;
import com.example.mockproject.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository
        extends BaseRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    public Page<Product> findByCategory(Category category, Pageable pageable);
    public Page<Product> findByNameContaining(String name, Pageable pageable);
    public Page<Product> findTop10ByOrderByDiscountDesc(Pageable pageable);
    @Query(value = "SELECT DISTINCT title FROM Product")
    public List<String> findDistinctBrands();
    @Query(value = "SELECT DISTINCT p.title FROM Product p WHERE p.category = ?1")
    public List<String> findDistinctBrandsByCategory(Category category);
    @Query(value = "SELECT * FROM Product WHERE quantity < 50",
            nativeQuery = true)
    Page<Product> findAllProductLowQuantity(Pageable pageable);

    @Query(value = "SELECT * FROM Product WHERE name LIKE %?1% || code LIKE %?1%",
            nativeQuery = true)
    Page<Product> searchProductAdmin(String name, Pageable pageable);
}
