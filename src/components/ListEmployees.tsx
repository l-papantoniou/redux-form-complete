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
import { Button, Card, CardContent, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../index.css"; // Import css
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import {
  advancedSearchEmployee,
  getEmployees,
  searchEmployee,
} from "../reducers/EmployeeReducer";
import { deleteEmployee } from "../reducers/EmployeeReducer";
import { RootState } from "../store";
import { deleteEmployeeCompany } from "../reducers/CompanyReducer";
import SearchFormSchema from "../forms/Schemas/SearchFormSchema";
import { SearchInterface } from "../interfaces/SearchInterface";
import { submit, reset } from "redux-form";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AdvancedSearchFormSchema from "../forms/Schemas/AdvancedSearchFormSchema";
import FormEmployee from "../forms/FormEmployee";

const ListEmployees: React.FC<{ setAuth: (boolean) => void }> = ({
  setAuth,
}) => {
  const [page, setPage] = useState(1);
  const [advanced, setAdvanced] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state: RootState) => state.employees.entities);
  const countPages = useSelector(
    (state: RootState) => state.employees.countPages
  );

  const HandleNextPage = () => {
    if (page < countPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const HandlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const checkEmptyPage = () => {
    if (employees.length === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  //delete confirmation popup//
  const deleteConf = (id: number) => {
    confirmAlert({
      title: "Επιβεβαιωση διαγραφής",
      message: "Είστε σίγουρος/η, οτι θέλετε να διαγράψετε τον χρήστη;",
      buttons: [
        {
          label: "Nαι",
          onClick: async () => {
            await dispatch(deleteEmployeeCompany(id));
            await dispatch(deleteEmployee(id));
            dispatch(getEmployees(page));
            navigate("/employees");
          },
        },
        {
          label: "Όχι",
          onClick: () => navigate("/employees"),
        },
      ],
    });
  };

  const onSubmitForm = async (entity: SearchInterface) => {
    try {
      await dispatch(searchEmployee(entity));
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitAdvancedForm = async (entity: SearchInterface) => {
    try {
      await dispatch(advancedSearchEmployee(entity));
    } catch (err) {
      console.error(err.message);
    }
  };

  const ClearForm = async (page) => {
    await dispatch(reset("SearchForm"));
    await dispatch(getEmployees(page));
  };

  useEffect(() => {
    dispatch(getEmployees(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    checkEmptyPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);

  return (
    <Fragment>
      <Card
        style={{
          marginTop: "20px",
          marginBottom: ".7rem",
          backgroundColor: "#1e272e",
        }}
      >
        <CardContent
          style={{
            display: "flex",

            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            justifyContent: "space-between",
          }}
        >
          {!advanced && (
            <FormEmployee
              schema={SearchFormSchema}
              onSubmit={onSubmitForm}
            ></FormEmployee>
          )}
          {advanced && (
            <FormEmployee
              schema={AdvancedSearchFormSchema}
              onSubmit={onSubmitAdvancedForm}
            ></FormEmployee>
          )}
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              style={{
                marginLeft: "10px",
              }}
              // disabled={dispatch(isPristine("SearchForm"))}
              variant="contained"
              color="success"
              type="submit"
              onClick={() => {
                dispatch(submit("SearchForm"));
              }}
            >
              ΑΝΑΖΗΤΗΣΗ
            </Button>

            <Button
              startIcon={<ArrowDropDownIcon />}
              color="inherit"
              variant="contained"
              type="submit"
              onClick={() =>
                advanced ? setAdvanced(false) : setAdvanced(true)
              }
            >
              ADVANCED
            </Button>

            <Button
              variant="contained"
              type="submit"
              onClick={() => ClearForm(page)}
            >
              ΚΑΘΑΡΙΣΜΟΣ
            </Button>
          </Grid>
        </CardContent>
      </Card>
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
          onClick={() => navigate(`/employee/new`)}
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
                  <TableCell>ΟΝΟΜΑ</TableCell>
                  <TableCell align="center">ΕΠΩΝΥΜΟ</TableCell>
                  <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ</TableCell>
                  <TableCell align="center">Α.Φ.Μ</TableCell>
                  <TableCell align="center">ΦΥΛΟ</TableCell>
                  <TableCell align="center">ΕΘΝΙΚΟΤΗΤΑ</TableCell>

                  <TableCell align="center">ΕΝΗΜΕΡΩΣΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                  <TableCell align="center">ΔΙΑΓΡΑΦΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees &&
                  employees?.map((employee) => (
                    <TableRow
                      key={employee.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {employee.firstname}
                      </TableCell>
                      <TableCell align="center">{employee.lastname}</TableCell>
                      <TableCell align="center">
                        {" "}
                        {FormatBday(employee.birthdate)}
                      </TableCell>
                      <TableCell align="center">{employee.afm}</TableCell>
                      <TableCell align="center">{employee.sex}</TableCell>
                      <TableCell align="center">
                        {employee.nationality}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          startIcon={<UpdateIcon />}
                          onClick={() =>
                            navigate(`/employee/${employee.id}/edit`)
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
                          onClick={() => deleteConf(employee.id)}
                        >
                          Διαγραφη
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography align="right" margin="0.5rem">
              <span> Σελίδα {page}η</span>
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
                disabled={page >= countPages ? true : false}
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
      <Grid container justifyContent="center"></Grid>
    </Fragment>
  );
};

export default ListEmployees;
