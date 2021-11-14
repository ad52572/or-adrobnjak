package com.or.pjevaci.service;

import com.or.pjevaci.entity.Pjevac;
import com.or.pjevaci.repository.pjevacRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class pjevaciService {
    pjevacRepository pjevacRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public pjevaciService(pjevacRepository pjevacRepository) {
        this.pjevacRepository = pjevacRepository;
    }

    public List<Pjevac> sviPjevaci() {
        ArrayList<Pjevac> retList = new ArrayList<>();
        for(Pjevac pjevac: pjevacRepository.findAll()){
            retList.add(modelMapper.map(pjevac, Pjevac.class));
        };
        return retList;
    }
}
