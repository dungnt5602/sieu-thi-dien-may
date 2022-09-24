package com.example.mockproject.repository;

import com.example.mockproject.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {
    User findByUsername(String username);
    User findAllByUsername(String username);
    User findByEmail(String email);
    User findAllByEmail(String email);

    @Query(value = "select * from user where role='USER' and status='active'", nativeQuery = true)
    Page<User> findAllUser(Pageable pageable);

    @Query(value = "select * from user where role='USER' and (name like %?1% || mobile like %?1%)", nativeQuery = true)
    Page<User> searchUser(String name, Pageable pageable);
}
