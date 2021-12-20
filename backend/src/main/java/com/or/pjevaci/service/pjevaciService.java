package com.or.pjevaci.service;

import com.or.pjevaci.entity.Pjesma;
import com.or.pjevaci.entity.Pjevac;
import com.or.pjevaci.repository.pjesmaRepository;
import com.or.pjevaci.repository.pjevacRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class pjevaciService {
    pjevacRepository pjevacRepository;
    pjesmaRepository pjesmaRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public pjevaciService(pjevacRepository pjevacRepository, pjesmaRepository pjesmaRepository) {
        this.pjevacRepository = pjevacRepository;
        this.pjesmaRepository = pjesmaRepository;
    }

    public List<Pjevac> sviPjevaci() {
        ArrayList<Pjevac> retList = new ArrayList<>();
        for (Pjevac pjevac : pjevacRepository.findAll()) {
            retList.add(modelMapper.map(pjevac, Pjevac.class));
        }
        ;
        return retList;
    }

    public Optional<Pjevac> findById(Integer id) {
        return pjevacRepository.findById(id);
    }

    public ArrayList<Pjevac> findByZanr(String zanr) {
        return pjevacRepository.findAllByZanrEquals(zanr.substring(0, 1).toUpperCase() + zanr.substring(1));
    }

    public ArrayList<Pjevac> findBySpol(String spol) {
        return pjevacRepository.findAllBySpolEquals(spol.toUpperCase());
    }

    public ArrayList<Pjevac> findByIme(String ime) {
        return pjevacRepository.findAllByImeOrPrezimeEquals(ime.substring(0, 1).toUpperCase() + ime.substring(1));
    }

    public Pjevac createPjevac(Pjevac pjevac) {
        Pjevac response = modelMapper.map(pjevacRepository.save(modelMapper.map(pjevac, Pjevac.class)), Pjevac.class);
        for (Pjesma pjesma : pjevac.getPjesma()) {
            pjesma.setPjevac(pjevac);
            pjesmaRepository.save(modelMapper.map(pjesma, Pjesma.class));

        }
        return response;
    }

    public Pjevac updatePjevac(Pjevac pjevac, Integer id) {
        for (Pjesma pjesma : pjevac.getPjesma()) {
            pjesma.setPjevac(pjevac);
            pjesmaRepository.save(modelMapper.map(pjesma, Pjesma.class));
        }
        return modelMapper.map(pjevacRepository.save(modelMapper.map(pjevac, Pjevac.class)), Pjevac.class);

    }

    public void deletePjevac(Integer id) {
        pjevacRepository.deleteById(id);
    }
}
