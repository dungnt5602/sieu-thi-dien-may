package com.example.mockproject.service.impl;

import com.example.mockproject.model.entity.Tag;
import com.example.mockproject.repository.TagRepository;
import com.example.mockproject.service.TagService;
import org.springframework.stereotype.Service;

@Service
public class TagServiceImpl extends BaseServiceImpl<Tag, Long>
implements TagService {
    private TagRepository tagRepository;
    public TagServiceImpl(TagRepository tagRepository) {
        super(tagRepository);
        this.tagRepository = tagRepository;
    }
}
