package com.or.pjevaci.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.or.pjevaci.entity.Pjesma;
import com.or.pjevaci.entity.Pjevac;
import com.or.pjevaci.jsonLD.MusicRecording;
import com.or.pjevaci.jsonLD.Person;
import com.or.pjevaci.responseHandler.ResponseHandler;
import com.or.pjevaci.service.pjesmeService;
import com.or.pjevaci.service.pjevaciService;
import ioinformarics.oss.jackson.module.jsonld.JsonldModule;
import ioinformarics.oss.jackson.module.jsonld.JsonldResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequestMapping("/api")
public class apiController {
    private final pjevaciService pjevaciService;
    private final pjesmeService pjesmeSerivce;

    @Autowired
    public apiController(pjevaciService pjevaciService, pjesmeService pjesmeSerivce) {
        this.pjevaciService = pjevaciService;
        this.pjesmeSerivce = pjesmeSerivce;
    }

    @GetMapping("/pjevaci")
    public ResponseEntity<Object> Get() {
        try {
            List<Pjevac> data = pjevaciService.sviPjevaci();
            if (data.isEmpty()) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.NOT_FOUND, null);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @GetMapping("/pjevaci/{id}")
    public ResponseEntity<Object> GetById(@PathVariable("id") Integer id) {
        try {
            Optional<Pjevac> data = pjevaciService.findById(id);
            if (data.isEmpty()) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.NOT_FOUND, null);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @GetMapping("/pjevaci/zanr/{zanr}")
    public ResponseEntity<Object> GetByZanr(@PathVariable("zanr") String zanr) {

        try {
            ArrayList<Pjevac> data = pjevaciService.findByZanr(zanr);
            if (data.isEmpty()) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.NOT_FOUND, null);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @GetMapping("/pjevaci/spol/{spol}")
    public ResponseEntity<Object> GetBySpol(@PathVariable("spol") String spol) {
        try {
            ArrayList<Pjevac> data = pjevaciService.findBySpol(spol);
            // Register Jsonld Module with Jackson
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JsonldModule());


            ArrayList<String> response = new ArrayList<String>();
            for (Pjevac singer : data) {
                Person person = new Person();
                person.birthDate = singer.getDatum_rodenja().toString();
                person.birthPlace = singer.getMjesto_rodenja();
                person.familyName = singer.getPrezime();
                person.gender = singer.getSpol();
                person.givenName = singer.getIme();
                person.height = singer.getVisina();
                person.homeLocation = singer.getMjesto_stanovanja();
                person.id = singer.getPjevac_id();
                String personJsonLd = null;
                try {
                    personJsonLd = objectMapper.writer().writeValueAsString(JsonldResource.Builder.create().build(person));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                response.add(personJsonLd);

            }
            if (data.isEmpty()) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.NOT_FOUND, null);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, response);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }


    @RequestMapping(value = "/openapi", method = RequestMethod.GET)
    public ResponseEntity<String> testResourceFile() throws IOException {
        File resource = new ClassPathResource("openapi.json").getFile();
        String text = new String(Files.readAllBytes(resource.toPath()));

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=openapi.json");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");


        return ResponseEntity.ok()
                .headers(header)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(text);
    }

    @GetMapping("/pjevaci/imeIliPrezime/{ime}")
    public ResponseEntity<Object> GetByIme(@PathVariable("ime") String ime) {
        try {
            ArrayList<Pjevac> data = pjevaciService.findByIme(ime);
            if (data.isEmpty()) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.OK, data);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @GetMapping("/pjevaci/pjesme/{naslov}")
    public ResponseEntity<Object> GetPjesmeByIme(@PathVariable("naslov") String naslov) {


        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JsonldModule());
            Pjesma data = pjesmeSerivce.pjesmaByNaslov(naslov);

            ArrayList<String> response = new ArrayList<String>();

            MusicRecording musicRecording = new MusicRecording();
            musicRecording.byArtist = data.getPjevac().getIme() + " " + data.getPjevac().getPrezime();
            musicRecording.copyrightYear = data.getGodina_izdanja();
            musicRecording.duration = data.getTrajanje().toString();
            String personJsonLd = null;
            try {
                personJsonLd = objectMapper.writer().writeValueAsString(JsonldResource.Builder.create().build(musicRecording));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            response.add(personJsonLd);

            if (data == null) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.OK, data);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, personJsonLd);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @PostMapping("/pjevaci")
    public ResponseEntity<Object> AddSinger(@RequestBody Pjevac pjevac) {
        try {
            Pjevac data = pjevaciService.createPjevac(pjevac);
            if (data == null) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.OK, data);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @PutMapping("/pjevaci/{id}")
    public ResponseEntity<Object> UpdateSinger(@PathVariable("id") Integer id, @RequestBody Pjevac pjevac) {
        try {
            Pjevac data = pjevaciService.updatePjevac(pjevac, id);
            if (data == null) {
                return ResponseHandler.generateResponse("Nema podataka koji odgovaraju uvjetu!", HttpStatus.OK, data);
            } else {
                return ResponseHandler.generateResponse("Podaci uspjenso dohvaceni!", HttpStatus.OK, data);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @DeleteMapping("/pjevaci/{id}")
    public ResponseEntity<Object> DeleteSinger(@PathVariable("id") Integer id) {
        try {
            pjevaciService.deletePjevac(id);
            return ResponseHandler.generateResponse("Podaci uspješno obrisani!", HttpStatus.OK, id);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @RequestMapping("/{*params}")
    public ResponseEntity<Object> GetAny() {
        return ResponseHandler.generateResponse("Not implemented!", HttpStatus.NOT_IMPLEMENTED, null);
    }


}
