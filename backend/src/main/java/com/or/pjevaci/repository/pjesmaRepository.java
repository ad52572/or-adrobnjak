package com.or.pjevaci.repository;

import com.or.pjevaci.entity.Pjesma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface pjesmaRepository extends JpaRepository<Pjesma, Integer> {
}