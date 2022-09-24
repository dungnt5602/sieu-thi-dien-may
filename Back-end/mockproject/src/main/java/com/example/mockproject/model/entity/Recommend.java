package com.example.mockproject.model.entity;

import com.example.mockproject.dto.RecommendDto;
import com.example.mockproject.model.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@Entity @NoArgsConstructor @EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor @Data
@Table(name = "recommend_data")
public class Recommend extends BaseModel {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "score")
    private int score;

    public Recommend(Long userId, RecommendDto recommendDto) {
        this.userId = userId;
        this.tagId = recommendDto.getTag().getId();
        this.score = recommendDto.getScore();
    }
}
