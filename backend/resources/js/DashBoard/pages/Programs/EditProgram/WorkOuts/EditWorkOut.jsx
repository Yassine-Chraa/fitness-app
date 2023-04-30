import { Card, Checkbox, Chip, Grid } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useEffect, useState } from "react";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDInput from "../../../../components/MDInput";
import MDTypography from "../../../../components/MDTypography";
import { useMaterialUIController } from "../../../../context/UIContext";
import { useWorkOut } from "../../../../context/APIContext/providers/WorkOutContextProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../../../context/APIContext/providers/ExerciseContextProvider";
import MDAvatar from "../../../../components/MDAvatar";

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

const EditWorkOut = () => {
    const [controller, dispatch] = useMaterialUIController();
    const { getExercises, exercises } = useExercise();
    const { updateWorkOut, getWorkOut } = useWorkOut();
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
                        <Grid
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
                        <ListOfExercises
                            exercises={exercises}
                            workOutExercises={localWorkOutExercises}
                        />
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default EditWorkOut;

const label = { inputProps: { "aria-label": "Checkbox" } };

export const ListOfExercises = ({ exercises, workOutExercises }) => {
    const [checkEvent, setCheckEvent] = useState(true);
    const checkHandler = (isChecked, index) => {
        exercises[index].checked = isChecked ? 1 : 0;
        setCheckEvent((prev) => !prev);
    };
    return (
        <Card
            sx={{
                height: 460,
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
                spacing={1}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                {exercises.map((item) => (
                    <Grid
                        px={2}
                        py={4}
                        container
                        key={item.id}
                        alignItems={"center"}
                    >
                        <MDAvatar
                            src={item.img}
                            size={50}
                            style={{ borderRadius: 4 }}
                        />
                        <div style={{marginLeft: '8px'}}>
                            <h6 style={{fontSize: 14}}>{item.title}</h6>
                            <span style={{fontSize: 12,backgroundColor: '#315',padding: '2px 4px',borderRadius: '3px',backgroundColor: 'rgb(255, 214, 92)'}}>{item.category}</span>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
};
