package com.example.mockproject.controller;

import com.example.mockproject.model.entity.Product;
import com.example.mockproject.service.RecommendService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("recommends")
public class RecommendController {
    private final RecommendService recommendService;

    public RecommendController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @GetMapping("/users/{userId}")
    public List<Product> getRecommendForLoginUser(@PathVariable(value = "userId") Long userId) {
        return recommendService.getRecommendForLoginUser(userId);
    }

    @GetMapping("/products/{productId}")
    public List<Product> getRecommendForProductDetail(@PathVariable(value = "productId") Long productId) {
        return recommendService.getRecommendForProductDetail(productId);
    }

    @PostMapping
    public List<Product> getRecommendForSessionUser(@RequestBody List<Product> products) {
        return recommendService.getRecommendForSessionUser(products);
    }

    @PostMapping("/users/{userId}/products/{productId}")
    public List<Product> saveRecommendDataForLoginUser(@PathVariable(value = "userId") Long userId,
                                                    @PathVariable(value = "productId") Long productId) {
        return recommendService.saveRecommendDataForLoginUser(userId, productId);
    }
}
