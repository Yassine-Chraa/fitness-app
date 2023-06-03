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
import { IconButton, Tooltip, Icon } from "@mui/material";
import MDTypography from "../../../../components/MDTypography";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../../../context/APIContext/providers/ExerciseContextProvider";
import { useWorkOutExercise } from "../../../../context/APIContext/providers/WorkOutExerciseContextProvider";
import DataTable from "../../../../components/DataTable";
import {
    setOpenFormHandler,
    useMaterialUIController,
} from "../../../../context/UIContext";
import AddExercisesForm from "./AddExercisesForm";

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
const states = ["unstarted", "progress", "finished"];

const EditWorkOut = () => {
    const { updateWorkOut, getWorkOut } = useWorkOut();
    const { getWorkOutExercises, workoutExercises } = useWorkOutExercise();
    const [localDay, setLocalDay] = useState(days[0]);
    const [localState, setLocalState] = useState(states[0]);
    const [localTitle, setLocalTitle] = useState("");
    const [localDuration, setLocalDuration] = useState(0);
    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localExercises, setLocalExercises] = useState([]);
    const [localSample, setLocalSample] = useState([]);

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

        const workout = {
            id: workOutID,
            title: localTitle,
            duration: localDuration,
            day: localDay,
            state: localState,
            program_id: programID,
        };

        const result = await updateWorkOut(workout);
        if (result) {
            if (result.exercises) {
                fetchData();
            }
        }
    };

    const fetchData = async () => {
        let workout = await getWorkOut(workOutID);
        if (workout) {
            setLocalTitle(() => workout.title);
            setLocalDuration(() => workout.duration);
            setLocalDay(() => workout.day);
            setLocalState(() => workout.state);

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
                        <ListOfExercises
                            workoutId={workOutID}
                            workoutExercises={workoutExercises}
                        />
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default EditWorkOut;

export const ListOfExercises = ({ workoutId, workoutExercises }) => {
    const [type, setType] = useState("Add");
    const [controller, dispatch] = useMaterialUIController();
    const openFormInvoker = () => {
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
                    canSearch={false}
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
            <AddExercisesForm workoutId={workoutId} />
        </Card>
    );
};
