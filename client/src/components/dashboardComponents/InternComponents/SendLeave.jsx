import React from 'react';
import {Controller, useForm} from "react-hook-form"
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField, Grid
} from "@mui/material";
import {RiMailSendLine} from "react-icons/ri";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const SendLeave = () => {
    const [open, setOpen] = React.useState(false);


    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            subject: "",
            applicationBody: "",
            leaveFromDate: "",
            leaveToDate: ""
        },
        mode: "onBlur",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset({
            subject: "",
            applicationBody: "",
            leaveFromDate: "",
            leaveToDate: ""
        })
    };

    const onSubmit = async (data) => {
        console.log(data)
    }


    return (
        <div>
            <Button variant="outlined" endIcon={<RiMailSendLine/>} onClick={handleClickOpen}>Send Leave
                Application</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Leave Application</DialogTitle>
                <Box sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Box

                        component="form" noValidate onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="subject"
                                    control={control}
                                    rules={{required: "Subject is required"}}
                                    render={({field}) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="subject"
                                            label="Subject"
                                            autoComplete="subject"
                                            autoFocus
                                            error={!!errors.subject}
                                            helperText={
                                                errors.subject
                                                    ? errors.subject.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField label="Test"></TextField>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}

                        >
                            Send Leave
                        </Button>
                    </Box>


                </Box>
            </Dialog>
        </div>
    );
};

export default SendLeave;