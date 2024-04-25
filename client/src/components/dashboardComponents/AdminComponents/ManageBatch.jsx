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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { IoMdAddCircle } from "react-icons/io";
import { batchData } from "../../../data/testData";

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

export default function ManageBatch() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(batchData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [progress, setProgress] = React.useState(10);

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
        <Button variant="outlined" color="warning" sx={{ m: 1 }}>
          Ongoing Batches
        </Button>
        <Button variant="outlined" color="warning" sx={{ m: 1 }}>
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
                <TableCell align="center">Actions</TableCell>
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
                      {row.batchName}
                    </TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">
                      <LinearProgressWithLabel value={progress} />
                    </TableCell>
                    <TableCell align="center">
                      <Button>View Detail</Button>
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
            console.log(email);
            handleClose();
          },
        }}
        fullWidth
      >
        <DialogTitle>Add Batch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Batch Name"
            type="email"
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start Date" sx={{ m: 1 }} fullWidth />

            <DatePicker label="End Date" sx={{ m: 1 }} />
          </LocalizationProvider>
          <Box textAlign="center" sx={{ m: 1 }}>
            <Button variant="contained" color="secondary">
              Add Batch
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
