import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
    setOpenFormHandler,
    useMaterialUIController,
} from "../../context/UIContext";
import ExerciseForm from "./ExerciseForm";
import { Link } from "react-router-dom";
import { useExercise } from "../../context/APIContext/providers/ExerciseContextProvider";

const ActionMenu = ({ id, setType, setSelectedID }) => {
    const { deleteExercise } = useExercise();
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const openEditHandler = () => {
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
                        to={`/dashboard/exercises/${id}`}
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
                        onClick={openEditHandler}
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
                            deleteExercise(id);
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

const Exercises = () => {
    const { exercises, getExercises } = useExercise();
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState(0);
    const [type, setType] = useState("Add");
    const [controller, dispatch] = useMaterialUIController();

    const openFormInvoker = () => {
        setType("Add");
        setOpenFormHandler(dispatch, true);
    };

    const dataLabels = [
        {
            Header: "Id",
            accessor: "id",
            width: "5%",
            align: "center",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "Category",
            accessor: "category",
            align: "center",
        },
        {
            Header: "Actions",
            isSorted: false,
            accessor: "actions",
            width: "12%",
            align: "center",
        },
    ];
    const configData = () => {
        const res = exercises?.map((ele) => {
            const { id,title, category } = ele;
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
                title: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {title}
                    </MDTypography>
                ),

                category: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {category}
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
        getExercises();
    }, []);
    useEffect(() => {
        configData();
    }, [exercises]);

    return (
        <DashboardLayout>
            <ExerciseForm type={type} selectedID={selectedID} />
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
                                    Products Table
                                </MDTypography>
                                <MDBox ml={"auto"}>
                                    <Tooltip title="Filter list">
                                        <IconButton color="white">
                                            <Icon>filter_list</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </MDBox>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    canSearch={true}
                                    table={{
                                        columns: dataLabels,
                                        rows: data,
                                    }}
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
                                    <Tooltip title="Add new Product">
                                        <IconButton
                                            onClick={() => {
                                                openFormInvoker();
                                                setSelectedID(0);
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

export default Exercises;
