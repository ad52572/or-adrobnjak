package com.or.pjevaci.DTO;

import com.or.pjevaci.entity.Pjesma;

import java.util.ArrayList;
import java.util.Date;

public class pjevaciDTO {
    private Integer pjevac_id;
    private String ime;
    private String prezime;
    private String spol;
    private Date datum_rodenja;
    private String mjesto_rodenja;
    private String mjesto_stanovanja;
    private String visina;
    private String opis;
    private String zanr;
    private ArrayList<Pjesma> pjesma;

    public Integer getPjevac_id() {
        return pjevac_id;
    }

    public void setPjevac_id(Integer pjevac_id) {
        this.pjevac_id = pjevac_id;
    }

    public ArrayList<Pjesma> getPjesma() {
        return pjesma;
    }

    public void setPjesma(ArrayList<Pjesma> pjesma) {
        this.pjesma = pjesma;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getSpol() {
        return spol;
    }

    public void setSpol(String spol) {
        this.spol = spol;
    }

    public Date getDatum_rodenja() {
        return datum_rodenja;
    }

    public void setDatum_rodenja(Date datum_rodenja) {
        this.datum_rodenja = datum_rodenja;
    }

    public String getMjesto_rodenja() {
        return mjesto_rodenja;
    }

    public void setMjesto_rodenja(String mjesto_rodenja) {
        this.mjesto_rodenja = mjesto_rodenja;
    }

    public String getMjesto_stanovanja() {
        return mjesto_stanovanja;
    }

    public void setMjesto_stanovanja(String mjesto_stanovanja) {
        this.mjesto_stanovanja = mjesto_stanovanja;
    }

    public String getVisina() {
        return visina;
    }

    public void setVisina(String visina) {
        this.visina = visina;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getZanr() {
        return zanr;
    }

    public void setZanr(String zanr) {
        this.zanr = zanr;
    }
}
