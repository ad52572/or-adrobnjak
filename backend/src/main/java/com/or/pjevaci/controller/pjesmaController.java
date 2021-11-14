package com.or.pjevaci.controller;
import com.or.pjevaci.DTO.pjesmeDTO;
import com.or.pjevaci.DTO.pjevaciDTO;
import com.or.pjevaci.entity.Pjesma;
import com.or.pjevaci.service.pjesmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/datatable")
public class pjesmaController {
     private pjesmeService pjesmeService;

     @Autowired
    public pjesmaController(pjesmeService pjesmeService) {this.pjesmeService = pjesmeService;}

    @GetMapping("/get-all-pjesma")
    public ResponseEntity<List<Pjesma>> svePjesme(){
        return ResponseEntity.ok().body(pjesmeService.svePjesme());
    }
}
