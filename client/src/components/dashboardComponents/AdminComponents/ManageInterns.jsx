import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Grid,
} from "@mui/material";

import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { IoMdAddCircle } from "react-icons/io";
import { internData } from "../../../data/testData";
import { registerIntern } from "../../../services/Api";
import { IoFilter } from "react-icons/io5";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function ManageInterns() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(internData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [progress, setProgress] = React.useState(10);

  const [inputs, setInputs] = React.useState({
    username: "",
    fullname: "",
    email: "",
    phoneNo: "",
    role: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      console.log(inputs);
      const userData = await registerIntern(inputs);
      console.log(userData);
      if (userData !== null) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Intern Register SuccessFully",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Error",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" sx={{ m: 2 }} style={{ textAlign: "center" }}>
        Manage Intern
      </Typography>
      <Box textAlign="center" sx={{ m: 4 }}>
        {" "}
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          color="success"
          startIcon={<IoMdAddCircle />}
        >
          Add Intern
        </Button>
        <Button
          variant="outlined"
          color="warning"
          sx={{ m: 1 }}
          startIcon={<IoFilter />}
        >
          Filter Interns
        </Button>
      </Box>

      <Box textAlign="center" sx={{ m: 5 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Phone No</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Batch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...data]
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullname}
                    </TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.phoneNo}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.batch}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        fullWidth
      >
        <DialogTitle>Add Intern</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {" "}
            {/* Grid container */}
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Intern Name */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={inputs.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Intern Full Name */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Fullname"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                value={inputs.fullname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Intern Email */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputs.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Role */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
                autoFocus
                value={inputs.role}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Intern Phone Number */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNo"
                label="Phone Number"
                name="phoneNo"
                autoComplete="phoneNumber"
                autoFocus
                value={inputs.phoneNo}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <Box textAlign="center" sx={{ m: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmit}
          >
            Add Intern
          </Button>
        </Box>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
