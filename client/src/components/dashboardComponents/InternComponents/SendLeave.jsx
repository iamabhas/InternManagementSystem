import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { RiMailSendLine } from "react-icons/ri";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/dateFormatter";

const SendLeave = () => {
  const [open, setOpen] = React.useState(false);
  const [leavesData, setLeavesData] = React.useState([]);
  const accessToken = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.userName);
  const [dateInputs, setDateInputs] = React.useState({
    leaveFromDate: null,
    leaveToDate: null,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      subject: "",
      applicationBody: "",
    },
    mode: "onBlur",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/leave-intern-all",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setLeavesData(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [accessToken]);

  const handleClose = () => {
    setOpen(false);
    reset({
      subject: "",
      applicationBody: "",
    });
    setDateInputs({
      leaveFromDate: null,
      leaveToDate: null,
    });
  };

  const handleDateChange = (key, date) => {
    setDateInputs((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-leave-application",
        {
          ...data,
          leaveFromDate: dateInputs.leaveFromDate,
          leaveToDate: dateInputs.leaveToDate,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setLeavesData([...leavesData, response.data.data]);
    } catch (error) {
      console.error(error.message);
    } finally {
      handleClose();
    }
  };

  const checkDateValidation = () => {
    return !dateInputs.leaveToDate || !dateInputs.leaveFromDate;
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<RiMailSendLine />}
        onClick={handleClickOpen}
        color="success"
        sx={{ marginBottom: 2 }}
      >
        Send Leave Application
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Leave Application</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: "Application Subject is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Subject"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      error={!!errors.subject}
                      helperText={errors.subject ? errors.subject.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="applicationBody"
                  control={control}
                  rules={{ required: "Application Body is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Body"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.applicationBody}
                      helperText={
                        errors.applicationBody
                          ? errors.applicationBody.message
                          : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start of Leave"
                    fullWidth
                    value={dateInputs.leaveFromDate}
                    onChange={(date) => handleDateChange("leaveFromDate", date)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End of Leave"
                    fullWidth
                    value={dateInputs.leaveToDate}
                    onChange={(date) => handleDateChange("leaveToDate", date)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || checkDateValidation()}
              sx={{ mt: 2 }}
            >
              Send Leave
            </Button>
          </form>
        </Box>
      </Dialog>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Leave History Of {username}
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...leavesData].reverse().map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.subject}</TableCell>
                  <TableCell>{formatDate(leave.leaveFromDate)}</TableCell>
                  <TableCell>{formatDate(leave.leaveToDate)}</TableCell>
                  <TableCell>
                    {leave.approveStatus ? "Approved" : "Pending"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default SendLeave;
