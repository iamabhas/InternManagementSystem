/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import * as React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

import Swal from "sweetalert2";
import {IoMdAddCircle} from "react-icons/io";

import {IoFilter} from "react-icons/io5";
import axios from "axios";
import {useSelector} from "react-redux";
import {returnMonthName} from "../../../utils/returnMonthName.js";

export default function ManageInterns() {
    const [open, setOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [qualificationsData, setQualificationsData] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [BatchData, setBatchData] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const accesstoken = useSelector((state) => state.auth.token);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/batchintern",
                    {
                        headers: {
                            Authorization: accesstoken,
                        },
                    }
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData();
    }, [setData]);

    const fetchQualificationsDate = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/get-qualification/${userId}`,
                {
                    headers: {
                        Authorization: accesstoken,
                    },
                }
            );
            setQualificationsData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            handleDetailClose()
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response.data.message,
            });
        }
    }

    const [inputs, setInputs] = React.useState({
        username: "",
        fullname: "",
        email: "",
        phoneNo: "",
        role: "intern",
        BatchId: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/batch/intern",
                {
                    ...inputs,
                    BatchId: inputs.BatchId,
                },
                {
                    headers: {
                        Authorization: accesstoken,
                    },
                }
            );

            if (response && `${response.status}`.startsWith("2")) {
                Swal.fire({
                    title: "Success",
                    text: "Intern Registered Successfully",
                    timer: 2000,
                    icon: "success",
                });

                // Update the data state with the new intern
                setData((prevData) => [...prevData, inputs]);

                handleClose();
            }
        } catch (error) {
            setOpen(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response.data.message || "Failed to register Interns!",
            });
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleDetailOpen = () => {
        setDetailOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputs({
            username: "",
            fullname: "",
            email: "",
            phoneNo: "",
            role: "intern",
            BatchId: "",
        });
    };


    const handleDetailClose = () => {
        setDetailOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    React.useEffect(() => {
        const fetchBatchName = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/batchdash",
                    {
                        headers: {
                            Authorization: accesstoken,
                        },
                    }
                );

                setBatchData(response.data.data);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                });
            }
        };
        fetchBatchName();
    }, []);
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{m: 2}} style={{textAlign: "center"}}>
                Manage Intern
            </Typography>
            <Box textAlign="center" sx={{m: 4}}>
                {" "}
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    color="success"
                    startIcon={<IoMdAddCircle/>}
                >
                    Add Intern
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    sx={{m: 1}}
                    startIcon={<IoFilter/>}
                >
                    Filter Interns
                </Button>
            </Box>

            <Box textAlign="center" sx={{m: 5}}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell align="center">User Name</TableCell>
                                <TableCell align="center">Phone No</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Batch</TableCell>
                                <TableCell align="center">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...data]
                                .reverse()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        key={row?._id}
                                        sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.fullname}
                                        </TableCell>
                                        <TableCell align="center">{row?.username}</TableCell>
                                        <TableCell align="center">{row?.phoneNo}</TableCell>
                                        <TableCell align="center">{row?.email}</TableCell>
                                        <TableCell align="center">
                                            {row?.Batch?.name
                                                ? row?.Batch?.name
                                                : "Not Assign In Any Batch"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => {
                                                handleDetailOpen()
                                                fetchQualificationsDate(row._id)
                                            }}>View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add Intern</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {" "}
                        {/* Grid container */}
                        <Grid item xs={12} md={6}>
                            {" "}
                            {/* Grid item for Intern Name */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={inputs.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {" "}
                            {/* Grid item for Intern Full Name */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Fullname"
                                name="fullname"
                                autoComplete="fullname"
                                autoFocus
                                value={inputs.fullname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {" "}
                            {/* Grid item for Intern Email */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={inputs.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {" "}
                            {/* Grid item for Intern Phone Number */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNo"
                                label="Phone Number"
                                name="phoneNo"
                                autoComplete="phoneNumber"
                                autoFocus
                                value={inputs.phoneNo}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Batch Name</InputLabel>
                                <Select
                                    labelId="batch-label"
                                    label="Batch"
                                    name="BatchId"
                                    value={inputs.BatchId}
                                    onChange={handleChange}
                                >
                                    {BatchData.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.Batchname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <Box textAlign="center" sx={{m: 1}}>
                    <Button variant="contained" color="secondary" onClick={handleSubmit}>
                        Add Intern
                    </Button>
                </Box>

                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={detailOpen} onClose={handleDetailClose} fullWidth>
                <DialogContent>
                    {qualificationsData.length === 0 ?
                        <Typography variant="h5">Intern has not filled his/her qualifications yet !</Typography> :
                        qualificationsData.map(qualification => {
                            return <Box>
                                <Typography variant="h5" sx={{mb: 2}}>Qualifications
                                    of {qualification.Intern.username} </Typography>
                                <Typography variant="h6">University: {qualification.universityName}</Typography>
                                <Typography
                                    variant="h6">Graduation: {returnMonthName(qualification.graduationMonth)} of {qualification.graduationYear}</Typography>
                                <Typography variant="h6">Skill set: {qualification.skills}</Typography>

                            </Box>
                        })
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDetailClose} color="error">Close</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
