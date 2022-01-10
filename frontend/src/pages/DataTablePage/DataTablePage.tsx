import React from "react";
import DataTablePageComp from "../../components/DataTablePageComp";
import Header from "../../components/Header";

export default function DataTablePage() {
  //const classes = useStyles();

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <DataTablePageComp />
      </div>
    </div>
  );
}
