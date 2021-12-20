package com.or.pjevaci.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "pjesma")
public class Pjesma {

    @Id
    private Integer pjesma_id;
    private String naslov;
    private String godina_izdanja;
    private Integer trajanje;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "pjevac_id")
    private Pjevac pjevac;

    public Pjevac getPjevac() {
        return pjevac;
    }

    public void setPjevac(Pjevac pjevac) {
        this.pjevac = pjevac;
    }

    public Integer getPjesma_id() {
        return pjesma_id;
    }

    public void setPjesma_id(Integer pjesma_id) {
        this.pjesma_id = pjesma_id;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getGodina_izdanja() {
        return godina_izdanja;
    }

    public void setGodina_izdanja(String godina_izdanja) {
        this.godina_izdanja = godina_izdanja;
    }

    public Integer getTrajanje() {
        return trajanje;
    }

    public void setTrajanje(Integer trajanje) {
        this.trajanje = trajanje;
    }

}
