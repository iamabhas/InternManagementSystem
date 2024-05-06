import React from "react";
import {Typography, Box, Paper} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import {LinearProgressWithLabel} from "../AdminComponents/ManageBatch.jsx";
import {calculateProgress} from "../AdminComponents/ManageBatch.jsx";
import PropTypes from "prop-types";


LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export const calculateRemainingDays = (endDate) => {
    endDate = new Date(endDate);
    let today = new Date();
    var one_day = 1000 * 60 * 60 * 24;
    let remainingDays = Math.abs(Math.ceil((today - endDate) / one_day))
    return remainingDays
};

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
            <Typography variant="h6">Ongoing Leave Approved by HR</Typography>
            <Box sx={{m: 2}}>

                {

                    data.map((data) => {
                        return <Paper key={data._id} elevation={3} sx={{p: 2, m: 2}}>
                            <Typography>{data.subject}</Typography>

                            <Typography>
                                {calculateRemainingDays(data.leaveToDate)} Days remaining
                            </Typography>
                            <LinearProgressWithLabel color="success"
                                                     value={calculateProgress(data.leaveFromDate, data.leaveToDate)}
                            />
                        </Paper>
                    })

                }

            </Box>
        </main>
    );
};

export default InternDashboard;
