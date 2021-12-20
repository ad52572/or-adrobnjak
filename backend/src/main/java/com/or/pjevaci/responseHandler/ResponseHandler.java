package com.or.pjevaci.responseHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("response", responseObj);
        map.put("status", status.value());
        map.put("message", message);

        return new ResponseEntity<Object>(map, status);
    }

    @Override
    public String toString() {
        return super.toString();
    }
}