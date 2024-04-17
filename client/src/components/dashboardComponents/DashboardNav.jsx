import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { logoutReducer } from "../../redux/authSlice";

const DashboardNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.userName);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logoutReducer());
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h5">
        Hello {username} , your role is {role}
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardNav;
