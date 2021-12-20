package com.or.pjevaci.repository;

import com.or.pjevaci.entity.Pjevac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.Optional;

public interface pjevacRepository extends JpaRepository<Pjevac, Integer> {

    Optional<Pjevac> findById(Integer id);

    ArrayList<Pjevac> findAllByZanrEquals(String zanr);

    ArrayList<Pjevac> findAllBySpolEquals(String spol);

    @Query("select p from Pjevac p where p.ime = ?1 or p.prezime = ?1")
    ArrayList<Pjevac> findAllByImeOrPrezimeEquals(String ime);
}