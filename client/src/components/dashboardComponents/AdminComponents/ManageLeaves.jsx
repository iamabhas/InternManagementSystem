import React from 'react';
import {Button} from "@mui/material";
import {VscFilePdf} from "react-icons/vsc";

const ManageLeaves = () => {

    return (
        <>
            <main>
                <Button variant="outlined" color="error" startIcon={<VscFilePdf style={{fontSize: "1.5rem"}}/>}>Download
                    as pdf</Button>
            </main>
        </>
    );
};

export default ManageLeaves;