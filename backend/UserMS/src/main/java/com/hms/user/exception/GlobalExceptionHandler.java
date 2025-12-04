package com.hms.user.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.hms.user.utility.ErrorInfo;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorInfo> handleUserException(UserException ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setErrorMessage(ex.getMessage());
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Validation Failed");
        response.put("message", "Input validation failed");
        response.put("validationErrors", errors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorInfo> handleConstraintViolationException(ConstraintViolationException ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setErrorMessage("Validation failed: " + ex.getMessage());
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ResponseEntity<ErrorInfo> handleAuthenticationException(Exception ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.UNAUTHORIZED.value());
        errorInfo.setErrorMessage("Authentication failed: Invalid credentials");
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorInfo> handleExpiredJwtException(ExpiredJwtException ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.UNAUTHORIZED.value());
        errorInfo.setErrorMessage("JWT token has expired");
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({SignatureException.class, MalformedJwtException.class})
    public ResponseEntity<ErrorInfo> handleJwtException(Exception ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.UNAUTHORIZED.value());
        errorInfo.setErrorMessage("Invalid JWT token");
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorInfo> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setErrorMessage("Invalid argument: " + ex.getMessage());
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorInfo> handleRuntimeException(RuntimeException ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorInfo.setErrorMessage("Internal server error: " + ex.getMessage());
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> handleGenericException(Exception ex, WebRequest request) {
        ErrorInfo errorInfo = new ErrorInfo();
        errorInfo.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorInfo.setErrorMessage("An unexpected error occurred: " + ex.getMessage());
        errorInfo.setTimestamp(LocalDateTime.now());
        errorInfo.setPath(request.getDescription(false));
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}