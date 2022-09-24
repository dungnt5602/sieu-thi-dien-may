package com.example.mockproject.service.impl;

import com.example.mockproject.dto.RecommendDto;
import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.Recommend;
import com.example.mockproject.model.entity.Tag;
import com.example.mockproject.repository.ProductRepository;
import com.example.mockproject.repository.RecommendRepository;
import com.example.mockproject.repository.TagRepository;
import com.example.mockproject.service.RecommendService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendServiceImpl extends BaseServiceImpl<Recommend, Long> implements RecommendService {
    private RecommendRepository recommendRepository;
    private TagRepository tagRepository;
    private ProductRepository productRepository;
    public RecommendServiceImpl(RecommendRepository recommendRepository, TagRepository tagRepository,
                                ProductRepository productRepository) {
        super(recommendRepository);
        this.recommendRepository = recommendRepository;
        this.tagRepository = tagRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getRecommendForSessionUser(List<Product> products) {
        List<RecommendDto> newRecommendDtos = new ArrayList<>();
        List<Product> recommendProducts = new ArrayList<>();
        for (Product product: products) {
            newRecommendDtos = calcScore(product, newRecommendDtos);
        }
        for (RecommendDto recommendDto: newRecommendDtos) {
            Tag tag = tagRepository.findById(recommendDto.getTag().getId()).orElseThrow(() ->
                    new ResourceNotFoundException("User", recommendDto.getTag().getId().toString()));
            recommendProducts.addAll(tag.getProducts());
        }
        recommendProducts = filterProductsList(recommendProducts);
        return recommendProducts;
    }

    @Override
    public List<Product> getRecommendForProductDetail(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", productId.toString()));
        List<RecommendDto> recommendDtos = new ArrayList<>();

        List<RecommendDto> newRecommendDto = calcScore(product, recommendDtos);
        List<Product> products = new ArrayList<>();
        for (RecommendDto recommendDto: newRecommendDto) {
            products.addAll(recommendDto.getTag().getProducts());
        }
        List<Product> recommendProducts = filterProductsList(products);
        recommendProducts.remove(product);
        if (recommendProducts.size() < 5) {
            recommendProducts.addAll(product.getCategory().getProducts());
        }
        return recommendProducts;
    }

    // remove duplicate product in list product
    public List<Product> filterProductsList(List<Product> products) {
        Set<Product> productSet = new HashSet<>();
        productSet.addAll(products);
        List<Product> recommendProducts = new ArrayList<>();
        recommendProducts.addAll(productSet);
        return recommendProducts;
    }


    @Override
    public List<Product> getRecommendForLoginUser(Long userId) {
        List<Recommend> recommendList = recommendRepository.findAllByUserId(userId);
        recommendList.sort(Comparator.comparing(Recommend::getScore));
        List<Tag> tagsRecommend = new ArrayList<>();
        List<Product> products = new ArrayList<>();
        for (int i = recommendList.size()-1; i >= 0; i--) {
            if (recommendList.get(i).getScore() == recommendList.get(recommendList.size()-1).getScore()) {
                Tag tag = tagRepository.findById(recommendList.get(i).getTagId()).orElseThrow(() -> new ResourceNotFoundException("Tag", recommendList.get(0).getTagId().toString()));
                tagsRecommend.add(tag);
                products.addAll(tag.getProducts());
            }
        }
        int i = recommendList.size() - 1;
        while(products.size() < 5 && i >= 0) {
            if (recommendList.get(i).getScore() != recommendList.get(recommendList.size()-1).getScore()) {
                Tag tag = tagRepository.findById(recommendList.get(i).getTagId()).orElseThrow(() -> new ResourceNotFoundException("Tag", recommendList.get(0).getTagId().toString()));
                tagsRecommend.add(tag);
                products.addAll(tag.getProducts());
            }
            products = filterProductsList(products);
            i = i- 1;
            if (products.size() > 10) break;
        }
        return products;
    }

    public List<Product> saveRecommendDataForLoginUser(Long userId, Long productId) {
        // get all recommend data for this user
        List<Recommend> recommendList = recommendRepository.findAllByUserId(userId);

        // get product information by id
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product", productId.toString()));

        // convert recommend data to recommend dto
        List<RecommendDto> recommendDtos = new ArrayList<>();
        for (Recommend recommend: recommendList) {
            RecommendDto recommendDto = new RecommendDto();
            Tag tag = tagRepository.findById(recommend.getTagId()).orElse(null);
            if (tag == null || tag.getStatus().equals("inactive")) {
                continue;
            }
            recommendDto.setTag(tag);
            recommendDto.setScore(recommend.getScore());
            recommendDtos.add(recommendDto);
            recommendRepository.delete(recommend);
        }

        List<RecommendDto> newRecommendDto = calcScore(product, recommendDtos);
        for (RecommendDto recommendDto: newRecommendDto) {
            recommendRepository.save(new Recommend(userId,recommendDto));
        }
        return null;
    }

    @Override
    public List<Product> getRecommendProducts(List<RecommendDto> recommendDtos) {


        return null;
    }

    public List<RecommendDto> calcScore(Product product, List<RecommendDto> recommendDtos) {
        List<RecommendDto> newRecommendDtos = new ArrayList<>();
        List<Tag> tags = new ArrayList<>();
        for (RecommendDto recommendDto: recommendDtos) {
            tags.add(recommendDto.getTag());
            newRecommendDtos.add(recommendDto);
        }
        for (Tag tag: product.getTags()) {
            if (tags.size() > 0) {
                int index = tags.indexOf(tag);
                if (index < 0) {
                    RecommendDto recommendDto = new RecommendDto();
                    recommendDto.setTag(tag);
                    recommendDto.setScore(1);
                    newRecommendDtos.add(recommendDto);
                } else {
                    RecommendDto recommendDto = new RecommendDto();
                    int score = recommendDtos.get(index).getScore() + 1;
                    recommendDto.setScore(score);
                    recommendDto.setTag(tag);
                    newRecommendDtos.set(index, recommendDto);
                }
            } else {
                RecommendDto recommendDto = new RecommendDto();
                recommendDto.setTag(tag);
                recommendDto.setScore(1);
                newRecommendDtos.add(recommendDto);
            }
        }
        return newRecommendDtos;
    }


}
