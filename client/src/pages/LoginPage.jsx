import React from "react";
import { Typography } from "@mui/material";
import LoginComponent from "../components/authComponents/LoginComponent";

const LoginPage = () => {
  return (
    <>
      <Typography className="center-text" sx={{ m: 2 }} variant="h5">
        Welcome to Login Page
      </Typography>
      <div>
        <LoginComponent />
      </div>
    </>
  );
};

export default LoginPage;
