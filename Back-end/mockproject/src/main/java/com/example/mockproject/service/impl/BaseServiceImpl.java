package com.example.mockproject.service.impl;

import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.BaseModel;
import com.example.mockproject.repository.BaseRepository;
import com.example.mockproject.service.BaseService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.Serializable;

@Service
@Transactional
@Data @NoArgsConstructor
@AllArgsConstructor
public abstract class BaseServiceImpl <T extends BaseModel, ID extends Serializable>
        implements BaseService<T, ID> {

    private BaseRepository<T, ID> baseRepository;

    @Override
    public T save(T entity) {
        var t = baseRepository.save(entity);
        return t;
    }
    @Override
    public Page<T> findAll(Pageable pageable) {
        return baseRepository.findAll(pageable);
    }

    @Override
    public T findById(ID entityId) {
        return baseRepository.findById(entityId).orElseThrow(() -> new ResourceNotFoundException("Id", entityId.toString()));
    }

    @Override
    public T updateById(T entityDetail, ID entityId) {
        findById(entityId);
        entityDetail.setId((Long) entityId);
        return baseRepository.save(entityDetail);
    }

    @Override
    public void deleteById(ID entityId) {
        baseRepository.deleteById(entityId);
    }
}
