import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { RiMailSendLine } from "react-icons/ri";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const SendLeave = () => {
  const [open, setOpen] = React.useState(false);
  const accesstoken = useSelector((state) => state.auth.token);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      subject: "",
      applicationBody: "",
      leaveFromDate: "",
      leaveToDate: "",
    },
    mode: "onBlur",
  });
  const watchAllFields = watch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      subject: "",
      applicationBody: "",
      leaveFromDate: "",
      leaveToDate: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/send-leave-application`,
        data,
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      if (`${response.status}`.startsWith("2")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            response.data.message || "Sended Leave Application SuccessFully",
        });
      }
    } catch (error) {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "Failed to Send",
      });
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<RiMailSendLine />}
        onClick={handleClickOpen}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: "Subject is required" }}
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
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
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
