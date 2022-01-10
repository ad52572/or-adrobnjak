import React from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";

import DataTablePage from "./pages/DataTablePage/DataTablePage";
import IndexPage from "./pages/IndexPage/IndexPage"
import {useAuth0} from "@auth0/auth0-react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<IndexPage />} />
          <Route path={"/datatable"} element={<DataTablePage />} />
            <Route element={<RequireAuth />}>
                <Route path={"/profil"} element={<ProfilePage />} />
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

function RequireAuth() {
    let location = useLocation();
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}

export default App;
