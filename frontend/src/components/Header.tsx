import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { colors } from "../constants/colors";
import SideDrawer from "./SideDrawer";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  head: {
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "right",
    },
  },
  headerOptions: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingLeft: "100px",
    gap: "80px",
  },
  title: {
    position: "absolute",
    fontSize: "1.25rem",
    fontFamily: "Roboto",
    lineHeight: "1.4",
    paddingLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: colors.white,
  },
  linkSide: {
    textDecoration: "none",
    color: colors.black,
    width: "170px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isResp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: colors.primary }}>
        <p className={classes.title}>Pjevaci - otvoreni podaci</p>
        <Toolbar className={classes.head}>
          <div>
            {isResp ? (
              <div className={classes.headerOptions}>
                <Link to={"/"} className={classes.link}>
                  {" "}
                  Početna stranica{" "}
                </Link>
                <Link to={"/datatable"} className={classes.link}>
                  {" "}
                  Datatable{" "}
                </Link>
              </div>
            ) : (
              <SideDrawer>
                <SideDrawerContainer>
                  <Link to={"/"} className={classes.linkSide}>
                    {" "}
                    Početna stranica{" "}
                  </Link>
                  <Link to={"/datatable"} className={classes.linkSide}>
                    {" "}
                    Datatable{" "}
                  </Link>
                </SideDrawerContainer>
              </SideDrawer>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const SideDrawerContainer = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export default Header;
