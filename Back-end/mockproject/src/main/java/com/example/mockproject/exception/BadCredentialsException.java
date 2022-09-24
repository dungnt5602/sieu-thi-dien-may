package com.example.mockproject.exception;

import com.example.mockproject.payload.ApiResponse;
import org.springframework.http.HttpStatus;

public class BadCredentialsException extends RuntimeException{

    private static final long serialVersionUID = 1L;
    private String message;
    private transient ApiResponse apiResponse;

    public BadCredentialsException(String message) {
        super();
    }

    public ApiResponse getApiResponse() {
        setApiResponse();
        return apiResponse;
    }

    public void setApiResponse() {
        String message = "The username or password is incorrect";
        apiResponse = new ApiResponse(HttpStatus.UNAUTHORIZED.value(), message, HttpStatus.UNAUTHORIZED);
    }
}
