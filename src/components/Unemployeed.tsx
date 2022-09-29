import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WorkIcon from "@mui/icons-material/Work";
import { Button, Card, CardContent, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../index.css"; // Import css
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getUnemployeed } from "../reducers/EmployeeReducer";
import { RootState } from "../store";

const ListUnemployeed: React.FC<{ setAuth: (boolean) => void }> = ({
  setAuth,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unemployeed = useSelector(
    (state: RootState) => state.employees.unemployeed
  );

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    dispatch(getUnemployeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Grid
        container
        justifyContent={"right"}
        marginTop={"20x"}
        marginBottom={"50px"}
      >
        {"   "}
      </Grid>
      <Card
        style={{
          marginBottom: ".7rem",
          backgroundColor: "#1e272e",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ΟΝΟΜΑ</TableCell>
                  <TableCell align="center">ΕΠΩΝΥΜΟ</TableCell>
                  <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ</TableCell>
                  <TableCell align="center">Α.Φ.Μ</TableCell>
                  <TableCell align="center">ΦΥΛΟ</TableCell>
                  <TableCell align="center">ΕΘΝΙΚΟΤΗΤΑ</TableCell>

                  <TableCell align="center">ΑΝΑΘΕΣΗ ΣΕ ΕΤΑΙΡΕΙΑ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unemployeed &&
                  unemployeed?.map((unemployeed) => (
                    <TableRow
                      key={unemployeed.id} // ??? //
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {unemployeed.firstname}
                      </TableCell>
                      <TableCell align="center">
                        {unemployeed.lastname}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {FormatBday(unemployeed.birthdate)}
                      </TableCell>
                      <TableCell align="center">{unemployeed.afm}</TableCell>
                      <TableCell align="center">{unemployeed.sex}</TableCell>
                      <TableCell align="center">
                        {unemployeed.nationality}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<WorkIcon />}
                          onClick={() =>
                            navigate(
                              `/unemployeed/${unemployeed.id}/recruitment`
                            )
                          }
                        >
                          ΑΝΑΘΕΣΗ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography align="right" margin="0.5rem"></Typography>
          </TableContainer>
        </CardContent>
      </Card>
      <Grid container justifyContent="center"></Grid>
    </Fragment>
  );
};

export default ListUnemployeed;
