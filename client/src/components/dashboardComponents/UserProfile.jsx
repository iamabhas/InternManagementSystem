import {Container, Typography, Paper} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";

import axios from "axios";

const UserProfile = () => {
    const [data, setData] = React.useState([]);

    const token = useSelector((state) => state.auth.token);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="h5">User Profile</Typography>
            <Container style={{marginTop: "20px"}}>
                {[data]?.map((data) => (
                    <Paper key={data._id} sx={{p: 2}}>
                        <div>Username: {data.username}</div>
                        <div>Full Name: {data.fullname}</div>
                        <div>Phone No: {data.phoneNo}</div>
                        <div>Email: {data.email}</div>
                        <div>Role: {data.role}</div>
                    </Paper>
                ))}
            </Container>
        </div>
    );
};

export default UserProfile;
