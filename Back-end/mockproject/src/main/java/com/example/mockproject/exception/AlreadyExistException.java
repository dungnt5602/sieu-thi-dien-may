package com.example.mockproject.exception;

import com.example.mockproject.payload.ApiResponse;
import org.springframework.http.HttpStatus;

public class AlreadyExistException extends RuntimeException{

    private ApiResponse apiResponse;
    private String fieldName;
    private String fieldValue;
    public AlreadyExistException(String fieldName, String fieldValue) {
        super();
        this.fieldValue = fieldValue;
        this.fieldName = fieldName;
    }

    public  ApiResponse getApiResponse() {
        setApiResponse();
        return apiResponse;
    }

    private void setApiResponse() {
        String message = String.format("%s already exist with value: %s", fieldName, fieldValue);
        apiResponse = new ApiResponse(HttpStatus.CONFLICT.value(), message, HttpStatus.CONFLICT);
    }
}
