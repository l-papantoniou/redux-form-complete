import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Card, CardContent, Typography } from "@mui/material";

import UpdateIcon from "@mui/icons-material/Update";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../index.css"; // Import css
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import { RootState } from "../store";
import {
  deleteCompany,
  deleteCompanyEmployees,
  getCompanies,
  getCompaniesEmployees,
} from "../reducers/CompanyReducer";
import CompanyEmployees from "./CompanyEmployees";

const ListCompanies = ({ setAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const companies = useSelector((state: RootState) => state.company.entities);
  const employees = useSelector(
    (state: RootState) => state.company.companyEmployees
  );

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  const HandleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const HandlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const checkEmptyPage = () => {
    if (companies.length === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  //delete confirmation popup//
  const deleteConf = (id: string) => {
    console.log("company", id);
    confirmAlert({
      title: "Επιβεβαιωση διαγραφής",
      message: "Είστε σίγουρος/η, οτι θέλετε να διαγράψετε τον χρήστη;",
      buttons: [
        {
          label: "Nαι",
          onClick: async () => {
            await dispatch(deleteCompanyEmployees(id));
            await dispatch(deleteCompany(id));
            dispatch(getCompaniesEmployees(id));
            dispatch(getCompanies(page));
          },
        },
        {
          label: "Όχι",
          onClick: () => navigate("/"),
        },
      ],
    });
  };

  const getCompanyEmployees = (id) => {
    dispatch(getCompaniesEmployees(id));
  };

  useEffect(() => {
    dispatch(getCompanies(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    checkEmptyPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies]);

  return (
    <Fragment>
      <Grid
        container
        justifyContent={"right"}
        marginTop={"10px"}
        marginBottom={"10px"}
      >
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon fontSize="large" />}
          onClick={() => navigate(`/company/new`)}
        ></Button>
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
                  <TableCell>ΟΝΟΜΑ</TableCell>{" "}
                  <TableCell align="center">Α.Φ.Μ</TableCell>
                  <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΙΔΡΥΣΗΣ</TableCell>
                  <TableCell align="center">ΤΗΛΕΦΩΝΟ</TableCell>
                  <TableCell align="center">ΕΝΗΜΕΡΩΣΗ ΕΤΑΙΡΕΙΑΣ </TableCell>
                  <TableCell align="center">ΔΙΑΓΡΑΦΗ ΕΤΑΙΡΕΙΑΣ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies &&
                  companies.map((company) => (
                    <TableRow
                      key={company.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => getCompanyEmployees(company.id)}
                    >
                      <TableCell component="th" scope="row">
                        {company.name}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {company.company_afm}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {" "}
                        {FormatBday(company.establishment_year)}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {company.phone}
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<UpdateIcon />}
                          onClick={() =>
                            navigate(`/company/${company.id}/edit`)
                          }
                        >
                          Ένημέρωση
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => deleteConf(company.id)}
                        >
                          Διαγραφη
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography align="right" margin="0.5rem">
              <span> Σελίδα {page} </span>
              <Button
                className="btn default"
                variant="outlined"
                disabled={page === 1 ? true : false}
                onClick={() => HandlePrevPage()}
                startIcon={<NavigateBeforeIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                  marginLeft: "20px",
                  marginRight: "10px",
                }}
              ></Button>
              <Button
                className="btn default"
                variant="outlined"
                onClick={() => HandleNextPage()}
                startIcon={<NavigateNextIcon />}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid black",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderColor: "#e7e7e7",
                  borderRadius: "65px",
                }}
              ></Button>
            </Typography>
          </TableContainer>
        </CardContent>
      </Card>

      {employees.length > 0 && <CompanyEmployees setAuth={setAuth} />}
    </Fragment>
  );
};

export default ListCompanies;
