import React, {useState} from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {VscFilePdf, VscPass, VscRemove} from "react-icons/vsc";
import axios from "axios";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";
import {formatDate} from "../../../utils/dateFormatter.jsx"

const ManageLeaves = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const accesstoken = useSelector((state) => state.auth.token);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/get-leave-applications",
                    {
                        headers: {
                            Authorization: accesstoken,
                        },
                    }
                );

                setLeaveApplications(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData();
    }, [accesstoken]);

    const handleDownload = async (applicationId, applicationStatus) => {
        try {
            if (applicationStatus === true) {
                const response = await axios.get(
                    `http://localhost:5000/api/dowload/${applicationId}`,
                    {
                        headers: {
                            Authorization: accesstoken,
                        },
                        responseType: "blob",
                    }
                );

                const blob = new Blob([response.data], {type: "application/pdf"});
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "leave_application.pdf";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Status Is Not Approved",
                    text: "Please Approved The Leave Status",
                });
            }
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
                `http://localhost:5000/api/reject-leave-application/${applicationId}`,
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
                title: "Verification Error",
                text: error.message.data || "Already Rejected",
            });
        }
    };

    const handleVerify = async (applicationId) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/verify-leave-application/${applicationId}`,
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
                title: "Verification Error",
                text: error.message.data || "Already Verified",
            });
        }
    };

    return (
        <div>
            {leaveApplications.map((application) => (
                <Card
                    key={application._id}
                    variant="outlined"
                    style={{marginBottom: "20px"}}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Subject: {application.subject}
                        </Typography>
                        <Typography variant="body1" component="div">
                            Date: {formatDate(new Date(application.sendDate))}
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            From :{" "}
                            {application.User?.fullname
                                ? application.User.fullname
                                : "No User"}

                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Batch: {application.Batch?.name ? application.Batch.name : "No Batch"}

                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Requested Leave from : {formatDate(new Date(application.leaveFromDate))} -
                            To: {formatDate(new Date(application.leaveToDate))}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Status: {application.approveStatus ? "Approved" : "Pending"}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Button
                                sx={{marginTop: "10px"}}
                                variant="outlined"
                                color="error"
                                startIcon={<VscFilePdf style={{fontSize: "1.5rem"}}/>}
                                onClick={async () =>
                                    await handleDownload(
                                        application._id,
                                        application.approveStatus
                                    )
                                }
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
                                startIcon={<VscPass style={{fontSize: "1.5rem"}}/>}
                                onClick={async () => await handleVerify(application._id)}
                            >
                                {application.approveStatus ? "Approved" : "Verify Status"}
                            </Button>
                            <Button
                                sx={{marginTop: "0.5rem"}}
                                variant="contained"
                                startIcon={<VscRemove style={{fontSize: "1.5rem"}}/>}
                                onClick={async () => await handleReject(application._id)}
                            >
                                {application.approveStatus === "Approved"
                                    ? "Approved"
                                    : "Reject"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ManageLeaves;
