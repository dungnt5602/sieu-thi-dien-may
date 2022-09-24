package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Recommend;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendRepository extends BaseRepository<Recommend, Long>{
    List<Recommend> findAllByUserId(Long userId);
}
