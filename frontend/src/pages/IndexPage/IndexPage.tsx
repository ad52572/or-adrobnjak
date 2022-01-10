import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Profile from "../../components/Profile";
import {
  deleteFile,
  getAll,
  getAllJson,
  postJson,
} from "../../api/files/files";
import {useAuth0} from "@auth0/auth0-react";

export default function IndexPage() {
  function createData(atribut: string, opis: string, tip: string) {
    return { atribut, opis, tip };
  }

  const [jsonUrl, setJsonUrl] = useState<string>("");
  const [csvUrl, setCsvUrl] = useState<string>("");

  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    getAll().then((result) => {
      result.forEach((element) => {
        if (element.contentType == "text/csv") {
          setCsvUrl(element.url);
        } else if (element.contentType == "application/json") {
          setJsonUrl(element.url);
        }
      });
    });
  });


  const refreshData = () => {
    getAllJson()
      .then((res) => {
        deleteFile(jsonUrl);
        deleteFile(csvUrl);
        let dataCSV = "ime, prezime, opis, datum_rodenja, mjesto_rodenja, mjesto_stanovanja, spol, visina, zanr, pjesma (naslov trajanje godina_izdanja)";
        for (let x of res) {
          let row =
            x.ime +
            " ," +
            x.prezime +
            " ," +
            x.opis +
            " ," +
            x.datum_rodenja +
            " ," +
            x.mjesto_rodenja +
            " ," +
            x.mjesto_stanovanja +
            " ," +
            x.spol +
            x.visina +
            " ," +
            x.zanr;
          for (let y of x.pjesma) {
            dataCSV =
              dataCSV +
              row +
              y.naslov +
              " " +
              y.trajanje +
              y.godina_izdanja +
              "\n";
          }
        }
        const blob = new Blob([JSON.stringify(res)], {
          type: "application/json",
        });
        const tmpFile = new File([blob], "pjevaci.json", {
          type: "application/json",
        });
        const form = new FormData();
        form.append("file", tmpFile);
        postJson(form).then((res) => console.log("successfull upload json"));
        const blob2 = new Blob([dataCSV], {
          type: "text/csv",
        });
        const tmpFile2 = new File([blob2], "pjevaci.csv", {
          type: "text/csv",
        });
        const form2 = new FormData();
        form2.append("file", tmpFile2);
        postJson(form2).then((res) => console.log("successfull upload csv"));
      })
      .catch((err) => console.log(err));
  };

  const rows = [
    createData("ime", "ime pjevača pod kojim nastupa", "varchar"),
    createData("prezime", "prezime pjevača pod kojim nastupa", "varchar"),
    createData("spol", "spol pjevača", "date"),
    createData("datum_rodenja", "datum rođenja pjevača", "varchar"),
    createData("visina", "fizička visina pjevač", "varchar"),
    createData(
      "naziv_zanra",
      "žanr većine pjesama koje je objavio pjevač",
      "varchar"
    ),
    createData("opsi", "kratki opis pjevača", "varchar"),
    createData("naslov", "naziv pjesme", "varchar"),
    createData("godina_izdanja", "godina kada je pjesma objavljena", "varchar"),
    createData("trajanje", "vremenska duljina pjesme", "varchar"),
  ];

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "80px" }}>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Atribut</TableCell>
                <TableCell align="right">Opis</TableCell>
                <TableCell align="right">Tip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.atribut}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.atribut}</TableCell>
                  <TableCell align="right">{row.opis}</TableCell>
                  <TableCell align="right">{row.tip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ width: "90%", margin: "auto", paddingTop: "15px" }}>
        { isAuthenticated && <Button onClick={() => refreshData()}>Osvježi podatke</Button>}

        <Card>
          <CardContent>
            <Typography>
              Preuzmite podatke o pjevacima u JSON formatu:
            </Typography>
            <a href={jsonUrl}>
              <Button startIcon={<DownloadIcon />} type="button">
                Download data!
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      <div style={{ width: "90%", margin: "auto", paddingTop: "15px" }}>
        <Card>
          <CardContent>
            <Typography>
              Preuzmite podatke o pjevacima u CSV formatu:
            </Typography>
            <a href={csvUrl}>
              <Button startIcon={<DownloadIcon />} type="button">
                Download data!
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      <div style={{ width: "90%", margin: "auto", paddingTop: "15px" }}>
        <Card>
          <CardContent>
            <Typography>- licenca: GNU General Public License v3.0</Typography>
            <Typography>- autor: Antun Drobnjak</Typography>
            <Typography>- verzija: 2.0</Typography>
            <Typography>- jezik: hrvatski</Typography>
            <Typography>- datum izdanja: 31.10.2021.</Typography>
            <Typography>- zadnja izmjena: 15.11.2021.</Typography>
            <Typography>- naslov: Popis pjevača</Typography>
            <Typography>
              - opis: Ovdje možete pronaći sve informacije o poznatim pjevačima
              i preuzeti ih u formatu JSON i CSV.
            </Typography>
            <Typography>
              - kontakt informacije: antun.drobnjak@fer.hr
            </Typography>
            <Typography>
              - podržani preglednici: chrome, firefox, opera, edge (za ove
              preglednike dajemo podršku)
            </Typography>
            <Typography>
              - preporučeni screen-ration: 1200x700 i više (na manjim ekranima
              je preglednost manja, ali je sve funckionalno)
            </Typography>
            <Typography>
              - zadnje izmjene: Vrijeme prikazano u min i sek.
            </Typography>
            <Typography>
              - info: Creative Commons BY-SA 4.0 one-way compatible with GNU GPL
              version 3 means that a person can now take a work they received
              under the terms of CC BY-SA 4.0 and then distribute adaptations of
              that work under the terms of GPLv3.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
