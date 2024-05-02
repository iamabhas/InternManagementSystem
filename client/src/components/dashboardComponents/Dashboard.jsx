import * as React from "react";

//mui imports
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Drawer as MuiDrawer,
    Box,
    AppBar as MuiAppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Link,
    Button,
    Avatar,
    Chip,
} from "@mui/material";

//icons imports
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

//redux imports
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutReducer} from "../../redux/authSlice";

// SideBar components imports
import UserProfile from "./UserProfile";
import InternDashboard from "./InternComponents/InternDashboard";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import MentorDashboard from "./MentorComponents/MentorDashboard";
import ManageInterns from "./AdminComponents/ManageInterns";
import ManageMentors from "./AdminComponents/ManageMentors";
import BatchDetails from "./AdminComponents/BatchDetails.jsx";
import ErrorPage from "../../pages/ErrorPage";
import ManageBatch from "./AdminComponents/ManageBatch";
import ManageLeaves from "./AdminComponents/ManageLeaves.jsx";
import SendLeave from "./InternComponents/SendLeave.jsx";
import {mainListItems} from "./ListItems.jsx";
 

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="#">
                UBA-Solutions
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    //States
    const [open, setOpen] = React.useState(true);
    const [selectedComponent, setSelectedComponent] = React.useState("Dashboard");

    //Library Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Reducer Data
    const username = useSelector((state) => state.auth.userName);
    const role = useSelector((state) => state.auth.role);

    //onClick functions
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        dispatch(logoutReducer());
        navigate("/");
    };

    //Dashboard component render
    React.useEffect(() => {
        switch (role) {
            case "intern":
                setSelectedComponent("InternDashboard");
                break;
            case "admin":
                setSelectedComponent("AdminDashboard");
                break;
            case "mentor":
                setSelectedComponent("MentorDashboard");
                break;
            default:
                setSelectedComponent("Dashboard");
                break;
        }
    }, [role]);

    const renderClickedComponent = () => {
        switch (selectedComponent) {
            case "InternDashboard":
                return <InternDashboard/>;
            case "AdminDashboard":
                return <AdminDashboard/>;
            case "MentorDashboard":
                return <MentorDashboard/>;
            case "ManageBatches":
                return <ManageBatch selectComponentState={setSelectedComponent}/>;
            case "ManageInterns":
                return <ManageInterns/>;
            case "ManageMentors":
                return <ManageMentors/>;
            case "Profile":
                return <UserProfile/>;
            case "BatchDetails":
                return <BatchDetails selectComponentState={setSelectedComponent}/>;
            case "ManageLeaves":
                return <ManageLeaves/>
            case "SendLeave":
                return <SendLeave/>
            default:
                return <ErrorPage/>;
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px",
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && {display: "none"}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            Welcome to Dashboard !
                        </Typography>
                        <div>
                            <Chip
                                avatar={<Avatar>{username[0]}</Avatar>}
                                label="View Profile"
                                color="success"
                                sx={{m: 1, fontSize: "1rem"}}
                                onClick={() => {
                                    setSelectedComponent("Profile");
                                }}
                            />
                            <Button color="error" variant="contained" onClick={handleLogout}>
                                Log out
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <h2>UBA-Solutions</h2>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {mainListItems(role, setSelectedComponent)}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        {renderClickedComponent()}
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
