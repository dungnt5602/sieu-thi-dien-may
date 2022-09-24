package com.example.mockproject.repository;

import com.example.mockproject.dto.StatisticDto;
import com.example.mockproject.model.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends BaseRepository<Order, Long>{

    @Query(value = "select * from orders where status = 'Đã giao' && created_on like %?1% ", nativeQuery = true)
    Page<Order> findAllPaid(Pageable pageable, String date);

    @Query(value = "select * from orders where status != 'Đã giao' && created_on like %?1%", nativeQuery = true)
    Page<Order> findAllUnpaid(Pageable pageable, String date);

    @Query(value = "select * from orders where created_on like %?1%", nativeQuery = true)
    Page<Order> findAllOrdersByDate(Pageable pageable, String date);


}
