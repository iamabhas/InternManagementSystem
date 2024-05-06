import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { generateColors } from "../../../utils/generateColors.js";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { BACKEND_URL } from "../../../services/helper.js";

const Admin = () => {
  const [batchData, setBatchData] = useState([]);
  const colors = generateColors(batchData);
  const [openDialog, setOpenDialog] = useState(false);
  const accesstoken = useSelector((state) => state.auth.token);
  const [internsOnLeave, setInternsOnLeave] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [incomingApplications, setIncomingApplications] = useState([]);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/batchdash`, {
          headers: {
            Authorization: accesstoken,
          },
        });

        const unfilteredData = response.data.data;
        const filteredData = unfilteredData.filter((uf) => {
          return uf.Interns > 0 || uf.Mentors > 0;
        });
        setBatchData(filteredData);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [accesstoken]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/incoming`, {
          headers: {
            Authorization: accesstoken,
          },
        });
        setIncomingApplications(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [accesstoken]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/current`, {
          headers: {
            Authorization: accesstoken,
          },
        });
        setInternsOnLeave(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [accesstoken]);

  const handleInternDetails = (intern) => {
    setSelectedIntern(intern);
    setOpenDialog(true);
  };

  const handleApplicationDetails = (application) => {
    setSelectedApplication(application);
    setOpenApplicationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseApplicationDialog = () => {
    setOpenApplicationDialog(false);
  };
  return (
    <main>
      <Typography variant="h5">Ongoing Batches</Typography>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        {batchData.map((batch, index) => (
          <Box key={index}>
            <PieChart width={400} height={240}>
              <Pie
                data={[
                  { name: "Interns", value: batch.Interns },
                  { name: "Mentors", value: batch.Mentors },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {batch.Mentors > 0
                  ? batchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                  : null}
              </Pie>
              <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                iconSize={20}
              />
              <Tooltip />
            </PieChart>
            <Typography variant="h7">{batch.Batchname}</Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ m: 8 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Card sx={{ minWidth: 275, backgroundColor: "#f0f0f0" }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Incoming Applications
            </Typography>
            <List sx={{ maxHeight: 300, overflowY: "auto" }}>
              {incomingApplications.map((application, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{ borderBottom: "1px solid #ddd" }}
                >
                  <ListItemText
                    primary={application.subject}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: "block", fontWeight: "bold" }}
                        >
                          {application.User?.fullname}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {application.date}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button
                    onClick={() => handleApplicationDetails(application)}
                    sx={{ marginLeft: "1rem" }}
                  >
                    Details
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openApplicationDialog}
          onClose={handleCloseApplicationDialog}
        >
          <DialogTitle>Application Details</DialogTitle>
          <DialogContent>
            {" "}
            <Typography variant="body2" color="text.primary">
              Name : {selectedApplication?.User?.fullname}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Subject: {selectedApplication?.subject}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Leave From Date:
              {new Date(
                selectedApplication?.leaveFromDate
              ).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Leave To Date:
              {new Date(selectedApplication?.leaveToDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Approved Status :{" "}
              {!selectedApplication?.approvedStatus
                ? "Not Approved"
                : "Approved"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Batch :{" "}
              {selectedIntern?.Batch?.name
                ? selectedIntern?.Batch?.name
                : "Not Assigned to a Batch"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseApplicationDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        <Card sx={{ minWidth: 275, backgroundColor: "#f0f0f0" }}>
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom>
              Current Interns on Leave
            </Typography>
            <List sx={{ maxHeight: 300, overflowY: "auto" }}>
              {internsOnLeave.map((intern, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{ borderBottom: "1px solid #ddd", display: "flex" }}
                >
                  <ListItemText
                    primary={intern.User?.fullname}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: "block", fontWeight: "bold" }}
                        >
                          {intern.User?.role}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {intern.date}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button onClick={() => handleInternDetails(intern)}>
                    Details
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Intern Details</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.primary">
            Name: {selectedIntern?.User?.fullname}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Role: {selectedIntern?.User?.role}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Email: {selectedIntern?.User?.email}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Phone Number: {selectedIntern?.User?.phoneNo}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Batch :{" "}
            {selectedIntern?.Batch?.name
              ? selectedIntern?.Batch?.name
              : "Not Assigned to a Batch"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default Admin;
