package com.example.mockproject.service.impl;

import com.example.mockproject.dto.UserDto;
import com.example.mockproject.exception.AlreadyExistException;
import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.entity.Order;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.repository.BaseRepository;
import com.example.mockproject.repository.UserRepository;
import com.example.mockproject.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl extends BaseServiceImpl<User, Long>
        implements UserService {
    private UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Override
    public UserDto findUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", id.toString()));
        List<Order> orders = user.getOrders();
        Double totalCost = Double.valueOf(0);
        for (final Order order: orders) {
            totalCost += order.getTotal();
        }

//        UserDto userDto = new UserDto(user.getName(), user.getEmail(),
//                user.getMobile(), user.getGender(), user.getAddress(),
//                user.getUsername(), orders.size(), totalCost.toString());
        UserDto userDto = new UserDto(user);
        return userDto;
    }

    @Override
    public Page<User> findAllUsers(Pageable pageable) {
        return userRepository.findAllUser(pageable);
    }
    @Override
    public Page<UserDto> findAllUsers2(Pageable pageable) {

        Page<User> users = userRepository.findAllUser(pageable);
        Page<UserDto> userDtos = users.map(obj -> new UserDto(obj));
        return userDtos;
    }

    @Override
    public User createUser(User user) {
        try {
            if (userRepository.findByUsername(user.getUsername()) != null) {
                throw new AlreadyExistException("Username", user.getUsername());
            } else if (userRepository.findByEmail(user.getEmail()) != null) {
                throw new AlreadyExistException("Email", user.getEmail());
            } else {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String password = passwordEncoder.encode(user.getPassword());
                user.setPassword(password);
                user.setRole("USER");

                Date currentDate = new Date();
                String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);

                user.setLastLogin(null);
                user.setCreatedDate(dateToStr);
                return userRepository.save(user);
            }
        } catch (Exception exception) {
            throw exception;
        }
    }

    @Override
    public User createAccount(User user) {
            if (userRepository.findByEmail(user.getEmail()) != null) {
                throw new AlreadyExistException("Email", user.getEmail());
            } else if (userRepository.findByUsername(user.getUsername()) != null) {
                throw new AlreadyExistException("Username", user.getUsername());
            } else {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String password = passwordEncoder.encode(user.getPassword());
                user.setPassword(password);

                Date currentDate = new Date();
                String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);

                user.setLastLogin(dateToStr);
                user.setCreatedDate(dateToStr);
                return userRepository.save(user);
            }
    }

    @Override
    public UserDto updateUserById(Long userId, User userRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        if (!user.getEmail().equals(userRequest.getEmail()) &&
            userRepository.findByEmail(userRequest.getEmail()) != null) {
            throw new AlreadyExistException("Email", userRequest.getEmail());
        }
        user.setName(userRequest.getName());
        user.setGender(userRequest.getGender());
        user.setEmail(userRequest.getEmail());
        user.setMobile(userRequest.getMobile());
        user.setAddress(userRequest.getAddress());
        UserDto userDto = new UserDto(user);
        return userDto;
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        user.setStatus("inactive");
    }

    @Override
    public Page<UserDto> searchUser(String name, Pageable pageable) {
        Page<User> users = userRepository.searchUser(name, pageable);
        Page<UserDto> userDtos = users.map(obj -> new UserDto(obj));
        return userDtos;
    }
}

//        System.out.println(user.getUsername() + " " + user.getPassword());
//        if(userRepository.findByUsername(user.getUsername()) == null &&
//            userRepository.findByEmail(user.getEmail()) == null) {
//            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//            String password = passwordEncoder.encode(request.getPassword());
//            User user = User.build(0, request.getUsername(), password);
//            return userRepository.save(user);
//        } else {
//            throw new AlreadyExistException("User already exist");
//        }