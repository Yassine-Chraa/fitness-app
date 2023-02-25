import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Tooltip } from "@mui/material";
import MDAvatar from "../../components/MDAvatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    setOpenAddProgramModalHandler,
    setOpenDeleteProgramModalHandler,
    setOpenEditProgramModalHandler,
    setOpenProgramViewHandler,
    useMaterialUIController,
} from "../../context/UIContext";

import MDButton from "../../components/MDButton";
import { async } from "regenerator-runtime";

import { useProgram } from "../../context/APIContext/providers/ProgramContextProvider";
import { Box } from "@mui/system";
import AddProgramModal from "./AddProgramModal";
import EditProgram from "./EditProgram";


export const Profile = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);

export const ActionMenu = ({ id, setSelectedID }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const { openProgramViewHandler } = controller

    const openEditHandler = () => {
        setSelectedID(() => id);
        setOpenEditProgramModalHandler(dispatch, true);
    }

    const openDeleteHandler = () => {
        setSelectedID(() => id);
        setOpenDeleteProgramModalHandler(dispatch, true);
    }

    const openViewHandler = () => {
        setSelectedID(() => id);
        setOpenProgramViewHandler(dispatch, true);
    }

    const settingMenu = () => (
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
        >
            <MDBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <IconButton
                    size="small"
                    disableRipple
                    color="success"
                    variant="outlined"
                    onClick={openViewHandler}
                    sx={{
                        padding: '7px',
                        transition: 'all 0.4s ease',
                        ":hover": {
                            color: '#fff',
                            backgroundColor: '#333',
                        }
                    }}
                >
                    <RemoveRedEyeIcon sx={{ fontWeight: 'bolder', fontSize: '24' }} />
                </IconButton>

                <IconButton
                    size="small"
                    disableRipple
                    color="warning"
                    variant="outlined"
                    onClick={openEditHandler}
                    sx={{
                        padding: '7px',
                        transition: 'all 0.4s ease',
                        ":hover": {
                            color: '#fff',
                            backgroundColor: '#333',
                        }
                    }}
                >
                    <EditIcon sx={{ fontWeight: 'bolder', fontSize: '24' }} />
                </IconButton>
                <IconButton
                    size="small"
                    disableRipple
                    color="error"
                    variant="outlined"
                    onClick={openDeleteHandler}
                    sx={{
                        padding: '7px',
                        transition: 'all 0.4s ease',
                        ":hover": {
                            color: '#fff',
                            backgroundColor: '#333',
                        }
                    }}
                >
                    <DeleteIcon sx={{ fontWeight: 'bolder', fontSize: '24' }} />
                </IconButton>
            </MDBox>
        </Menu>
    );

    return (
        <MDTypography component="a" variant="caption" color="text">
            {settingMenu()}
            <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={{
                    backgroundColor: '#ddd',
                    transition: 'all 0.4s ease-in-out',
                    ":hover": {
                        color: '#fff',
                        backgroundColor: '#333',
                    }
                }}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
            >
                <MoreVertIcon sx={{ fontWeight: 'bolder', fontSize: '24' }} />
            </IconButton>
        </MDTypography>
    );
};


export const Ball = ({ color }) => {
    return (
        <Box style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: color }}></Box>
    )
}



// -----------------------------------------------------------
const Programs = () => {
    const { getPrograms } = useProgram();
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState();
    const [controller, dispatch] = useMaterialUIController();
    const { openEditProgramModalHandler } = controller;


    const dataLabels = [
        {
            Header: "Id", accessor: "id", width: "8%",
        },
        {
            Header: "Title", accessor: "title", width: "10%",
        },
        {
            Header: "Category", isSorted: true, accessor: "category", width: "12%",
        },
        {
            Header: "State", isSorted: true, accessor: "state", width: "12%", align: "center",
        },
        {
            Header: "isFree", isSorted: true, accessor: "isfree", width: "10%", align: "center",
        },
        {
            Header: "Duration", isSorted: true, accessor: "duration", width: "10%", align: "center",
        },
        {
            Header: "actions", isSorted: true, accessor: "actions", width: "12%", align: "center",
        },
    ]

    const fetchData = async () => {
        let res = await getPrograms();
        res = res.map((program) => {
            const { id, main_img, title, description, start_time, end_time, duration, break_duration, category, isFree } = program;
            return {
                id: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        #{id}
                    </MDTypography>
                ),
                title: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {title.length > 21 ? title.slice(0, 10) + " ..." : title}
                    </MDTypography>
                ),
                category: (<MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                    {category}
                </MDTypography>),
                state: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {program.state}
                    </MDTypography>
                ),
                isfree: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {isFree ? <Ball color={"green"} /> : <Ball color={"red"} />}
                    </MDTypography>
                ), duration: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {program.duration}
                    </MDTypography>
                ),
                actions: (<ActionMenu id={id} setSelectedID={setSelectedID} />),
            };
        });
        setData(res);
    };


    useEffect(() => {
        fetchData();
    }, []);


    const openAddmodalInvoker = () => {
        setOpenAddProgramModalHandler(dispatch, true);
    }


    return (
        <DashboardLayout>
            {openEditProgramModalHandler ? <EditProgram selectedID={selectedID} /> :
                (<>
                    <AddProgramModal />

                    <MDBox>
                        <Grid container spacing={6} justifyContent={"center"}>
                            <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
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
                                            Programs Table
                                        </MDTypography>
                                        <MDBox ml={"auto"}>
                                            <Tooltip title="Filter list">
                                                <IconButton color="white">
                                                    <Icon>filter_list</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </MDBox>
                                    </MDBox>
                                    <MDBox pt={3} >
                                        <DataTable
                                            canSearch={true}
                                            table={{ columns: dataLabels, rows: data, }}
                                        />
                                        <MDBox sx={{
                                            width: '100%', display: 'flex', justifyContent: 'flex-end',
                                        }}>
                                            <Tooltip title="New Program !">
                                                <IconButton
                                                    onClick={openAddmodalInvoker}
                                                    color="secondary"
                                                    sx={{
                                                        backgroundColor: 'inherit', marginTop: '0.2rem',marginRight: "1.6rem",marginBottom: "1rem",
                                                        borderRadius: "50%", borderWidth: "1px", borderStyle: "solid", borderColor: "secondary",
                                                    }}>
                                                    <Icon>add</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </MDBox>
                                    </MDBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MDBox>
                </>)
            }

        </DashboardLayout>
    );
};

export default Programs;
