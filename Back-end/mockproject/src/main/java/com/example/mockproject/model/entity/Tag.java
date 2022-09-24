package com.example.mockproject.model.entity;

import com.example.mockproject.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity @EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor @AllArgsConstructor
@Data @Table(name = "tag")
public class Tag extends BaseModel {
    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "status", insertable = false)
    private String status;

    @Column(name = "created_on", insertable = false)
    private String created_on;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "product_tag",
            joinColumns = @JoinColumn(name = "tag_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;
}
