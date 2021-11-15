import React from "react";
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

export default function DataTablePage() {
  //const classes = useStyles();
  function createData(atribut: string, opis: string, tip: string) {
    return { atribut, opis, tip };
  }

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
      <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "20px" }}>
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
        <Card>
          <CardContent>
            <Typography>
              Preuzmite podatke o pjevacima u JSON formatu:
            </Typography>
            <a href="pjevaci.json" download="pjevaci.json">
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
            <a href="pjevaci.csv" download="pjevaci.csv">
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
