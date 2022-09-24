package com.example.mockproject.service.impl;

import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.entity.Category;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.Tag;
import com.example.mockproject.repository.CategoryRepository;
import com.example.mockproject.repository.ProductRepository;
import com.example.mockproject.repository.TagRepository;
import com.example.mockproject.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl extends BaseServiceImpl<Product, Long> implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    private TagRepository tagRepository;
    private CategoryRepository categoryRepository;
    public ProductServiceImpl(ProductRepository productRepository,
                              TagRepository tagRepository,
                              CategoryRepository categoryRepository) {
        super(productRepository);
        this.productRepository = productRepository;
        this.tagRepository = tagRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Product createProduct(Product product) {
        List<Tag> tags = new ArrayList<>();
        for (Tag requestTag: product.getTags()) {
            Tag tag = tagRepository.findById(requestTag.getId()).orElseThrow(() -> new ResourceNotFoundException("Tag", requestTag.getId().toString()));
            tags.add(tag);
        }
        product.setTags(tags);
        Category category = categoryRepository.findById(product.getCategory().getId()).orElseThrow(() -> new ResourceNotFoundException("Category", product.getCategory().getId().toString()));
        product.setCategory(category);
        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);
        product.setCreatedDate(dateToStr);
        product.setModifiedDate(dateToStr);
        return productRepository.save(product);
    }

    @Override
    public Page<Product> findByCategory(Category category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    @Override
    public Page<Product> findAllProductLowQuantity(Pageable pageable) {
        return productRepository.findAllProductLowQuantity(pageable);
    }

    @Override
    public Page<Product> findTop10ByDiscount(Pageable pageable) {
        return productRepository.findTop10ByOrderByDiscountDesc(pageable);
    }

    @Override
    public Page<Product> findWithFilter(Specification<Product> spec, Pageable pageable) {
        return productRepository.findAll(spec, pageable);
    }

    @Override
    public List<String> findDistinctBrands() {
        return productRepository.findDistinctBrands();
    }

    @Override
    public List<String> findDistinctBrandsByCategory(Category category) {
        return productRepository.findDistinctBrandsByCategory(category);
    }

    @Override
    public Page<Product> findByName(String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable);
    }

    @Override
    public Page<Product> searchProductAdmin(String name, Pageable pageable) {
        return productRepository.searchProductAdmin(name, pageable);
    }

    @Override
    public Product delete(Long id, Product productRequest){
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", id.toString()));
        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);
        product.setStatus(productRequest.getStatus());
        product.setModifiedDate(dateToStr);
        return productRepository.save(product);
    }
}