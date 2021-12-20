package com.or.pjevaci.service;

import com.or.pjevaci.DTO.pjesmeDTO;
import com.or.pjevaci.entity.Pjesma;
import com.or.pjevaci.repository.pjesmaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class pjesmeService {
    pjesmaRepository pjesmaRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public pjesmeService(pjesmaRepository pjesmaRepository) {
        this.pjesmaRepository = pjesmaRepository;
    }

    public List<Pjesma> svePjesme() {
        ArrayList<Pjesma> retList = new ArrayList<>();
        for(Pjesma pjesma: pjesmaRepository.findAll()){
            retList.add(modelMapper.map(pjesma, Pjesma.class));
        };
        return retList;
    }

}
