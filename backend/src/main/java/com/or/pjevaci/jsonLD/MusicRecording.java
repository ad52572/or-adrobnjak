package com.or.pjevaci.jsonLD;

import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldId;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldProperty;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldType;

@JsonldType("https://schema.org/MusicRecording")
public class MusicRecording {
    @JsonldId
    public  String id;
    @JsonldProperty("https://schema.org/byArtist")
    public String byArtist;
    @JsonldProperty("https://schema.org/copyrightYear")
    public String copyrightYear;
    @JsonldProperty("https://schema.org/duration")
    public String duration;
}