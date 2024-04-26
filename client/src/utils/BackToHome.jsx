import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
const BackToHome = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => {
        navigate("/");
      }}
    >
      Back to home Page
    </Button>
  );
};

export default BackToHome;
