package com.hms.user.utility;

import java.time.LocalDateTime;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hms.user.exception.UserException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice//If any esception occurs, redirected call to this class
public class ExceptionControllerAdvise {

    @Autowired
    Environment environment;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> exceptionHandler(Exception e){//Excepton handling other than the system module
        ErrorInfo errorInfo = new ErrorInfo("Some error occuerred!", HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<ErrorInfo>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorInfo> userExceptionHandler(UserException e){//Excepton handling for user >> Deligation >> e.getMessage() >> environment >> application.properties
        ErrorInfo errorInfo = new ErrorInfo(environment.getProperty(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<ErrorInfo>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> userValidationExceptionHandler(Exception e){
        String errorMsg;
        if(e instanceof MethodArgumentNotValidException mave){
            errorMsg=mave.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(","));
        }else{
            ConstraintViolationException cve=(ConstraintViolationException) e;
            errorMsg=cve.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(","));
        }
        ErrorInfo errorInfo = new ErrorInfo(errorMsg, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<ErrorInfo>(errorInfo, HttpStatus.BAD_REQUEST);
    }
}
