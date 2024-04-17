import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainDashboard from "../components/dashboardComponents/MainDashboard";
import DashboardNav from "../components/dashboardComponents/DashboardNav";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <DashboardNav />
      <MainDashboard />
    </div>
  );
};

export default DashboardPage;
