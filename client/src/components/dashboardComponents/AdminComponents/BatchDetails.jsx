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

const BatchDetails = ({selectComponentState}) => {

    const batchId = useSelector((state) => state.batchSelect.batchId);
    const batchName = useSelector((state) => state.batchSelect.batchName);
    const batchInterns = useSelector((state) => state.batchSelect.batchInterns);
    const batchMentors = useSelector((state) => state.batchSelect.batchMentors);

    return (
        <>
            <main>
                <Button
                    onClick={() => {
                        selectComponentState("ManageBatches");
                    }}
                    variant="outlined"
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
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {batchInterns.map((interns, index) => {
                                    return (
                                        <TableCell key={index} align="center">
                                            {interns.fullname}
                                        </TableCell>
                                    );
                                })}
                            </TableBody>
                        </Table>
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
