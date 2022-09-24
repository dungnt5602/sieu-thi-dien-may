package com.example.mockproject.service;
import com.example.mockproject.model.BaseModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.Optional;

public interface BaseService <T extends BaseModel, ID extends Serializable>{
    public abstract T save(T entity);
    public abstract Page<T> findAll(Pageable pageable);
    public abstract T findById(ID entityId);
    public abstract T updateById(T entity, ID entityId);
    public abstract void deleteById(ID entityId);
}
