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

//icons import
import {FaArrowLeft} from "react-icons/fa6";
import {RiFileExcel2Fill} from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";

const BatchDetails = ({selectComponentState}) => {

    const batchId = useSelector((state) => state.batchSelect.batchId);
    const batchName = useSelector((state) => state.batchSelect.batchName);
    const batchMentors = useSelector((state) => state.batchSelect.batchMentors);

    const accessToken = useSelector((state) => state.auth.token);
    const [internsData, setInternsData] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/get-qualifications-batch/${batchId}`,
                    {
                        headers: {
                            Authorization: accessToken,
                        },
                    }
                );

                setInternsData(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData();
    }, []);

    const handleExcelDownload = async () => {
        try {

            const response = await axios.get(
                `http://localhost:5000/api/excel-batchData-download/${batchId}`,
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
            console.log(error);
            console.error("Error exporting data:", error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "DownloadFailed!",
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
                <Box className="flex-component-space" sx={{m: 2}}>
                    <TableContainer component={Paper} sx={{m: 1}}>
                        <Typography textAlign="center" variant="h5">
                            Interns
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
                                        <TableCell align="center">
                                            {interns.universityName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {interns.graduationYear}
                                        </TableCell>
                                        <TableCell align="center">
                                            {interns.graduationMonth}
                                        </TableCell>
                                        <TableCell align="center">
                                            {interns.skills}
                                        </TableCell>
                                    </TableBody>
                                );
                            })}

                        </Table>
                        <Button variant="contained" color="success" startIcon={<RiFileExcel2Fill/>} sx={{m: 2}}
                                onClick={handleExcelDownload}>Import
                            interns data
                            ( .xlsx )</Button>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{m: 1}}>
                        <Typography textAlign="center" variant="h5">
                            Mentors
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"> Name</TableCell>
                                    <TableCell align="center"> Position</TableCell>
                                </TableRow>
                            </TableHead>

                            {batchMentors.map((mentors, index) => {
                                return (
                                    <TableBody key={index}>
                                        <TableCell align="center"> {mentors.fullname}</TableCell>
                                        <TableCell align="center">{mentors.position}</TableCell>
                                    </TableBody>
                                );
                            })}
                        </Table>
                    </TableContainer>
                </Box>
            </main>
        </>
    );
};

export default BatchDetails;
