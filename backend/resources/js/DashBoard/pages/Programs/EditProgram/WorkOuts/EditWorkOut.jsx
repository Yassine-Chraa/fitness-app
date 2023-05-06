import { Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDInput from "../../../../components/MDInput";
import { useWorkOut } from "../../../../context/APIContext/providers/WorkOutContextProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Menu, IconButton,Tooltip,Icon } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MDTypography from "../../../../components/MDTypography";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../../../context/APIContext/providers/ExerciseContextProvider";
import { useWorkOutExercise } from "../../../../context/APIContext/providers/WorkOutExerciseContextProvider";
import DataTable from "../../../../components/DataTable";
import { useMaterialUIController } from "../../../../context/UIContext";

const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
const categories = ["all", "checked", "a", "b", "c", "d", "e", "f"];
const states = ["progress", "unstarted", "finished"];

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

const EditWorkOut = () => {
    const { getExercises, exercises } = useExercise();
    const { updateWorkOut, getWorkOut } = useWorkOut();
    const { getWorkOutExercises, workoutExercises } = useWorkOutExercise();
    const [localDay, setLocalDay] = useState(days[0]);
    const [localState, setLocalState] = useState(states[0]);
    const [localTitle, setLocalTitle] = useState("");
    const [localDuration, setLocalDuration] = useState(0);
    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localExercises, setLocalExercises] = useState([]);
    const [localSample, setLocalSample] = useState([]);
    const [localWorkOutExercises, setLocalWorkOutExercises] = useState([]);

    const days_options = () =>
        days.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));
    const states_options = () =>
        states.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));

    const { programID, workOutID } = useParams();

    const confirmEditHandler = async () => {
        let allIds = [];
        if (localExercises) {
            let checkedExercises = localExercises.filter((exe) => exe.checked);
            if (checkedExercises) {
                for (let i = 0; i < checkedExercises.length; i++) {
                    allIds[i] = checkedExercises[i].id;
                }
            }
        }

        const workout = {
            id: workOutID,
            title: localTitle,
            duration: localDuration,
            day: localDay,
            state: localState,
            program_id: programID,
            newExeIds: allIds,
        };

        const result = await updateWorkOut(workout);
        if (result) {
            if (result.exercises) {
                fetchData();
            }
        }
    };

    const fetchData = async () => {
        await getExercises();
        let workout = await getWorkOut(workOutID);
        if (workout) {
            setLocalTitle(() => workout.title);
            setLocalDuration(() => workout.duration);
            setLocalDay(() => workout.day);
            setLocalState(() => workout.state);

            console.log("==============================================");
            console.log(workout.exercises);

            const checkedExercises = workout.exercises.map((item) => {
                return { ...item, checked: 1 };
            });
            setLocalWorkOutExercises(checkedExercises);

            const allIds = workout.exercises.map((item) => item.id);

            if (exercises) {
                const all = exercises.map((item) => {
                    return {
                        ...item,
                        checked: allIds.includes(item.id) ? 1 : 0,
                    };
                });
                setLocalExercises(all);
                setLocalSample(all);
            }
        }
        await getWorkOutExercises(workOutID);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (localExercises) {
            setLocalSample(() =>
                localExercises.filter(
                    (item) =>
                        item.category == localCategory || localCategory == "all"
                )
            );
            if (localCategory == "checked") {
                setLocalSample(() =>
                    localExercises.filter((item) => item.checked == 1)
                );
            }
        }
    }, [localCategory]);

    return (
        <DashboardLayout>
            <MDBox>
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    mx={1}
                    mb={1}
                >
                    <MDButton
                        onClick={confirmEditHandler}
                        color="secondary"
                        variant="outlined"
                    >
                        Save
                    </MDButton>
                    <Link to={`/dashboard/programs/${programID}`}>
                        <MDButton color="secondary" variant="outlined">
                            Back
                        </MDButton>
                    </Link>
                </MDBox>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <MDBox style={{ margin: "1rem 0.3rem" }}>
                            <MDBox>
                                <FormControl fullWidth>
                                    <InputLabel id="select-role-label">
                                        Select State
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={localState}
                                        label="Select State"
                                        onChange={(event) =>
                                            setLocalState(event.target.value)
                                        }
                                        sx={{ padding: "0.75rem !important" }}
                                    >
                                        {states_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox mt={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender-label">
                                        Select Day
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={localDay}
                                        label="Select Category"
                                        onChange={(event) =>
                                            setLocalDay(event.target.value)
                                        }
                                        sx={{ padding: "0.75rem !important" }}
                                    >
                                        {days_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </MDBox>
                        <MDBox
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                margin: "1rem 0.3rem",
                            }}
                        >
                            <MDBox>
                                <MDInput
                                    value={localTitle}
                                    onChange={(val) =>
                                        setLocalTitle(val.target.value)
                                    }
                                    type="text"
                                    label="Title"
                                />
                            </MDBox>
                            <MDBox mt={2}>
                                <MDInput
                                    value={localDuration}
                                    onChange={(val) =>
                                        setLocalDuration(val.target.value)
                                    }
                                    type="number"
                                    label="Duration"
                                />
                            </MDBox>
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {/*<Grid
                            container
                            spacing={1}
                            my={1}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {categories.map((item) => (
                                <Grid item key={item}>
                                    <MDButton
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => setLocalCategory(item)}
                                    >
                                        {item}
                                    </MDButton>
                                </Grid>
                            ))}
                        </Grid>
                         */}
                        <ListOfExercises
                            exercises={exercises}
                            workoutExercises={workoutExercises}
                        />
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default EditWorkOut;

const label = { inputProps: { "aria-label": "Checkbox" } };

export const ListOfExercises = ({ workoutExercises }) => {
    const [selectedID, setSelectedID] = useState(0);
    const [type, setType] = useState("Add");
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

    const data = workoutExercises?.map((ele) => {
        const { id, title, category } = ele.details;
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
    return (
        <Card
            sx={{
                overflowX: "hidden",
                overflowY: "scroll",
                padding: "0.3rem",
                boxShadow: "#000 1px 1px 5px",
                borderRadius: "0.5rem",
                flexWrap: "wrap",
            }}
        >
            <Grid
                container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
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
                            }}
                            color="black"
                            sx={{ backgroundColor: "#ddd" }}
                        >
                            <Icon>add</Icon>
                        </IconButton>
                    </Tooltip>
                </MDBox>
            </Grid>
        </Card>
    );
};
