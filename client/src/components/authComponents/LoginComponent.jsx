import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import BackToHome from "../utils/BackToHome";
import { useNavigate } from "react-router";

import { loginFunction } from "../../services/Api";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://uba-solutions.com/">
        UBA Solutions
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function LoginComponent() {
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    sendRequest().then((data) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("userName", data.user_Name);
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("role", data.user_role);
      switch (data.user_role) {
        case "user":
          Swal.fire({
            icon: "success",
            title: "Success !",
            text: "You are Logged In !",
          });
          navigate("/test");
          break;
      }
    });
  };

  const sendRequest = async () => {
    const response = await loginFunction(inputs);
    console.log(response);
    console.log(response.data);
    return response.data;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/001/993/370/original/student-studying-with-laptop-for-online-school-education-vector.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to Login Page !
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                variant="standard"
                value={inputs.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                value={inputs.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container></Grid>
              <BackToHome />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginComponent;
