import { Card, Grid, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { useUser } from "../../context/APIContext/providers/UserContextProvider";

const imgRegex = /image\/(png|jpg|JPG|jpeg|JPEG|jfif)$/i;
const roles = ["admin", "user", "client", "vip", "coach"];
const genders = ["male", "female"];
const workout_levels = ["beginner", "intermediate", "advanced"];
const top_goals = ["maintaining", "bulking", "cutting"];

const UserForm = ({ type, selectedID }) => {
    const { getUser, updateUser } = useUser();
    const [controller, dispatch] = useMaterialUIController();
    const { openFormHandler } = controller;
    const [imageFile, setImageFile] = useState("");
    const { addUser } = useUser();
    const ImageRef = useRef();

    const [user, setUser] = useState({});

    const fetchData = async () => {

        if (selectedID != 0)
            await getUser(selectedID).then((res) => setUser(res));
        else {
            setUser({
                id: 0,
                profile: "",
                name: "",
                email: "",
                password: "fitnessapp",
                password_confirmation: "fitnessapp",
                role: "user",
                gender: "male",
                workout_level: "beginner",
                top_goal: "bulking",
                height: 1.75,
                weight: 70,
                birth_date: "",
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, [selectedID]);

    const roles_options = () =>
        roles.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));
    const genders_options = () =>
        genders.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));
    const workout_levels_options = () =>
        workout_levels.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));
    const top_goals_options = () =>
        top_goals.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));

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
            setUser((prev) => {
                return {
                    ...prev,
                    profile: result,
                };
            });
        };
    };

    const confirm = async () => {
        const result =
            type == "Add"
                ? await addUser(user, imageFile)
                : await updateUser(selectedID, user, imageFile);

        if (result) {
            setOpenFormHandler(dispatch, false);
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
                        {type} User
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
                            src={user.profile}
                            size="xl"
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
                                type="file"
                            />
                        </MDButton>
                    </MDBox>
                </MDBox>
                <Grid container spacing={2}>
                    <Grid container item xs={6} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MDInput
                                value={user.height}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            height: e.target.value,
                                        };
                                    })
                                }
                                type="number"
                                label="Height"
                                variant="filled"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MDInput
                                value={user.weight}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            weight: e.target.value,
                                        };
                                    })
                                }
                                type="number"
                                label="Weight"
                                variant="filled"
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MDInput
                                value={user.birth_date}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            birth_date: e.target.value,
                                        };
                                    })
                                }
                                type="date"
                                label="BirthDay"
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MDInput
                                value={user.name}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        };
                                    })
                                }
                                type="text"
                                label="Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MDInput
                                value={user.email}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            email: e.target.value,
                                        };
                                    })
                                }
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select Role
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Role"
                                    value={user.role}
                                    onChange={(e) =>
                                        setUser((prev) => {
                                            return {
                                                ...prev,
                                                role: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {roles_options()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="select-gender-label">
                                    Select Gender
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Gender"
                                    value={user.gender}
                                    onChange={(e) =>
                                        setUser((prev) => {
                                            return {
                                                ...prev,
                                                gender: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {genders_options()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select Workout Level
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Workout Level"
                                    value={user.workout_level}
                                    onChange={(e) =>
                                        setUser((prev) => {
                                            return {
                                                ...prev,
                                                workout_level: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {workout_levels_options()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="select-gender-label">
                                    Select Top Goal
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Top Goal"
                                    value={user.top_goal}
                                    onChange={(e) =>
                                        setUser((prev) => {
                                            return {
                                                ...prev,
                                                top_goal: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {top_goals_options()}
                                </Select>
                            </FormControl>
                        </Grid>
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
                            padding: "1rem",
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
                            padding: "1rem",
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

export default UserForm;
