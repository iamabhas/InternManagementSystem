import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { LinearProgressWithLabel } from "../AdminComponents/ManageBatch.jsx";
import { calculateProgress } from "../AdminComponents/ManageBatch.jsx";
import PropTypes from "prop-types";
import { formatDate } from "../../../utils/dateFormatter.js";
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export const calculateRemainingDays = (endDate) => {
  endDate = new Date(endDate);
  let today = new Date();
  var one_day = 1000 * 60 * 60 * 24;
  let remainingDays = Math.abs(Math.ceil((today - endDate) / one_day));
  return remainingDays;
};

const InternDashboard = () => {
  const [data, setData] = React.useState([]);
  const [batchData, setBatchData] = React.useState([]);
  const accessToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.userName);
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
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/intern-user?name=${username}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        setBatchData(response.data.data);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <main>
      <Typography variant="h6">Ongoing Leave Approved by HR: </Typography>

      {data.length > 0 ? (
        <Box sx={{ m: 2 }}>
          {data.map((data) => {
            return (
              <Paper key={data._id} elevation={3} sx={{ p: 2, m: 2 }}>
                <Typography>{data.subject}</Typography>

                <Typography>
                  {calculateRemainingDays(data.leaveToDate)} Days remaining
                </Typography>
                <LinearProgressWithLabel
                  color="success"
                  value={calculateProgress(
                    data.leaveFromDate,
                    data.leaveToDate
                  )}
                />
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Typography sx={{ m: 2 }} variant="h5">
          No current leaves !
        </Typography>
      )}

      {batchData.length > 0 ? (
        batchData.map((batch) => (
          <Box key={batch._id} sx={{ m: 2 }}>
            <Typography variant="h2">{batch.name}</Typography>
            <Typography variant="subtitle1">
              Start Date: {formatDate(batch.startDate)}
            </Typography>
            <Typography variant="subtitle1">
              End Date: {formatDate(batch.endDate)}
            </Typography>

            <Typography variant="h4">Interns Of {batch.name}</Typography>
            {batch.interns.map((intern) => (
              <Paper key={intern._id} elevation={3} sx={{ p: 2, m: 2 }}>
                <Typography>{intern.fullname}</Typography>
                {intern.completed ? (
                  <Typography variant="body2">Completed</Typography>
                ) : (
                  <Typography variant="body2">
                    Remaining Days: {calculateRemainingDays(batch.endDate)}
                  </Typography>
                )}
              </Paper>
            ))}

            <Typography variant="h4">Mentors Of {batch.name}</Typography>
            {batch.mentor.map((mentor) => (
              <Paper key={mentor._id} elevation={3} sx={{ p: 2, m: 2 }}>
                <Typography>Mentor</Typography>
                <Typography>{mentor.fullname}</Typography>
              </Paper>
            ))}
          </Box>
        ))
      ) : (
        <Typography sx={{ m: 2 }} variant="h5">
          No current leaves!
        </Typography>
      )}
    </main>
  );
};

export default InternDashboard;
