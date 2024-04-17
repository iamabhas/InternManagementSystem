import { Typography } from "@mui/material";

const TestPage = () => {
  return (
    <div>
      <Typography variant="h1">You are Logged In as</Typography>
      <Typography variant="h2">{localStorage.getItem("userName")}</Typography>
    </div>
  );
};

export default TestPage;
