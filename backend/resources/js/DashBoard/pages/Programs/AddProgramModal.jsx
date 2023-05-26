import { Card, Grid, Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import MDTypography from "../../components/MDTypography";
import {
    useMaterialUIController,
    setOpenAddModalHandler,
    setOpenAddProgramModalHandler,
    setReloadData,
} from "../../context/UIContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useUser } from "../../context/APIContext/providers/UserContextProvider";
import { async } from "regenerator-runtime";
import { result } from "lodash";
import { useProgram } from "../../context/APIContext/providers/ProgramContextProvider";
import { Image } from "@mui/icons-material";

const imgRegex = /image\/(png|PNG|jpg|JPG|jpeg|JPEG|jfif|JFIF)$/i;
const categories = ["maintaining", "bulking", "cutting"];
const diff_levels = ["beginner", "intermediate", "advanced"];

const AddProgramModal = () => {
    const [controller, dispatch] = useMaterialUIController();
    const { openAddProgramModalHandler, reLoadData } = controller;

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState("");
    const ImageRef = useRef();

    const { addProgram } = useProgram();

    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localdiffLevel, setLocaldiffLevel] = useState(diff_levels[0]);

    const [localTitle, setLocalTitle] = useState("");
    const [localDesc, setLocalDesc] = useState("");

    const diff_levels_options = () =>
        diff_levels.map((item, index) => (
            <MenuItem key={index} value={`${item}`}>
                {item}
            </MenuItem>
        ));
    const categories_options = () =>
        categories.map((item, index) => (
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
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const { result } = e.target;
            if (result) {
                setLocalImgUrl(result);
            }
        };
        fileReader.readAsDataURL(file);
    };

    const confirmAddHandler = async () => {
        const program = {
            title: localTitle,
            description: localDesc,
            category: localCategory,
            difficulty_level: localdiffLevel,
            isFree: false,
        };
        const result = await addProgram(program, imageFile);
        if (result) {
            setOpenAddProgramModalHandler(dispatch, false);
            setReloadData(dispatch, !reLoadData);
            setLocalCategory(categories[0]);
            setLocaldiffLevel(diff_levels[0]);
            setLocalTitle("");
            setLocalDesc("");
            setLocalImgUrl(null);
        }
    };

    const cancelAddHandler = () => {
        setOpenAddProgramModalHandler(dispatch, false);
    };

    return (
        <Modal
            open={openAddProgramModalHandler}
            onClose={() => setOpenAddProgramModalHandler(dispatch, false)}
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
                    width: "50%",
                    height: "62%",
                    borderRadius: "10px",
                    boxShadow: "#000e 1px 1px 10px",
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
                        Add New Program
                    </MDTypography>
                </MDBox>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
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
                                src={
                                    localImgUrl == null
                                        ? "https://res.cloudinary.com/dtveiunmn/image/upload/v1681261019/default_ma6o6z.jpg"
                                        : localImgUrl
                                }
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
                    </Grid>
                    <Grid item xs={12}>
                        <MDBox mb={1}>
                            <MDInput
                                value={localTitle}
                                onChange={(val) =>
                                    setLocalTitle(val.target.value)
                                }
                                type="text"
                                label="Title"
                                fullWidth
                            />
                        </MDBox>
                        <Grid container columnSpacing={1}>
                            <Grid item sm={12} md={6} mb={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-role-label">
                                        Select State
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={localdiffLevel}
                                        label="Select State"
                                        onChange={(event) =>
                                            setLocaldiffLevel(
                                                event.target.value
                                            )
                                        }
                                        sx={{ padding: "0.75rem !important" }}
                                    >
                                        {diff_levels_options()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12} md={6} mb={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender-label">
                                        Select Category
                                    </InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={localCategory}
                                        label="Select Category"
                                        onChange={(event) =>
                                            setLocalCategory(event.target.value)
                                        }
                                        sx={{ padding: "0.75rem !important" }}
                                    >
                                        {categories_options()}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <MDBox mb={1}>
                            <MDInput
                                spellcheck="false"
                                multiline
                                rows={4}
                                value={localDesc}
                                onChange={(val) =>
                                    setLocalDesc(val.target.value)
                                }
                                type="text"
                                label="Description"
                                fullWidth
                            />
                        </MDBox>
                    </Grid>
                </Grid>

                <MDBox
                    display="flex"
                    justifyContent="space-around"
                    mx={2}
                    mt={1}
                >
                    <MDButton
                        onClick={cancelAddHandler}
                        variant="gradient"
                        color="warning"
                        style={{
                            padding: "1rem",
                            minWidth: "6rem",
                            maxWidth: "14rem",
                            flex: 1,
                        }}
                    >
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={confirmAddHandler}
                        variant="gradient"
                        color="success"
                        style={{
                            padding: "1rem",
                            minWidth: "6rem",
                            maxWidth: "14rem",
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

export default AddProgramModal;
