import React from "react";
import { useSelector } from "react-redux";
import InternDashboard from "../dashboardComponents/InternComponents/InternDashboard";
import AdminDashboard from "../dashboardComponents/AdminComponents/AdminDashboard";
import ErrorPage from "../../pages/ErrorPage";

const MainDashboard = () => {
  const userRole = useSelector((state) => state.auth.role);
  switch (userRole) {
    case "user":
      return <InternDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <ErrorPage />;
  }
};

export default MainDashboard;
