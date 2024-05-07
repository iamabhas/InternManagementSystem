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
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import Swal from "sweetalert2";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ManageMentors() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const accesstoken = useSelector((state) => state.auth.token);
  const [BatchData, setBatchData] = React.useState([]);
  const [selectedMentor, setSelectedMentor] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/batchmentor",
          {
            headers: {
              Authorization: accesstoken,
            },
          }
        );

        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const [inputs, setInputs] = React.useState({
    username: "",
    fullname: "",
    email: "",
    phoneNo: "",
    role: "mentor",
    BatchId: "",
    position: "",
    expertise: "",
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/batch/mentor",
        {
          ...inputs,
          BatchId: inputs.BatchId,
        },
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      if (response && `${response.status}`.startsWith("2")) {
        Swal.fire({
          title: "Success",
          text: "Mentor Registered Successfully",
          timer: 2000,
          icon: "success",
        });

        setData((prevData) => [...prevData, inputs]);

        handleClose();
      }
    } catch (error) {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed",
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputs({
      username: "",
      fullname: "",
      email: "",
      phoneNo: "",
      role: "mentor",
      BatchId: "",
      position: "",
      expertise: "",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    const fetchBatchName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/batchdash",
          {
            headers: {
              Authorization: accesstoken,
            },
          }
        );

        setBatchData(response.data.data);
      } catch (error) {
        Swal.fire({
          title: "error",
          text: "Batch Is Not Available",
          timer: 2000,
        });
      }
    };
    fetchBatchName();
  }, []);

  const handleExpertiseDetails = (mentor) => {
    setSelectedMentor(mentor);
    setOpenDialog(true);
  };
  console.log(selectedMentor);

  return (
    <React.Fragment>
      <Typography variant="h4" sx={{ m: 2 }} style={{ textAlign: "center" }}>
        Manage Mentors
      </Typography>
      <Box textAlign="center" sx={{ m: 4 }}>
        {" "}
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          color="success"
          startIcon={<IoMdAddCircle />}
        >
          Add Mentor
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
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Expertise</TableCell>
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
                    <TableCell align="center">
                      {row.Batch?.name ? row.Batch.name : "Not In A Batch"}
                    </TableCell>
                    <TableCell align="center">{row.position}</TableCell>
                    <TableCell align="center">
                      {" "}
                      <Button
                        sx={{ marginTop: "0.8rem" }}
                        variant="outlined"
                        size="small"
                        onClick={() => handleExpertiseDetails(row)}
                      >
                        View
                      </Button>
                    </TableCell>

                    <Dialog
                      open={openDialog}
                      onClose={handleCloseDialog}
                      maxWidth="1"
                    >
                      <DialogTitle>Expertise</DialogTitle>
                      <DialogContent>
                        <Typography variant="body1" color="text.secondary">
                          Progamming Language :{" "}
                          {selectedMentor?.expertise
                            ? selectedMentor?.expertise
                            : "Empty"}
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
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

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Mentor</DialogTitle>
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
            <Grid item xs={12} md={6}>
              {" "}
              {/* Grid item for Intern Phone Number */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="position"
                label="Position"
                name="position"
                autoComplete="position"
                autoFocus
                value={inputs.position}
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
                id="expertise"
                label="Expertise"
                name="expertise"
                autoComplete="expertise"
                autoFocus
                value={inputs.expertise}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Batch Name</InputLabel>
                <Select
                  labelId="batch-label"
                  label="Batch"
                  name="BatchId"
                  value={inputs.BatchId}
                  onChange={handleChange}
                >
                  {BatchData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.Batchname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <Box textAlign="center" sx={{ m: 1 }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Add Mentor
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
