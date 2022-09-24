package com.example.mockproject.controller;

import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.Tag;
import com.example.mockproject.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("admin")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("/tags")
    public Tag createTag(@RequestBody @Valid Tag tag) {
        return tagService.save(tag);
    }

    @GetMapping("/tags")
    public Page<Tag> getTags(Pageable pageable) {
        return tagService.findAll(pageable);
    }
}
