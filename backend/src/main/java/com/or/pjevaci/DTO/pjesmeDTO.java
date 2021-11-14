package com.or.pjevaci.DTO;

public class pjesmeDTO {
    private Integer pjesma_id;
    private String naslov;
    private String godina_izdanja;
    private Integer trajanje;
    private Integer pjevac_id;

    public Integer getPjevac_id() {
        return pjevac_id;
    }

    public void setPjevac_id(Integer pjevac_id) {
        this.pjevac_id = pjevac_id;
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
