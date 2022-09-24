package com.example.mockproject.repository;

import com.example.mockproject.model.entity.Tag;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends BaseRepository<Tag, Long> {
}
