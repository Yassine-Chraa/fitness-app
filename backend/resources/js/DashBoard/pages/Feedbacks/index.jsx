import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import MDTypography from "../../components/MDTypography";
import { useProduct } from "../../context/APIContext/providers/ProductContextProvider";
import MDBox from "../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Tooltip } from "@mui/material";
import { useFeedback } from "../../context/APIContext/providers/FeedbackContextControler";
import Profile from "../../components/DataTable/TableProfile";
import FeedbackContentModal from "./FeedbackContentModal";
import { setOpenFormHandler, useMaterialUIController } from "../../context/UIContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ActionMenu = ({ id, setSelectedID }) => {
    const { deleteFeedback } = useFeedback();
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const viewMessage = () => {
        setSelectedID(id);
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
                    <IconButton
                        onClick={viewMessage}
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
                    <IconButton
                        size="small"
                        disableRipple
                        color="error"
                        variant="outlined"
                        onClick={() => {
                            setOpenMenu(false);
                            deleteFeedback(id);
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

const Feedbacks = () => {
    const { feedbacks, getFeedbacks } = useFeedback();
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState(0);
    const configData = () => {
        const res = feedbacks?.map((ele) => {
            const { id, message, user } = ele;
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
                    <Profile
                        name={user.name}
                        subtitle={user.email}
                        image={"https://bit.ly/34BY10g"}
                    />
                ),
                email: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {user.email}
                    </MDTypography>
                ),
                message: (
                    <MDTypography
                        component="p"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {message.substr(0, 100)}
                    </MDTypography>
                ),
                actions: <ActionMenu id={id} setSelectedID={setSelectedID} />,
            };
        });
        setData(res);
    };

    useEffect(() => {
        getFeedbacks();
    }, []);
    useEffect(() => {
        configData();
    }, [feedbacks]);

    return (
        <DashboardLayout>
            <FeedbackContentModal selectedID={selectedID} />
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
                                    Feedbacks Table
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
                                        columns: [
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                width: "12%",
                                            },
                                            {
                                                Header: "Profile",
                                                accessor: "profile",
                                            },
                                            {
                                                Header: "Email",
                                                accessor: "email",
                                            },
                                            {
                                                Header: "Message",
                                                accessor: "message",
                                                width: "40%",
                                            },
                                            {
                                                Header: "Actions",
                                                isSorted: false,
                                                accessor: "actions",
                                                width: "12%",
                                                align: "center",
                                            },
                                        ],
                                        rows: data,
                                    }}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Feedbacks;
