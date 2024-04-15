import { Typography, Button, Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <main className="landing-page">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Typography variant="h3" sx={{ mb: 2 }} color="white">
          Intern Management System
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }} color="white">
          Making intern management simple !
        </Typography>
        <Stack direction="row" spacing={2}>
          {!isLoggedIn ? (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="contained"
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>
            </>
          )}
        </Stack>
      </Grid>
    </main>
  );
};

export default LandingPage;
