package com.example.mockproject.controller;

import com.example.mockproject.dto.UserDto;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(value = "*")
@RequestMapping
public class UserController {
    private final UserService userService;

    private ModelMapper modelMapper;
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/admin/users")
    public Page<UserDto> getUsers(Pageable pageable) {
        return userService.findAllUsers2(pageable);
    }

    @GetMapping("/admin/users/search={name}")
    public Page<UserDto> searchUser(@PathVariable(value="name") String name, Pageable pageable) {
        return userService.searchUser(name, pageable);
    }

    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable(value = "id") Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody @Valid User user) {
        return userService.createUser(user);
    }

    @PostMapping("admin/users")
    public User createAccount(@RequestBody @Valid User user){
        return userService.createAccount(user);
    }

    @PutMapping("admin/users/{id}")
    public UserDto updateUserById(@PathVariable(value = "id") Long id,
                               @RequestBody User user) {
        return userService.updateUserById(id, user);
    }

    @DeleteMapping("admin/users/{id}")
    public void deleteUserById(@PathVariable(value = "id") Long id) {
        userService.deleteUser(id);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
