package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity @EntityListeners(AuditingEntityListener.class)
@Table(name = "category")
@Data @NoArgsConstructor @AllArgsConstructor
public class Category extends BaseModel {
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "productcategory",
//            joinColumns = @JoinColumn(name = "category_id"),
//            inverseJoinColumns = @JoinColumn(name = "product_id")
//    )
//    private Set<Product> productSet = new HashSet<>();

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "content")
    @NotBlank
    private String content;

    @CreatedDate
    @Column(name = "created_on")
    private Date createdDate;

    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products;
}
