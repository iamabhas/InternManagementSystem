import React from "react";
import { Typography, Button, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Intern Management System
      </Typography>
      <Stack direction="row" spacing={2}>
        {!isLoggedIn ? (
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            variant="contained"
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
              color="secondary"
            >
              Log in
            </Button>
          </>
        )}
      </Stack>
    </Grid>
  );
};

export default LandingPage;
