import * as React from "react";
import PropTypes from "prop-types";

//mui imports
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
} from "@mui/material";

//date imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "../../../utils/dateFormatter";

//icons imports
import { IoMdAddCircle } from "react-icons/io";

//package imports
import axios from "axios";
import Swal from "sweetalert2";

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBatch } from "../../../redux/batchSelectSlice.js";

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

const calculateProgress = (startDate, endDate) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let today = new Date();

  let quotient = Math.abs(today - startDate);
  let divider = Math.abs(endDate - startDate);
  let finalProgress = Math.round((quotient / divider) * 100);

  if (finalProgress >= 100) {
    return 100;
  } else {
    return finalProgress;
  }
};

export default function ManageBatch({ selectComponentState }) {
  const [inputs, setInputs] = React.useState({
    name: "",
    startDate: null,
    endDate: null,
  });
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const accesstoken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (key, date) => {
    setInputs((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/batch", {
          headers: {
            Authorization: accesstoken,
          },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOngoing = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/batchongoing",
          {
            headers: {
              Authorization: accesstoken,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Completed Batch",
          text: "Ongoing Batches",
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };
  const handleComplete = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/batchcomplete",
          {
            headers: {
              Authorization: accesstoken,
            },
          }
        );

        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Batch Error",
          text: error.message.data || "None Of The Batch Are Completed",
        });
      }
    };
    fetchData();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/batch",
        inputs,
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      console.log(response.data);

      setData((prevData) => [...prevData, response.data]);

      setInputs({
        name: "",
        startDate: null,
        endDate: null,
      });

      Swal.fire({
        icon: "success",
        title: "Registered",
        text: "Batch Registered Successfully!",
      });
    } catch (error) {
      console.error("Error adding batch:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to register batch!",
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
        Manage Batches
      </Typography>
      <Box textAlign="center" sx={{ m: 4 }}>
        {" "}
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          color="success"
          startIcon={<IoMdAddCircle />}
        >
          Add Batch
        </Button>
      </Box>

      <Box textAlign="center">
        <Button variant="outlined" color="warning" sx={{ m: 1 }}>
          All Batches
        </Button>
        <Button
          variant="outlined"
          color="warning"
          sx={{ m: 1 }}
          onClick={handleOngoing}
        >
          Ongoing Batches
        </Button>
        <Button
          variant="outlined"
          color="warning"
          sx={{ m: 1 }}
          onClick={handleComplete}
        >
          Completed Batches
        </Button>
      </Box>

      <Box textAlign="center" sx={{ m: 5 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Batch Name</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Progress</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...data]
                .reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(row.startDate)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(row.endDate)}
                    </TableCell>
                    <TableCell align="center">
                      <LinearProgressWithLabel
                        color={
                          calculateProgress(row.startDate, row.endDate) === 100
                            ? "success"
                            : "error"
                        }
                        value={calculateProgress(row.startDate, row.endDate)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          dispatch(setBatch(row));

                          selectComponentState("BatchDetails");
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
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
            handleClose();
          },
        }}
        fullWidth
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Add Batch</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              label="Batch Name"
              type="email"
              fullWidth
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                sx={{ m: 1 }}
                fullWidth
                value={inputs.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
              />

              <DatePicker
                label="End Date"
                sx={{ m: 1 }}
                value={inputs.endDate}
                onChange={(date) => handleDateChange("endDate", date)}
              />
            </LocalizationProvider>
            <Box textAlign="center" sx={{ m: 1 }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={async () => await handleSubmit()}
              >
                Add Batch
              </Button>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
