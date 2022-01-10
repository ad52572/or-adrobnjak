package com.or.pjevaci.repository;

import com.or.pjevaci.entity.Pjesma;
import com.or.pjevaci.entity.Pjevac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;


public interface pjesmaRepository extends JpaRepository<Pjesma, Integer> {

    @Override
    boolean existsById(Integer integer);

    Pjesma findPjesmaByNaslovEquals(String naslov);
}