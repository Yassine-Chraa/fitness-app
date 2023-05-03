import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useExercise } from "../../context/APIContext/providers/ExerciseContextProvider";
const ExerciseDetails = () => {
    const { id } = useParams();
    const { getExercise } = useExercise();
    const [exercice, setExercice] = useState({});
    const fetchData = async () => {
        const data = await getExercise(id);
        console.log(data);
        setExercice(data);
    };
    const { title, img, category, description } =
        exercice;
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <MDBox>
                <Grid container spacing={3} justifyContent={"center"}>
                    <Grid item xs={12} sm={6}>
                        <MDBox
                            style={{
                                padding: "0.3rem",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img style={{ width: "100%" }} src={img} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MDBox
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <MDBox>
                                <MDTypography
                                    style={{
                                        fontSize: "2.8rem",
                                        lineHeight: 1.1,
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                >
                                    {title}
                                </MDTypography>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "300",
                                        color: "rgb(145, 69, 69)",
                                        opacity: 0.6,
                                    }}
                                >
                                    {category}
                                </MDTypography>
                            </MDBox>
                            <hr
                                style={{
                                    width: "90%",
                                    height: 2,
                                    border: "unset",
                                    backgroundColor: "#e6c0c0",
                                }}
                            />
                            <MDBox mt={4}>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                    }}
                                >
                                    Instructions
                                </MDTypography>
                                <MDTypography
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                        opacity: 0.6,
                                    }}
                                >
                                    {description}
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default ExerciseDetails;
