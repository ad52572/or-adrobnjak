import React from "react";
import Header from "../../components/Header";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function DataTablePage() {
  //const classes = useStyles();
  return (
    <div>
      <Header />
      <div style={{ width: "90%", margin: "auto", paddingTop: "15px" }}>
        <Card>
          <CardContent>
            <Typography>
              Preuzmite podatke o pjevacima u JSON formatu:
            </Typography>
            <a href="pjevaci.json" download="pjevaci.json">
              <Button type="button">Download data!</Button>
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
              <Button type="button">Download data!</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
