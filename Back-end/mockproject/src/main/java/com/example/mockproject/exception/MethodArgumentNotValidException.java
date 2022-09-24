//package com.example.mockproject.exception;
//
//import com.example.mockproject.payload.ApiResponse;
//import org.apache.tomcat.util.http.parser.HttpParser;
//import org.springframework.http.HttpStatus;
//
//import java.util.Map;
//
//
//public class MethodArgumentNotValidException extends RuntimeException{
//    private static final long serialVersionUID = 1L;
//    private Map<String, String> errors;
//
//    private transient ApiResponse apiResponse;
//
//    public MethodArgumentNotValidException() {
//        super();
//    }
//
//    private void setApiResponse(Map<String, String> errors) {
//        String message = errors.toString();
//        apiResponse = new ApiResponse(HttpStatus.BAD_REQUEST.value(),message, HttpStatus.BAD_REQUEST);
//    }
//}
