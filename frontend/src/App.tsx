import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DataTablePage from "./pages/DataTablePage/DataTablePage";
import IndexPage from "./pages/IndexPage/IndexPage"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<IndexPage />} />
          <Route path={"/datatable"} element={<DataTablePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
