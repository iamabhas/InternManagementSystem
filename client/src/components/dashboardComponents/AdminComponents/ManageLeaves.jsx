/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Pagination,
  Grid,
} from "@mui/material";
import { VscFilePdf, VscPass, VscRemove } from "react-icons/vsc";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../../../services/helper.js";

//icons import
import { BsFilterLeft } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";

//Date imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "../../../utils/dateFormatter.js";

const ManageLeaves = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const accesstoken = useSelector((state) => state.auth.token);
  const [totalPage, setTotalPage] = useState(4);
  const [filterDate, setFilterDate] = React.useState({
    date: null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    size: 4,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/get-leave-applications`,
        {
          headers: {
            Authorization: accesstoken,
          },
          params: {
            page: pagination.page,
            size: pagination.size,
          },
        }
      );

      console.log("Leave");
      console.log("Response Data:", response.data);
      setLeaveApplications(response.data.data);
      setTotalPage(response.data.dataLen);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "Failed to Fetch Leave!",
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [accesstoken, pagination]);

  const handleDownload = async (application, applicationId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/download-leave-application/${applicationId}`,
        {
          headers: {
            Authorization: accesstoken,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leave_application.pdf";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      console.error("Error downloading PDF:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Dowloading Failed!",
      });
    }
  };
  const handleReject = async (applicationId) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/reject-leave-application/${applicationId}`,
        {},
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      if (response !== null || (undefined && response)) {
        setLeaveApplications((prevState) => {
          const updatedApplications = prevState.map((application) => {
            if (application._id === applicationId) {
              return {
                ...application,
                approveStatus: false, // Assuming this is the field representing approval status
              };
            }
            return application;
          });
          return updatedApplications;
        });

        Swal.fire({
          icon: "success",
          title: "Status Changed",
          text: "Leave Application Is Rejected",
        });
      }
      console.log("Status Rejected successfully:", response.data);
    } catch (error) {
      console.log(error);
      console.error("Error Rejecting status:", error.message);
      Swal.fire({
        icon: "error",
        title: "Already Error",
        text:
          error.message.data || "You have already rejected this application",
      });
    }
  };

  const handleVerify = async (applicationId) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/verify-leave-application/${applicationId}`,
        {},
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );
      if (response !== null || (undefined && response)) {
        setLeaveApplications((prevState) => {
          const updatedApplications = prevState.map((application) => {
            if (application._id === applicationId) {
              return {
                ...application,
                approveStatus: true,
              };
            }
            return application;
          });
          return updatedApplications;
        });

        Swal.fire({
          icon: "success",
          title: "Status Changed",
          text: "Leave Application Is Approved",
        });
      }
      console.log("Status verified successfully:", response.data);
    } catch (error) {
      console.log(error);
      console.error("Error verifying status:", error.message);
      Swal.fire({
        icon: "error",
        title: "Already Verified",
        text:
          error.message.data || "You have already approved of this application",
      });
    }
  };
  const handlePageChange = (event, value) => {
    console.log("New page:", value);
    setPagination((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleFilterByDate = async () => {
    const date = new Date(filterDate.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/filter-applications-by-date?targetDate=${formattedDate}`,
        {
          headers: {
            Authorization: accesstoken,
          },
        }
      );

      setLeaveApplications(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "No data :(",
        text: error.response.data.message || "Failed to Filter Date",
      });
    }
  };

  const handleDateChange = (key, date) => {
    setFilterDate((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Filter by Date"
            sx={{ m: 1 }}
            fullWidth
            value={filterDate.date}
            onChange={(date) => {
              handleDateChange("date", date);
            }}
          />
        </LocalizationProvider>
        <Button
          color="warning"
          variant="outlined"
          startIcon={<BsFilterLeft />}
          sx={{ m: 0.5 }}
          onClick={handleFilterByDate}
          disabled={!filterDate.date}
        >
          Filter
        </Button>
        <Button
          color="error"
          variant="outlined"
          startIcon={<CiCircleRemove />}
          sx={{ m: 0.5 }}
          onClick={() => {
            setFilterDate({ date: null });
            fetchData();
          }}
        >
          Clear
        </Button>
      </Box>

      <Grid container spacing={2}>
        {[...leaveApplications].reverse().map((application) => (
          <Grid item xs={12} sm={6} key={application._id}>
            <Card variant="outlined" sx={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Subject: {application.subject}
                </Typography>
                <Typography variant="body1" component="div">
                  Date: {formatDate(new Date(application.sendDate))}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  From: {application.User?.fullname || "No User"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Batch: {application.Batch?.name || "No Batch"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Requested Leave from:{" "}
                  {formatDate(new Date(application.leaveFromDate))} - To:{" "}
                  {formatDate(new Date(application.leaveToDate))}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Status: {application.approveStatus ? "Approved" : "Pending"}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Button
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    color="error"
                    startIcon={<VscFilePdf style={{ fontSize: "1.5rem" }} />}
                    onClick={async () => await handleDownload(application._id)}
                  >
                    Download as PDF
                  </Button>
                  <Button
                    sx={{
                      marginTop: "0.5rem",
                      backgroundColor: application.approveStatus
                        ? "#10b981"
                        : "#f44336",
                    }}
                    variant="contained"
                    startIcon={<VscPass style={{ fontSize: "1.5rem" }} />}
                    onClick={async () => await handleVerify(application._id)}
                  >
                    {application.approveStatus ? "Approved" : "Verify Status"}
                  </Button>
                  <Button
                    sx={{ marginTop: "0.5rem" }}
                    variant="contained"
                    startIcon={<VscRemove style={{ fontSize: "1.5rem" }} />}
                    onClick={async () => await handleReject(application._id)}
                  >
                    {application.approveStatus === "Approved"
                      ? "Approved"
                      : "Reject"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPage}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
          sx={{ margin: "20px" }}
        />
      </Box>
    </div>
  );
};

export default ManageLeaves;
