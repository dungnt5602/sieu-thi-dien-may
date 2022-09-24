package com.example.mockproject.dto;

import com.example.mockproject.model.entity.Recommend;
import com.example.mockproject.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class RecommendDto {
    private Tag tag;
    private int score;
}
