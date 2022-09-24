package com.example.mockproject.service;

import com.example.mockproject.dto.UserDto;
import com.example.mockproject.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService extends BaseService<User, Long> {
    public UserDto findUserById(Long id);
    public Page<User> findAllUsers(Pageable pageable);
    public Page<UserDto> findAllUsers2(Pageable pageable);
    public User createUser(User user);
    public User createAccount(User user);
    public UserDto updateUserById(Long userId, User user);
    public void deleteUser(Long userId);
    Page<UserDto> searchUser(String name, Pageable pageable);
}
