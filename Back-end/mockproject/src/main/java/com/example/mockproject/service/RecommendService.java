package com.example.mockproject.service;

import com.example.mockproject.dto.RecommendDto;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.Recommend;

import java.util.List;

public interface RecommendService extends BaseService<Recommend, Long> {

    List<RecommendDto> calcScore(Product product, List<RecommendDto> recommendDtos);
    List<Product> saveRecommendDataForLoginUser(Long userId, Long productId);
    List<Product> getRecommendProducts(List<RecommendDto> recommendDtos);
    List<Product> getRecommendForLoginUser(Long userId);
    List<Product> getRecommendForSessionUser(List<Product> products);
    List<Product> getRecommendForProductDetail(Long productId);
}
