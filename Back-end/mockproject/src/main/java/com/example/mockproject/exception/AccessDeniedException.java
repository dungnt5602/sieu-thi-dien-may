package com.example.mockproject.exception;

import com.example.mockproject.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class AccessDeniedException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    private ApiResponse apiResponse;
    private String action;
    private String fieldName;

    public AccessDeniedException(String action, String fieldName) {
        super();
        this.action = action;
        this.fieldName = fieldName;
    }

    public ApiResponse getApiResponse() {
        setApiResponse();
        return apiResponse;
    }

    private void setApiResponse() {
        String message = String.format("You don't have permission to %s %s", action, fieldName);
        apiResponse = new ApiResponse(HttpStatus.FORBIDDEN.value(), message, HttpStatus.FORBIDDEN);
    }


}
