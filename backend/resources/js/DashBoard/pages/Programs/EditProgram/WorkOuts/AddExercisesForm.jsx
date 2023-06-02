import { Card, Checkbox, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDTypography from "../../../../components/MDTypography";
import { useExercise } from "../../../../context/APIContext/providers/ExerciseContextProvider";
import DataTable from "../../../../components/DataTable";
import { setOpenFormHandler, useMaterialUIController } from "../../../../context/UIContext";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";
import { useWorkOutExercise } from "../../../../context/APIContext/providers/WorkOutExerciseContextProvider";

const AddExercisesForm = ({workoutId}) => {
    const { exercises, getExercises } = useExercise();
    const {addExerciseToWorkout,getWorkOutExercises} = useWorkOutExercise()
    const [controller, dispatch] = useMaterialUIController();

    const [checked, setChecked] = useState([]);
    const { openFormHandler } = controller;

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

    const data = exercises?.map((ele) => {
        const { id, title, category } = ele;
        if (checked.length > 0) {
            const isChecked = checked?.find((ele) => ele.id == id).isChecked;
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
                    <Checkbox
                        value={isChecked}
                        onChange={(v) =>
                            setChecked((prev) => {
                                const i = prev.findIndex((ele) => ele.id == id);
                                const tmp = prev;
                                tmp[i] = {
                                    ...tmp[i],
                                    isChecked: !tmp[i].isChecked,
                                };
                                return tmp;
                            })
                        }
                    />
                ),
            };
        } else {
            return {};
        }
    });

    const confirm = async () => {
        checked.forEach(async (ele)=>{
            if(ele.isChecked){
                await addExerciseToWorkout(workoutId,ele.id)
            }
        })
        setOpenFormHandler(dispatch, false);
        await getWorkOutExercises(workoutId);
    };
    const cancel = () => {
        setOpenFormHandler(dispatch, false);
    };
    useEffect(() => {
        getExercises();
        const tmp = exercises?.map((ele) => {
            return { id: ele.id, isChecked: false };
        });
        setChecked(tmp);
    }, []);
    useEffect(() => {
        const tmp = exercises?.map((ele) => {
            return { id: ele.id, isChecked: false };
        });
        setChecked(tmp);
    }, [exercises]);
    return (
        <Modal
            open={openFormHandler}
            onClose={cancel}
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
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
                </Grid>
                <MDBox
                    display="flex"
                    justifyContent="space-around"
                    mx={2}
                    mt={2}
                >
                    <MDButton
                        onClick={cancel}
                        variant="gradient"
                        color="warning"
                        style={{
                            padding: "2px",
                            minWidth: "6rem",
                            maxWidth: "8rem",
                            flex: 1,
                        }}
                    >
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={confirm}
                        variant="gradient"
                        color="success"
                        style={{
                            padding: "2px",
                            minWidth: "6rem",
                            maxWidth: "8rem",
                            flex: 1,
                        }}
                    >
                        Done
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    );
};
export default AddExercisesForm;
