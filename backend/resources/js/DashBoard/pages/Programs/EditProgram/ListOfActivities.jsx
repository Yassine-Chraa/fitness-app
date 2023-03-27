import React, { useEffect, useRef, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from "../../../components/MDBox";
import { Card, Grid, Icon, IconButton, Menu, Pagination, Tooltip } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import { useWorkOut } from "../../../context/APIContext/providers/WorkOutContextProvider";
import { Stack } from "@mui/system";
import AddWorkOutModal from "./WorkOuts/AddWorkOut";
import EditWorkOutModal from "./WorkOuts/EditWorkOut";
import { setOpenAddWorkOutModalHandler, useMaterialUIController } from "../../../context/UIContext";
import { Link, useParams } from "react-router-dom";
import { useProgram } from "../../../context/APIContext/providers/ProgramContextProvider";

const ListOfActivities = (ProID) => {
    const [totalPages, setTotalPages] = useState(0);
    const [sampleOfData, setSampleOfData] = useState([]);
    const [search, setSearch] = useState("");
    const [controller, dispatch] = useMaterialUIController();
    const { openEditProgramModalHandler } = controller;
    const [workouts, setWorkouts] = useState([]);
    const { getProgram } = useProgram();
    const [workoutID, setWorkoutID] = useState(0);

    const openAddmodalInvoker = () => {
        setOpenAddWorkOutModalHandler(dispatch, true);
    }

    const { programID } = useParams()

    const fetchData = async () => {
        let program = await getProgram(programID);
        if (program) {
            let workouts = program.workouts;
            console.log(workouts)
            if (workouts) {
                setWorkouts(workouts);
                setTotalPages(() => Math.ceil(workouts.length / 10));
                setSampleOfData(workouts.slice(0, 10));
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchEventHandler = (hint) => {
        hint = hint.trim()
        if (hint != "") {
            hint = hint.toLowerCase().replace(/\(|\)|\[|\]|\*/g, '');
            console.log(hint)
            const filteredItems = workouts.filter((item) => {
                return item.title.toLowerCase().match(hint) != null;
            })

            setSampleOfData(() => filteredItems);
        } else {
            setSampleOfData(workouts.slice(0, 10))
        }
    }

    return (
        <>
            {ProID ? <AddWorkOutModal ProgramID={ProID} /> : null}
            {workoutID ? <EditWorkOutModal ProgramID={ProID} workOutID={workoutID} /> : null}

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card style={{ padding: '1rem' }}>
                    <MDBox style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <MDBox>
                            <MDTypography style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                lineHeight: '1.25',
                                margin: "0.1rem auto",
                                marginBottom: "0.3rem",
                                textTransform: "uppercase",
                            }}>
                                WorkOuts
                            </MDTypography>
                            <MDTypography component={'span'} variant="button" color="text" fontWeight="light">
                                all Workouts of the current program
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    onChange={(event) => searchEventHandler(event.target.value)}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </MDBox>
                    </MDBox>
                    <MDBox>

                        {
                            sampleOfData.map((workout) => (
                                <WorkOutItem key={workout.id} workout={workout} setWorkoutID={setWorkoutID} selectedID={ProID} />
                            ))
                        }

                        <MDBox sx={{
                            width: '100%', display: 'flex', justifyContent: 'space-between',
                            marginBottom: '0.3rem', marginTop: "1rem",
                        }}>
                            <MDBox >
                                <Stack spacing={2}>
                                    <Pagination
                                        onChange={(event, page) => setSampleOfData(() => workouts.slice((page - 1) * 10, page * 10))}
                                        count={totalPages} variant="outlined" color="primary" />
                                </Stack>
                            </MDBox>
                            <Tooltip title="New WorkOut !">
                                <IconButton
                                    onClick={openAddmodalInvoker}
                                    color="secondary"
                                    sx={{
                                        backgroundColor: 'inherit',
                                        borderRadius: "50%", borderWidth: "1px", borderStyle: "solid", borderColor: "secondary",
                                    }}>
                                    <Icon>add</Icon>
                                </IconButton>
                            </Tooltip>
                        </MDBox>
                    </MDBox>
                </Card>
            </Grid>
        </>
    );
};


export default ListOfActivities;


//==================================================================================================


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderWidth: "1px", borderStyle: "solid", borderColor: "primary",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    boxShadow: `0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)`,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(0.6em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


//==================================================================================================


export const WorkOutItem = ({ workout, ProID, setWorkoutID }) => {

    const title = workout.title;

    if (workout.title.split(" ").length > 1) {
        const title = workout.title.split(" ")[0]
            + " " + workout.title.split(" ")[1]
    }

    return (
        <MDBox style={{
            display: 'flex', justifyContent: "space-between", alignItems: "center",
            flexDirection: "row", borderRadius: "6px", borderWidth: "1px", borderStyle: "solid", borderColor: "primary",
            padding: "0.4rem", marginTop: "1rem",
        }}>
            <MDBox style={{
                width: "74px", height: "74px",
                display: 'flex', justifyContent: "center", alignItems: "center",
                flexDirection: "column",
                borderRadius: "6px", borderWidth: "1px", borderStyle: "solid", borderColor: "primary",
            }}>
                <MDTypography component={'span'} style={{
                    fontSize: '1.6rem', fontWeight: '700', lineHeight: '1.25', margin: "0.2rem auto",
                    marginBottom: "0.2rem", textTransform: "uppercase",
                }}>
                    {workout.id}
                </MDTypography>
                <MDTypography component={'span'} style={{
                    fontSize: '0.6rem', fontWeight: '600', lineHeight: '1.25', margin: "0.1rem auto",
                    marginBottom: "0.3rem", textTransform: "uppercase",
                }}>
                    {workout.day.slice(0, 3)}
                </MDTypography>
            </MDBox>
            <MDBox>
                <MDBox style={{
                    flex: 1, display: 'flex', justifyContent: "space-between", alignItems: "flex-start",
                    flexDirection: "column",
                }}>
                    <MDTypography component={'span'} style={{
                        fontSize: '1rem', fontWeight: '600', lineHeight: '1.25', margin: "0.1rem",
                        marginBottom: "0.1rem",
                    }}>
                        {title}
                    </MDTypography>
                    <MDTypography component={'span'} variant="button" color="text" fontWeight="light">
                        {workout.duration}
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox>
                <MDBox style={{
                    flex: 1, display: 'flex', justifyContent: "center", alignItems: "center",
                    flexDirection: "row",
                }}>
                    <DirectionsRunIcon sx={{ marginRight: "0.4rem", }} />
                    <MDTypography component={'span'} variant="button" color="text" fontWeight="light">
                        {workout.state}
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox>
                <ActionMenu WorkOutID={workout.id} ProID={1} setWorkoutID={setWorkoutID} />
            </MDBox>
        </MDBox>
    );
};


//==================================================================================================


export const ActionMenu = ({ WorkOutID, ProID, setWorkoutID }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const [controller, dispatch] = useMaterialUIController();

    const openEditHandler = () => {
        setWorkoutID(() => WorkOutID);
    }

    const openDeleteHandler = () => {
        setWorkoutID(() => WorkOutID);
        setOpenDeleteWorkOutModalHandler(dispatch, true);
    }

    const openViewHandler = () => {
        setWorkoutID(() => WorkOutID);
        setOpenWorkOutViewHandler(dispatch, true);
    }

    const settingMenu = () => (
        <Menu
            anchorEl={openMenu} anchorReference={null}
            anchorOrigin={{
                vertical: "bottom", horizontal: "left",
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
        >
            <MDBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                <Link
                    onClick={(e) => (!WorkOutID ? e.preventDefault() : null)}
                    to={`/dashboard/programs/${ProID}/workout/${WorkOutID}`}
                >
                    <IconButton
                        size="small" disableRipple color="warning" variant="outlined"
                        onClick={openEditHandler}
                        sx={{
                            padding: '7px', transition: 'all 0.4s ease',
                            ":hover": {
                                color: '#eee', backgroundColor: '#333',
                            }
                        }}
                    >
                        <EditIcon sx={{ fontWeight: 'bolder', fontSize: '24' }} />
                    </IconButton>
                </Link>


                <IconButton
                    size="small" disableRipple color="error" variant="outlined"
                    onClick={openDeleteHandler}
                    sx={{
                        padding: '7px', transition: 'all 0.4s ease',
                        ":hover": {
                            color: '#eee', backgroundColor: '#333',
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
                color="secondary"
                sx={{
                    borderRadius: "50%", boxShadow: "#0004 0.2px 0.2px 3px",
                    backgroundColor: 'inherit', transition: 'all 0.4s ease-in-out',
                    ":hover": {
                        boxShadow: "#0008 0.4px 0.4px 4px"
                    }
                }}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
            >
                <MoreVertIcon fontWeight={"large"} style={{ fontSize: "1rem" }} />
            </IconButton>
        </MDTypography>
    );
};
