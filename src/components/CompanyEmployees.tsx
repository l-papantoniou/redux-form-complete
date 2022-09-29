import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import UpdateIcon from "@mui/icons-material/Update";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css"; // Import css
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import { RootState } from "../store";
import {
  deleteEmployeeCompany,
  getCompaniesEmployees,
} from "../reducers/CompanyReducer";

const CompanyEmployees: React.FC<{ setAuth: (boolean) => void }> = (
  { setAuth },
  id
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const employees = useSelector(
    (state: RootState) => state.company.companyEmployees
  );
  const companyName = useSelector(
    (state: RootState) => state.company.companyEmployees[0].name
  );

  //format birthday date //
  const FormatBday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  };

  //delete confirmation popup
  const deleteConf = (employeeId: string, compnanyId: string) => {
    confirmAlert({
      title: "Επιβεβαιωση διαγραφής",
      message: "Είστε σίγουρος/η, οτι θέλετε να διαγράψετε τον χρήστη;",
      buttons: [
        {
          label: "Nαι",
          onClick: async () => {
            await dispatch(deleteEmployeeCompany(employeeId));
            dispatch(getCompaniesEmployees(compnanyId));
          },
        },
        {
          label: "Όχι",
          onClick: () => navigate("/"),
        },
      ],
    });
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getCompaniesEmployees(params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <AppBar position="static" color="transparent">
      <Container>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ΥΠΑΛΛΗΛΟΙ ΤΗΣ ΕΤΑΙΡΕΙΑΣ "{companyName}"
        </Typography>
      </Container>
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
                  <TableCell align="center">ΕΠΩΝΥΜΟ</TableCell>
                  <TableCell align="center">ΗΜΕΡΟΜΗΝΙΑ ΙΔΡΥΣΗΣ</TableCell>
                  <TableCell align="center">Α.Φ.Μ</TableCell>
                  <TableCell align="center">ΦΥΛΟ</TableCell>
                  <TableCell align="center">ΕΘΝΙΚΟΤΗΤΑ</TableCell>
                  <TableCell align="center">ΕΝΗΜΕΡΩΣΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                  <TableCell align="center">ΔΙΑΓΡΑΦΗ ΥΠΑΛΛΗΛΟΥ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.employee_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.firstname}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {employee.lastname}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {" "}
                      {FormatBday(employee.birthdate)}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {employee.afm}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {employee.sex}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {employee.nationality}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<UpdateIcon />}
                        onClick={() =>
                          navigate(`/employee/${employee.employee_id}/edit`)
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
                        onClick={() =>
                          deleteConf(employee.employee_id, employee.id)
                        }
                      >
                        Διαγραφη
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
    </AppBar>
  );
};
export default CompanyEmployees;
