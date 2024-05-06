import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { RiMailSendLine } from "react-icons/ri";
import axios from "axios";
// Date imports
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

const SendLeave = () => {
  const [open, setOpen] = React.useState(false);
  const accesstoken = useSelector((state) => state.auth.token);
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
    const requestData = {
      ...data,
      leaveFromDate: dateInputs.leaveFromDate,
      leaveToDate: dateInputs.leaveToDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-leave-application",
        requestData,
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    } finally {
      handleClose();
    }
  };

  const checkDateValidation = () => {
    if (!dateInputs.leaveToDate || !dateInputs.leaveFromDate) {
      return true;
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<RiMailSendLine />}
        onClick={handleClickOpen}
        color="success"
      >
        Send Leave Application
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Leave Application</DialogTitle>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: "Application Subject is required" }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="subject"
                      label="Subject"
                      autoComplete="subject"
                      autoFocus
                      error={!!errors.subject}
                      helperText={errors.subject ? errors.subject.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="applicationBody"
                  control={control}
                  rules={{ required: "Application Body is required" }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="applicationBody"
                      label="Body"
                      autoComplete="applicationBody"
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
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start of Leave"
                    sx={{ m: 1 }}
                    fullWidth
                    value={dateInputs.leaveFromDate}
                    onChange={(date) => handleDateChange("leaveFromDate", date)}
                  />

                  <DatePicker
                    label="End of Leave"
                    sx={{ m: 1 }}
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
              sx={{ m: 2 }}
              disabled={!isValid || checkDateValidation()}
            >
              Send Leave
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default SendLeave;
