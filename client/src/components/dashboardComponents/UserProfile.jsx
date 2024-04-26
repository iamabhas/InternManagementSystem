import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

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
        console.log(response.data); // No need for .json(), Axios handles it
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("Jo");
  console.log(data);

  return (
    <div>
      <Typography variant="h5">User Profile</Typography>
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        {[data]?.map((data) => (
          <ul key={data._id}>
            <li>{data.username}</li>
            <li>{data.fullname}</li>
            <li>{data.phoneNo}</li>
            <li>{data.email}</li>
            <li>{data.role}</li>
          </ul>
        ))}
      </Container>
    </div>
  );
};

export default UserProfile;
