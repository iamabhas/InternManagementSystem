import React from "react";
import {Typography, Box, Paper} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import {formatDate} from "../../../utils/dateFormatter.js";


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
            {batchData.length > 0 ? (
                batchData.map((batch) => (
                    <Box key={batch._id} sx={{m: 2}}>
                        <Typography variant="h4">Your Batch: {batch.name}</Typography>
                        <Typography variant="subtitle1" sx={{m: 1}} color="textSecondary">
                            {formatDate(batch.startDate)} - {formatDate(batch.endDate)} ({" "}
                            {calculateRemainingDays(batch.endDate)} days remaining )
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                color: "text.primary",
                                "& svg": {
                                    m: 1,
                                },
                                p: 1,
                                m: 1,
                            }}
                        >
                            <Typography variant="h6">Your fellow interns: </Typography>
                            {batch.interns.map((intern, index) => (
                                <Box key={index} sx={{m: 1}}>
                                    <Typography>{intern.fullname},</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                color: "text.primary",
                                "& svg": {
                                    m: 1,
                                },
                                p: 1,
                                m: 1,
                            }}
                        >
                            <Typography variant="h6">Your batch mentors: </Typography>
                            {batch.mentor.map((mentor, index) => (
                                <Box key={index} sx={{m: 1}}>
                                    <Typography>{mentor.fullname}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography sx={{m: 2}} variant="h5">
                    No interns/mentors have been assigned to your batch yet
                </Typography>
            )}

            <Typography variant="h4">Ongoing Leave Approved by HR: </Typography>

            {data.length > 0 ? (
                <Box sx={{m: 2}}>
                    {data.map((data) => {
                        return (
                            <Paper key={data._id} elevation={3} sx={{p: 2, m: 2}}>
                                <Typography>{data.subject}</Typography>

                                <Typography color="textSecondary">
                                    ( {calculateRemainingDays(data.leaveToDate)} Days remaining )
                                </Typography>
                            </Paper>
                        );
                    })}
                </Box>
            ) : (
                <Typography sx={{m: 2}} variant="h5">
                    No current leaves !
                </Typography>
            )}
        </main>
    );
};

export default InternDashboard;
