import * as React from "react";
import {
    Button,
    Typography,
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import {useSelector} from "react-redux";

import {BACKEND_URL} from "../../../services/helper.js";

//icons import
import {FaArrowLeft} from "react-icons/fa6";
import {RiFileExcel2Fill} from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";

const BatchDetails = ({selectComponentState}) => {
    const batchId = useSelector((state) => state.batchSelect.batchId);
    const batchName = useSelector((state) => state.batchSelect.batchName);
    const batchInterns = useSelector((state) => state.batchSelect.batchInterns);
    const batchMentors = useSelector((state) => state.batchSelect.batchMentors);

    const accessToken = useSelector((state) => state.auth.token);
    const [internsData, setInternsData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/get-qualifications-batch/${batchId}`,
                    {
                        headers: {
                            Authorization: accessToken,
                        },
                    }
                );

                setInternsData(response.data.data);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message || "Error",
                });
            }
        };
        fetchData();
    }, []);

    const handleExcelDownload = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/excel-batchData-download/${batchId}`,
                {
                    headers: {
                        Authorization: accessToken,
                    },
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `batch_${batchId}.xlsx`;
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Download Failed!",
            });
        }
    };

    return (
        <>
            <main>
                <Button
                    onClick={() => {
                        selectComponentState("ManageBatches");
                    }}
                    variant="outlined"
                    startIcon={<FaArrowLeft/>}
                >
                    Back
                </Button>
                {/*<Typography variant="h6">{batchId}</Typography>*/}
                <Typography variant="h5" sx={{m: 3}} textAlign={"center"}>
                    Batch Members for : {batchName}
                </Typography>
                <Divider/>

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
                    <Typography variant="h6">Interns:</Typography>

                    {batchInterns.map((interns, index) => {
                        return (
                            <Box key={index} sx={{m: 1}}>
                                {interns.fullname},
                            </Box>
                        );
                    })}
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
                    <Typography variant="h6">Mentors:</Typography>

                    {batchMentors.map((mentors, index) => {
                        return (
                            <Box key={index} sx={{m: 1}}>
                                {mentors.fullname} [ {mentors.position} ],
                            </Box>
                        );
                    })}
                </Box>

                <TableContainer component={Paper} sx={{m: 1}}>
                    <Typography textAlign="center" variant="h5">
                        Intern Qualifications
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">University Name</TableCell>
                                <TableCell align="center">Graduation Year</TableCell>
                                <TableCell align="center">Graduation Month</TableCell>
                                <TableCell align="center">Skills</TableCell>
                            </TableRow>
                        </TableHead>

                        {internsData.map((interns) => {
                            return (
                                <TableBody key={interns._id}>
                                    <TableCell align="center">
                                        {interns.Intern.username}
                                    </TableCell>
                                    <TableCell align="center">{interns.universityName}</TableCell>
                                    <TableCell align="center">{interns.graduationYear}</TableCell>
                                    <TableCell align="center">
                                        {interns.graduationMonth}
                                    </TableCell>
                                    <TableCell align="center">{interns.skills}</TableCell>
                                </TableBody>
                            );
                        })}
                    </Table>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<RiFileExcel2Fill/>}
                        sx={{m: 2}}
                        onClick={handleExcelDownload}
                    >
                        Import interns data ( .xlsx )
                    </Button>
                </TableContainer>
            </main>
        </>
    );
};

export default BatchDetails;