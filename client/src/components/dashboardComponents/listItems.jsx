import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { HiOutlineUserGroup } from "react-icons/hi";

export const mainListItems = (role, setSelectedComponent) => {
  switch (role) {
    case "user":
      return (
        <React.Fragment>
          <ListItemButton
            onClick={() => setSelectedComponent("InternDashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </React.Fragment>
      );
    case "admin":
      return (
        <React.Fragment>
          <ListItemButton
            onClick={() => setSelectedComponent("AdminDashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => setSelectedComponent("ManageBatches")}>
            <ListItemIcon>
              <HiOutlineUserGroup style={{ fontSize: "1.5rem" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Batches" />
          </ListItemButton>
        </React.Fragment>
      );
  }
};
