import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {Chip} from "@mui/material";

const GetStatusChip = (status) => {
    switch (status) {
        case "pending":
            return <Chip icon={<PendingIcon/>} label="Pending"/>;

        case "approved":
            return (
                <Chip
                    color="success"
                    icon={<CheckCircleOutlineIcon/>}
                    label="Approved"
                />
            );
        default:
            return <Chip label="Unknown"/>;
    }
};

export default GetStatusChip;
