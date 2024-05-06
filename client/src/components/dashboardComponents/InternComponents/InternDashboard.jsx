import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const InternDashboard = () => {
  const [data, setData] = React.useState([]);
  const accessToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  console.log(accessToken);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave-intern/${userId}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
        console.error("Error  :" + error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <main>
      <Typography variant="h6">Intern Dashboard</Typography>
    </main>
  );
};

export default InternDashboard;
