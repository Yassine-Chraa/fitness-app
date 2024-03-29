import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import MDTypography from "../../components/MDTypography";
import { useUser } from "../../context/APIContext/providers/UserContextProvider";
import MDBox from "../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    useMaterialUIController,
    setOpenFormHandler,
} from "../../context/UIContext";
import { Link } from "react-router-dom";
import UserForm from "./UserForm.jsx";
import Profile from "../../components/DataTable/TableProfile";

export const ActionMenu = ({ id, setType, setSelectedID }) => {
    const { deleteUser } = useUser();
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const openFormHandler = () => {
        setSelectedID(id);
        setType("Edit");
        setOpenMenu(false);
        setOpenFormHandler(dispatch, true);
    };

    const settingMenu = () => {
        return (
            <Menu
                anchorEl={openMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
            >
                <MDBox
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Link
                        onClick={(e) => (!id ? e.preventDefault() : null)}
                        to={`/dashboard/users/${id}`}
                    >
                        <IconButton
                            size="small"
                            disableRipple
                            color="success"
                            variant="outlined"
                            sx={{
                                padding: "7px",
                                transition: "all 0.4s ease",
                                ":hover": {
                                    color: "#fff",
                                    backgroundColor: "#333",
                                },
                            }}
                        >
                            <RemoveRedEyeIcon
                                sx={{ fontWeight: "bolder", fontSize: "24" }}
                            />
                        </IconButton>
                    </Link>

                    <IconButton
                        size="small"
                        disableRipple
                        color="warning"
                        variant="outlined"
                        onClick={openFormHandler}
                        sx={{
                            padding: "7px",
                            transition: "all 0.4s ease",
                            ":hover": {
                                color: "#fff",
                                backgroundColor: "#333",
                            },
                        }}
                    >
                        <EditIcon
                            sx={{ fontWeight: "bolder", fontSize: "24" }}
                        />
                    </IconButton>
                    <IconButton
                        size="small"
                        disableRipple
                        color="error"
                        variant="outlined"
                        onClick={() => {
                            setOpenMenu(false);
                            deleteUser(id);
                        }}
                        sx={{
                            padding: "7px",
                            transition: "all 0.4s ease",
                            ":hover": {
                                color: "#fff",
                                backgroundColor: "#333",
                            },
                        }}
                    >
                        <DeleteIcon
                            sx={{ fontWeight: "bolder", fontSize: "24" }}
                        />
                    </IconButton>
                </MDBox>
            </Menu>
        );
    };

    return (
        <div>
            {settingMenu()}
            <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={{
                    backgroundColor: "#ddd",
                    transition: "all 0.4s ease-in-out",
                    ":hover": {
                        color: "#fff",
                        backgroundColor: "#333",
                    },
                }}
                aria-haspopup="false"
                variant="contained"
                onClick={handleOpenMenu}
            >
                <MoreVertIcon sx={{ fontWeight: "bolder", fontSize: "24" }} />
            </IconButton>
        </div>
    );
};

// -----------------------------------------------------------
const Users = () => {
    const { users, getUsers } = useUser();
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState(0);
    const [type, setType] = useState("Add");
    const [controller, dispatch] = useMaterialUIController();

    const dataLabels = [
        {
            Header: "Id",
            accessor: "id",
            width: "8%",
        },
        {
            Header: "Profile",
            accessor: "profile",
            width: "12%",
        },
        {
            Header: "Role",
            accessor: "role",
            width: "10%",
        },
        {
            Header: "Gender",
            isSorted: true,
            accessor: "gender",
            width: "12%",
            align: "center",
        },
        {
            Header: "Level",
            isSorted: true,
            accessor: "workout_level",
            width: "10%",
            align: "center",
        },
        {
            Header: "Top Goal",
            isSorted: true,
            accessor: "top_goal",
            width: "10%",
            align: "center",
        },
        {
            Header: "Actions",
            isSorted: true,
            accessor: "actions",
            width: "6%",
            align: "center",
        },
    ];

    const openFormInvoker = () => {
        setType("Add");
        setOpenFormHandler(dispatch, true);
    };

    const configData = () => {
        const res = users?.map((user) => {
            const {
                id,
                name,
                email,
                role,
                profile,
                gender,
                workout_level,
                top_goal,
            } = user;
            return {
                id: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {id}
                    </MDTypography>
                ),
                profile: (
                    <Profile name={name} subtitle={email} image={profile} />
                ),

                role: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {role}
                    </MDTypography>
                ),
                gender: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {gender}
                    </MDTypography>
                ),
                workout_level: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {workout_level}
                    </MDTypography>
                ),
                top_goal: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {top_goal}
                    </MDTypography>
                ),
                actions: (
                    <ActionMenu
                        id={id}
                        setType={setType}
                        setSelectedID={setSelectedID}
                    />
                ),
            };
        });
        setData(res);
    };
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        configData();
    }, [users]);

    return (
        <DashboardLayout>
            <UserForm type={type} selectedID={selectedID} />
            <MDBox>
                <Grid container spacing={6} justifyContent={"center"}>
                    <Grid item lg={12}>
                        <Card>
                            <MDBox
                                display={"flex"}
                                alignItems={"center"}
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Users Table
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2}>
                                <DataTable
                                    canSearch={false}
                                    table={{ columns: dataLabels, rows: data }}
                                    entriesPerPage={{defaultValue:4}}

                                />
                                <MDBox
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        marginLeft: "1rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <Tooltip title="Add new User">
                                        <IconButton
                                            onClick={() => {
                                                setSelectedID(0);
                                                openFormInvoker();
                                            }}
                                            color="black"
                                            sx={{ backgroundColor: "#ddd" }}
                                        >
                                            <Icon>add</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Users;
