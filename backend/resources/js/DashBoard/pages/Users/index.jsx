import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataTable from "../../components/DataTable";
import MDTypography from "../../components/MDTypography";
import { useUser } from "../../context/APIContext/providers/UserContextProvider";
import MDBox from "../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Tooltip } from "@mui/material";
import MDAvatar from "../../components/MDAvatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserModal from "./EditModal";
import DeleteUserModal from "./DeleteUserModal";
import AddUserModal from "./AddUserModal";
import { useMaterialUIController, setOpenEditModalHandler, setOpenAddModalHandler, setOpenDeleteModalHandler } from "../../context/UIContext";
import MDButton from "../../components/MDButton";
import { async } from "regenerator-runtime";


export const Profile = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);

export const Location = ({ country, city }) => (
    <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">{country}</MDTypography>
        <MDTypography variant="caption">{city}</MDTypography>
    </MDBox>
);

export const ActionMenu = ({ id, setSelectedID }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const openEditHandler = () => {
        setSelectedID(() => id);
        setOpenEditModalHandler(dispatch, true);
    }

    const openDeleteHandler = () => {
        setSelectedID(() => id);
        setOpenDeleteModalHandler(dispatch, true);
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
                    onClick={() => console.log('view')}
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






const Users = () => {
    const { getUsers } = useUser();
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState();
    const [controller, dispatch] = useMaterialUIController();


    const dataLabels = [
        {
            Header: "Profile", accessor: "profile", width: "12%",
        },
        {
            Header: "Id", accessor: "id", width: "8%",
        },
        {
            Header: "Role", accessor: "role", width: "10%",
        },
        {
            Header: "Location", isSorted: true, accessor: "location", width: "12%",
        },
        {
            Header: "Gender", isSorted: true, accessor: "gender", width: "12%", align: "center",
        },
        {
            Header: "Score", isSorted: true, accessor: "score", width: "12%", align: "center",
        },
        {
            Header: "Level", isSorted: true, accessor: "work_out_level", width: "10%", align: "center",
        },
        {
            Header: "Actions", isSorted: true, accessor: "actions", width: "12%", align: "center",
        },
    ]

    const fetchData = async () => {
        let res = await getUsers();
        res = res.map((user) => {
            const { id, name, email, role, country, city, gender, score, work_out_level } = user;
            return {
                profile: <Profile name={name} email={email} image={'https://bit.ly/34BY10g'} />,
                id: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {id}
                    </MDTypography>
                ),
                role: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {role}
                    </MDTypography>
                ),
                location: <Location country={country} city={city} />,
                gender: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {gender}
                    </MDTypography>
                ),
                score: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {score}
                    </MDTypography>
                ),
                work_out_level: (
                    <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                        {work_out_level}
                    </MDTypography>
                ),
                actions: (<ActionMenu id={id} setSelectedID={setSelectedID} />),
            };
        });
        setData(res);
        console.log(res)
    };


    useEffect(() => {
        fetchData();
    }, []);

    const openAddmodalInvoker = () => {
        setOpenAddModalHandler(dispatch, true);
    }

    return (
        <DashboardLayout>

            {selectedID ? <EditUserModal selectedID={selectedID} /> : ''}
            {selectedID ? <DeleteUserModal selectedID={selectedID} /> : ''}
            <AddUserModal />

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
                                <MDBox sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '1rem', marginBottom: '1rem' }}>
                                    <Tooltip title="Add new User">
                                        <IconButton onClick={openAddmodalInvoker} color="black" sx={{ backgroundColor: '#ddd' }}>
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
