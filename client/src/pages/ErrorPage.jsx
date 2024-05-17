import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="center-component-column">
      <Typography variant="h3">404 PAGE NOT FOUND</Typography>
      <Typography variant="h6">
        The page you're looking for does not exist !
      </Typography>
      <Button
        onClick={() => {
          navigate("/");
        }}
        variant="contained"
        color="success"
      >
        Back to Home Page
      </Button>
    </div>
  );
};

export default ErrorPage;
