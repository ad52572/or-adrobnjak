package com.or.pjevaci.jsonLD;

import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldId;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldProperty;
import ioinformarics.oss.jackson.module.jsonld.annotation.JsonldType;

@JsonldType("http://schema.org/Person")
public class Person {
    @JsonldId
    public  Number id;
    @JsonldProperty("http://schema.org/givenName")
    public String givenName;
    @JsonldProperty("http://schema.org/familyName")
    public String familyName;
    @JsonldProperty("http://schema.org/jobTitle")
    public String jobtitle;
    @JsonldProperty("http://schema.org/gender")
    public String gender;
    @JsonldProperty("http://schema.org/birthPlace")
    public String birthPlace;
    @JsonldProperty("http://schema.org/birthDate")
    public String birthDate;
    @JsonldProperty("http://schema.org/homeLocation")
    public String homeLocation;
    @JsonldProperty("http://schema.org/height")
    public String height;

}