import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { FaUserGraduate } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { BACKEND_URL } from "../../../services/helper.js";
import { returnMonthName } from "../../../utils/returnMonthName.js";

const RegisterQualifications = () => {
  const [open, setOpen] = React.useState(false);

  const [qualificationsExist, setQualificationsExists] = React.useState(false);
  const [qualificationsData, setQualificationsData] = React.useState({});

  const accessToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      universityName: "",
      skills: "",
      graduationMonth: "",
      graduationYear: "",
    },
    mode: "onBlur",
  });

  const fetchQualifications = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/get-qualification/${userId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (response.data.data.length > 0) {
        setQualificationsExists(true);
      }
      setQualificationsData(response.data.data[0]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  React.useEffect(() => {
    fetchQualifications();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    if (qualificationsExist) {
      reset({
        ...qualificationsData,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      universityName: "",
      skills: "",
      graduationMonth: "",
      graduationYear: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/add-intern-qualifications`,
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      setQualificationsData(data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        endIcon={<FaUserGraduate />}
        onClick={handleClickOpen}
        color="success"
      >
        {qualificationsExist ? `Edit Qualifications` : `Add Qualifications`}
      </Button>

      <div>
        {qualificationsExist ? (
          <Box sx={{ m: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your Qualifications:{" "}
            </Typography>
            <Typography variant="h6">
              University: {qualificationsData.universityName}
            </Typography>
            <Typography variant="h6">
              Graduation: {returnMonthName(qualificationsData.graduationMonth)}{" "}
              of {qualificationsData.graduationYear}
            </Typography>
            <Typography variant="h6">
              Skill set: {qualificationsData.skills}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ m: 5 }} variant="h5">
            Please Register your qualifications as soon as possible by clicking
            the add qualifications button !
          </Typography>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Qualifications</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="universityName"
                  control={control}
                  rules={{ required: "University Name is required" }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="uniName"
                      label="University Name"
                      autoComplete="universityName"
                      autoFocus
                      error={!!errors.universityName}
                      helperText={
                        errors.universityName
                          ? errors.universityName.message
                          : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="skills"
                  control={control}
                  rules={{ required: "Skills is required" }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="skills"
                      label="Your Skills"
                      autoComplete="skills"
                      error={!!errors.skills}
                      helperText={errors.skills ? errors.skills.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="graduationMonth"
                  control={control}
                  rules={{
                    required: "Graduation Month is required",
                    pattern: {
                      value: /^(1[0-2]|[1-9])$/,
                      message: "Graduation month should be a valid month",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="number"
                      id="graduationMonth"
                      label="Graduation Month"
                      autoComplete="graduationMonth"
                      error={!!errors.graduationMonth}
                      helperText={
                        errors.graduationMonth
                          ? errors.graduationMonth.message
                          : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="graduationYear"
                  control={control}
                  rules={{
                    required: "Graduation Year is required",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "Graduation year should be a valid year",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="graduationYear"
                      label="Graduation Year"
                      type="number"
                      autoComplete="graduationYear"
                      error={!!errors.graduationYear}
                      helperText={
                        errors.graduationYear
                          ? errors.graduationYear.message
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
              variant="contained"
              sx={{ m: 2 }}
              disabled={!isValid}
            >
              {qualificationsExist ? `Edit ` : `Add `}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default RegisterQualifications;
