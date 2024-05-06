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
            skills: "",
            graduationMonth: "",
            graduationYear: "",
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
            skills: "",
            graduationMonth: "",
            graduationYear: "",

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
                        <Grid container spacing={2} sx={{p: 2}}>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="graduationMonth"
                                    control={control}
                                    rules={{
                                        required: "Graduation Month is required", pattern: {
                                            value: /^(1[0-2]|[1-9])$/,
                                            message: "Graduation month should be a valid month"
                                        }
                                    }}
                                    render={({field}) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="number"
                                            id="graduationMonth"
                                            label="Graduation Month"
                                            autoComplete="graduationMonth"
                                            error={!!errors.graduationMonth}
                                            helperText={
                                                errors.graduationMonth
                                                    ? errors.graduationMonth.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="graduationYear"
                                    control={control}
                                    rules={{
                                        required: "Graduation Year is required", pattern: {
                                            value: /^\d{4}$/,
                                            message: "Graduation year should be a valid year"
                                        }
                                    }}
                                    render={({field}) => (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="graduationYear"
                                            label="Graduation Year"
                                            type="number"
                                            autoComplete="graduationYear"
                                            error={!!errors.graduationYear}
                                            helperText={
                                                errors.graduationYear
                                                    ? errors.graduationYear.message
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
                            variant="contained"
                            sx={{m: 2}}
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