package com.example.mockproject.exception;

import com.example.mockproject.payload.ApiResponse;
import org.springframework.http.HttpStatus;

public class Exception extends RuntimeException{
    private String message;
    private ApiResponse apiResponse;

    public Exception(String message) {
        super();
        this.message = message;
    }

    private ApiResponse getApiResponse() {
        setApiResponse();
        return apiResponse;
    }

    private void setApiResponse() {
        apiResponse = new ApiResponse(HttpStatus.BAD_REQUEST.value(), message, HttpStatus.BAD_REQUEST);
    }
}
