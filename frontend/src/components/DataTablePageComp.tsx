import React from "react";
import { getPjesma, getPjevac } from "../api/index/user";
import MaterialTable from "@material-table/core";
import { tableIcons } from "./MaterialTableIcons";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@material-ui/core";
import { CsvBuilder } from "filefy";

export class DataTablePageComp extends React.Component {
  state = {
    loading: false,
    pjesme: [],
    pjevaci: [],
    data: [],
    filter: false,
  };

  async componentDidMount() {
    getPjesma()
      .then((response: any) => {
        this.setState({ pjesme: response });
      })
      .catch((e: any) => {
        console.log(e);
      });
    getPjevac()
      .then((response: any) => {
        this.setState({ pjevaci: response });
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  private handleChange = () => {
    this.setState({ filter: !this.state.filter });
  };

  async componentDidUpdate() {
    function jsonConcat(o1: any, o2: any) {
      for (let key in o2) {
        o1[key] = o2[key];
      }
      return o1;
    }

    function secondsToHms(d: any) {
      d = Number(d);
      let h = Math.floor(d / 3600);
      let m = Math.floor((d % 3600) / 60);
      let s = Math.floor((d % 3600) % 60);

      let hDisplay = h > 0 ? h + (h === 1 ? " h, " : " h, ") : "";
      let mDisplay = m > 0 ? m + (m === 1 ? " m, " : " m, ") : "";
      let sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
      return hDisplay + mDisplay + sDisplay;
    }

    let data: any = [];
    if (this.state.pjevaci.length && this.state.pjesme.length) {
      for (let x in this.state.pjevaci) {
        for (let y in this.state.pjesme) {
          if (
            this.state.pjevaci[x]["pjevac_id"] ===
            this.state.pjesme[y]["pjevac"]["pjevac_id"]
          ) {
            let output = {
              datum_rodenja: "",
              trajanje: "",
            };
            output = jsonConcat(output, this.state.pjevaci[x]);
            output = jsonConcat(output, this.state.pjesme[y]);
            output.datum_rodenja = output.datum_rodenja.substring(0, 10);
            output.trajanje = secondsToHms(output.trajanje);
            data.push(output);
          }
        }
      }
      if (!this.state.loading) {
        this.setState({ loading: true });
        this.setState({ data: data });
      }
    }
  }

  render() {
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
            data={this.state.data}
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
                        checked={this.state.filter}
                        onChange={this.handleChange}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label="Filteri"
                  />
                ),
                tooltip: "Filter search",
                isFreeAction: true,
                onClick: this.handleChange,
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
                      for (
                        let stepy = stepx + 1;
                        stepy < array.length;
                        stepy++
                      ) {
                        if (array[stepx]["id"] === array[stepy]["id"]) {
                          array[stepx]["pjesme"].push(
                            array[stepy]["pjesme"][0]
                          );
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
              filtering: this.state.filter,
            }}
          />
        </div>
      </div>
    );
  }
}
