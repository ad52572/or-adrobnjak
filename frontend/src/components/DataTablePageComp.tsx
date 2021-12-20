import MaterialTable from "@material-table/core";
import { tableIcons } from "./MaterialTableIcons";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@material-ui/core";
import { CsvBuilder } from "filefy";
import React, { useEffect, useState } from "react";
import { getPjevac } from "../api/index/user";
import { Pjevaci } from "../api/index/types";

export default function DataTablePageComp() {
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singers, setSingers] = useState<Pjevaci[]>([]);
  let data = [];

  useEffect(() => {
    getPjevac()
      .then((res) => {
        setSingers(res);
      })
      .catch((e) => console.log(e));
  }, []);

  for (let x of singers) {
    let output = {
      datum_rodenja: "",
      trajanje: "",
    };
    let nx = JSON.parse(JSON.stringify(x));
    if (nx.pjesma != undefined) {
      for (let y of nx.pjesma) {
        let output = {
          pjevac_id: nx.pjevac_id,
          ime: nx.ime,
          prezime: nx.prezime,
            datum_rodenja: nx.datum_rodenja,
            mjesto_rodenja: nx.mjesto_rodenja,
            mjesto_stanovanja: nx.mjesto_stanovanja,
            zanr: nx.zanr,
            spol: nx.spol,
            visina: nx.visina,
            opis: nx.opis,
            naslov: y.naslov,
            trajanje: y.trajanje,
            godina_izdanja: y.godina_izdanja

        };
        data.push(output);
        console.log(data);
      }
    }
  }

  return (
    <div>
      <div
        style={{
          width: "95%",
          margin: "auto",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <MaterialTable
          title={"Pjevaci"}
          icons={tableIcons}
          data={data}
          columns={[
            { title: "ID", field: "pjevac_id", width: "2%" },
            { title: "Ime", field: "ime", width: "4%" },
            { title: "Prezime", field: "prezime", width: "4%" },
            { title: "Datum rođenja", field: "datum_rodenja", width: "6%" },
            { title: "Mjesto rođenja", field: "mjesto_rodenja", width: "6%" },
            {
              title: "Mjesto stanovanja",
              field: "mjesto_stanovanja",
              width: "6%",
            },
            { title: "Žanr pjevača", field: "zanr", width: "6%" },
            { title: "Spol", field: "spol", width: "2%" },
            { title: "Visina", field: "visina", width: "6%" },
            { title: "Opis", field: "opis", width: "26%" },
            { title: "Pjesma", field: "naslov", width: "6%" },
            { title: "Trajanje", field: "trajanje", width: "6%" },
            { title: "Godina izdanja", field: "godina_izdanja", width: "6%" },
          ]}
          actions={[
            {
              icon: () => (
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ padding: 0 }}
                      disableRipple={true}
                      checked={filter}
                      onChange={() => setFilter(!filter)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label="Filteri"
                />
              ),
              tooltip: "Filter search",
              isFreeAction: true,
              onClick: () => setFilter(!filter),
            },
          ]}
          options={{
            exportAllData: true,
            exportMenu: [
              {
                label: "Export CSV",
                exportFunc: (cols, datas) => {
                  const builder = new CsvBuilder("filename.csv");
                  builder
                    .setDelimeter(",")
                    .setColumns([
                      "ID",
                      "Ime",
                      "Prezime",
                      "Datum rodenja",
                      "Mjesto rodenja",
                      "Mjesto stanovanja",
                      "Žanr",
                      "Spol",
                      "Visina",
                      "Opis",
                      "Pjesma",
                      "Trajanje",
                      "Godina izdanj",
                    ])
                    .addRows(datas)
                    .exportFile();
                },
              },
              {
                label: "Export JSON",
                exportFunc: (cols, datas) => {
                  let array = [];
                  for (let x in datas) {
                    let novi_pjevac: any = {
                      id: datas[x][0],
                      ime: datas[x][1],
                      prezime: datas[x][2],
                      datum_rodenja: datas[x][3],
                      mjesto_rodenja: datas[x][4],
                      mjesto_stanovanja: datas[x][5],
                      zanr: datas[x][6],
                      spol: datas[x][7],
                      visina: datas[x][8],
                      opis: datas[x][9],
                      pjesme: [],
                    };
                    let nova_pjesma: any = {
                      naslov: datas[x][10],
                      trajanje: String(datas[x][11]),
                      godina_izdanja: datas[x][12],
                    };
                    novi_pjevac.pjesme.push(nova_pjesma);
                    array.push(novi_pjevac);
                  }
                  for (let stepx = 0; stepx < array.length; stepx++) {
                    for (let stepy = stepx + 1; stepy < array.length; stepy++) {
                      if (array[stepx]["id"] === array[stepy]["id"]) {
                        array[stepx]["pjesme"].push(array[stepy]["pjesme"][0]);
                      }
                    }
                  }
                  let postoji: string | string[] = [];
                  for (let x in array) {
                    if (postoji.includes(array[x].id)) {
                      delete array[x];
                    } else {
                      postoji.push(array[x].id);
                    }
                  }

                  const element = document.createElement("a");
                  const file = new Blob(
                    [JSON.stringify(array.filter((n) => n))],
                    { type: "text/json;charset=utf-8;" }
                  );
                  element.href = URL.createObjectURL(file);
                  element.download = "myFile.json";
                  document.body.appendChild(element); // Required for this to work in FireFox
                  element.click();
                },
              },
            ],
            filtering: filter,
          }}
        />
      </div>
    </div>
  );
}
