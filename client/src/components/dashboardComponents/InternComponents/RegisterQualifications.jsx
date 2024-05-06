import React from 'react';
import {Controller, useForm} from "react-hook-form"
import {
    Box,
    Button,
    Dialog,
    DialogTitle, TextField, Grid
} from "@mui/material";
import {FaUserGraduate} from "react-icons/fa";


const RegisterQualifications = () => {
    const [open, setOpen] = React.useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            universityName: "",
            skills: ""
        },
        mode: "onBlur",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset({
            universityName: "",
            skills: ""
        })
    };

    const onSubmit = async (data) => {
        console.log(data)
        handleClose()
    }


    return (
        <div>
            <Button variant="outlined" endIcon={<FaUserGraduate/>} onClick={handleClickOpen} color="success">Register
                Qualification</Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Qualifications</DialogTitle>
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
                                    name="universityName"
                                    control={control}
                                    rules={{required: "University Name is required"}}
                                    render={({field}) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="uniName"
                                            label="University Name"
                                            autoComplete="universityName"
                                            autoFocus
                                            error={!!errors.universityName}
                                            helperText={
                                                errors.universityName
                                                    ? errors.universityName.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="skills"
                                    control={control}
                                    rules={{required: "Skills is required"}}
                                    render={({field}) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="skills"
                                            label="Your Skills"
                                            autoComplete="skills"
                                            error={!!errors.skills}
                                            helperText={
                                                errors.skills
                                                    ? errors.skills.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!isValid}

                        >
                            Add Qualifications
                        </Button>
                    </Box>


                </Box>
            </Dialog>
        </div>
    );
};

export default RegisterQualifications;