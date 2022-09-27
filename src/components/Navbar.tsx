import React from "react";
import Button from "@mui/material/Button";
import HttpsIcon from "@mui/icons-material/Https";
import { AppBar, Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import DarkMode from "../themes/DarkMode";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOffIcon from "@mui/icons-material/WorkOff";

export default function ButtonAppBar({ setAuth }) {
  const navigate = useNavigate();

  //logout button function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  //logout button style
  const btnstyle = { margin: "8px 0" };

  return (
    <Box sx={{ flexGrow: 2, paddingTop: 7 }}>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Company Employees
      </Typography>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Grid>
              <Button
                sx={{ marginLeft: "25px" }}
                variant="contained"
                startIcon={<PeopleIcon />}
                onClick={() => navigate("/employees")}
              >
                employees
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{ marginLeft: "25px" }}
                variant="contained"
                startIcon={<WorkOffIcon />}
                onClick={() => navigate("/unemployeed")}
              >
                unemployeed
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{ marginLeft: "25px" }}
                variant="contained"
                startIcon={<BusinessIcon />}
                onClick={() => navigate("/")}
              >
                companies
              </Button>
            </Grid>
            <Grid container justifyContent="center">
              <DarkMode />
            </Grid>
            <Grid>
              <Button
                type="submit"
                color="error"
                variant="contained"
                style={btnstyle}
                onClick={logout}
              >
                <HttpsIcon />
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
