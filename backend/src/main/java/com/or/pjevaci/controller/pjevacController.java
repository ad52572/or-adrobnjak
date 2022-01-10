package com.or.pjevaci.controller;
import com.or.pjevaci.entity.Pjevac;
import com.or.pjevaci.responseHandler.ResponseHandler;
import com.or.pjevaci.service.pjevaciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/datatable")
public class pjevacController {
     private pjevaciService pjevaciService;

     @Autowired
    public pjevacController(pjevaciService pjevaciService) {this.pjevaciService = pjevaciService;}

    @GetMapping("/get-all-pjevaci")
    public ResponseEntity<List<Pjevac>> sviPjevaci(){
        return ResponseEntity.ok().body(pjevaciService.sviPjevaci());
    }

}
