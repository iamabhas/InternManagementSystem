import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboardComponents/Dashboard";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
};

export default DashboardPage;
