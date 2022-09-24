package com.example.mockproject.exception;

import com.example.mockproject.payload.ApiResponse;
import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    private transient ApiResponse apiResponse;

    private String resourceName;
    private String fieldValue;

    public ResourceNotFoundException(String resourceName, String fieldValue) {
        super();
        this.resourceName = resourceName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public ApiResponse getApiResponse() {
        setApiResponse();
        return apiResponse;
    }

    private void setApiResponse() {
        String message = String.format("%s not found with value: %s", resourceName, fieldValue);

        apiResponse = new ApiResponse(HttpStatus.BAD_REQUEST.value(), message, HttpStatus.BAD_REQUEST);
    }
}
