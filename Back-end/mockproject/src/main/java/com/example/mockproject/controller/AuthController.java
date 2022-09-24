package com.example.mockproject.controller;

import com.example.mockproject.exception.AlreadyExistException;
import com.example.mockproject.exception.BadCredentialsException;
import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.jwt.JwtTokenUtil;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.payload.request.LoginRequest;
import com.example.mockproject.payload.request.RegisterRequest;
import com.example.mockproject.payload.response.LoginResponse;
import com.example.mockproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword())
            );
            User user = (User) authentication.getPrincipal();
//            System.out.println("Check " + user.getStatus());
            if (!user.getStatus().equals("active")){
                throw new ResourceNotFoundException("User", user.getUsername());
            }
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            LoginResponse response = new LoginResponse(user.getId(), user.getUsername(), accessToken, user.getRole());
            return ResponseEntity.ok().body(response);
        }catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("User", "");
        } catch (Exception ex) {
            throw new BadCredentialsException("the username or password is incorrect");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()) != null) {
            throw new AlreadyExistException("Username", registerRequest.getUsername());
        } else if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            throw new AlreadyExistException("Email", registerRequest.getEmail());
        } else {
            // create user object
            User user = new User();

            user.setName(registerRequest.getName());
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setMobile(registerRequest.getMobile());
            user.setGender("");
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setRole("USER");

            userRepository.save(user);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            registerRequest.getUsername(), registerRequest.getPassword())
            );
            user = (User) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            LoginResponse response = new LoginResponse(user.getId(), user.getUsername(), accessToken, user.getRole());

            return ResponseEntity.ok().body(response);
        }
    }
}
