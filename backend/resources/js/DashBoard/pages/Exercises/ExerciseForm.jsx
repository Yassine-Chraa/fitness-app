import { Card, Grid, MenuList, Modal, Paper } from "@mui/material";
import React, { useEffect, productef, useState, useRef } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import MDTypography from "../../components/MDTypography";
import {
    useMaterialUIController,
    setOpenFormHandler,
} from "../../context/UIContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCategory } from "../../context/APIContext/providers/CategoryContextProvider";
import { useExercise } from "../../context/APIContext/providers/ExerciseContextProvider";

const imgRegex = /image\/(png|jpg|JPG|jpeg|JPEG|jfif|webp)$/i;
const categories = [
    "Triceps",
    "Chest",
    "Shoulder",
    "Biceps",
    "Core",
    "Back",
    "Forearms",
    "Upper Legs",
    "Glutes",
    "Calves",
    "Cardio",
];

const ExerciseForm = ({ type, selectedID }) => {
    const { getExercise, addExercise, updateExercise } = useExercise();
    const { getCategories } = useCategory();
    const [controller, dispatch] = useMaterialUIController();
    const { openFormHandler } = controller;
    const [imageFile, setImageFile] = useState("");
    const ImageRef = useRef();

    const [exercice, setExercice] = useState({});

    const fetchData = async () => {
        await getCategories();
        if (selectedID != 0)
            getExercise(selectedID).then((res) => setExercice(res));
        else
            setExercice({
                title: "",
                img: "https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png",
                description: "",
                api_id: "",
                category: "",
            });
    };
    useEffect(() => {
        fetchData();
    }, [selectedID]);

    const uploadImage = (event) => {
        var file = event.target.files[0];
        if (!file.type.match(imgRegex)) {
            alert("image format is not valid !!");
            return;
        }
        setImageFile(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            const { result } = e.target;
            setExercice((prev) => {
                return {
                    ...prev,
                    img: result,
                };
            });
        };
    };

    const confirm = async () => {
        try {
            const result =
                type == "Add"
                    ? await addExercise(exercice, imageFile)
                    : await updateExercise(selectedID, exercice, imageFile);
            if (result) {
                setOpenFormHandler(dispatch, false);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const cancel = () => {
        setOpenFormHandler(dispatch, false);
    };

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
                    padding: 2,
                    width: "80%",
                    borderRadius: "10px",
                    boxShadow: "#000e 1px 1px 10px",
                    // overflowY: 'scroll'
                }}
            >
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-5}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" mx={1}>
                        {type} Exercice
                    </MDTypography>
                </MDBox>
                <MDBox mb={3}>
                    <MDBox
                        component="form"
                        role="form"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <MDAvatar
                            variant="gradient"
                            src={exercice.img}
                            size="xl"
                            style={{ cursor: "pointer" }}
                        />
                        <MDButton
                            onClick={() => ImageRef.current.click()}
                            variant="gradient"
                            color="info"
                            style={{
                                minWidth: "9rem",
                                maxWidth: "12rem",
                                marginTop: 4,
                                flex: 1,
                            }}
                        >
                            Upload Image
                            <input
                                ref={ImageRef}
                                onChange={uploadImage}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </MDButton>
                    </MDBox>
                </MDBox>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <MDInput
                            value={exercice.title}
                            onChange={(e) =>
                                setExercice((prev) => {
                                    return {
                                        ...prev,
                                        title: e.target.value,
                                    };
                                })
                            }
                            type="text"
                            label="Name"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-role-label">
                                Select Category
                            </InputLabel>
                            <Select
                                variant="outlined"
                                label="Select Category"
                                value={exercice.category}
                                onChange={(e) =>
                                    setExercice((prev) => {
                                        return {
                                            ...prev,
                                            category: e.target.value,
                                        };
                                    })
                                }
                                sx={{
                                    padding: "0.75rem !important",
                                }}
                            >
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <MDInput
                            value={exercice.api_id}
                            onChange={(e) =>
                                setExercice((prev) => {
                                    return {
                                        ...prev,
                                        api_id: e.target.value,
                                    };
                                })
                            }
                            type="text"
                            label="API ID"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MDInput
                            value={exercice.description}
                            onChange={(e) =>
                                setExercice((prev) => {
                                    return {
                                        ...prev,
                                        description: e.target.value,
                                    };
                                })
                            }
                            multiline
                            rows={4}
                            label="Description"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
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

export default ExerciseForm;
