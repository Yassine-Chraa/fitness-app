import { Card, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Menu, MenuItem, Select, Switch, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";

import { useProgram } from "../../../context/APIContext/providers/ProgramContextProvider";
import MDInput from "../../../components/MDInput";
import ProgramStatistics from "./ProgramStatistics";
import ListOfActivities from "./ListOfActivities";
import { setOpenEditProgramModalHandler, setReloadData, useMaterialUIController } from "../../../context/UIContext";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";

const imgRegex = /image\/(png|PNG|jpg|JPG|jpeg|JPEG|jfif|JFIF)$/i;
const categories = ['maintaining', 'bulking', 'cutting'];
const diff_levels = ['beginner', 'intermediate', 'advanced'];

const EditProgram = () => {

    const [controller, dispatch] = useMaterialUIController();
    const { openEditProgramModalHandler, reLoadData } = controller;
    const { programID } = useParams();

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();

    const { getProgram, updateProgram } = useProgram();

    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localDiffLevel, setLocalDiffLevel] = useState(diff_levels[0]);

    const [localTitle, setLocalTitle] = useState('');
    const [localDesc, setLocalDesc] = useState('');

    const [localProID, setLocalProID] = useState(0);

    const [localIsFree, setLocalIsFree] = useState(false);

    const diff_levels_options = () => diff_levels.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
    const categories_options = () => categories.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)


    const upLoadImageHandler = (event) => {
        var file = event.target.files[0];
        setImageFile(file);
        if (!file.type.match(imgRegex)) {
            alert("image format is not valid !!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
                setLocalImgUrl(result)
            }
        }
        fileReader.readAsDataURL(file);
    }



    const fetchProgram = async () => {
        const program = await getProgram(programID);
        if (program) {
            const { id, main_img, title, description, owner_id, difficulty_level, category, isFree } = program;
            setLocalCategory(category ? category : categories[0]);
            setLocalProID(id ? id : 0);
            setLocalDiffLevel(difficulty_level ? difficulty_level : diff_levels[0]);
            setLocalTitle(title ? title : "title here");
            setLocalDesc(description ? description : "short description about the program here.");
            setLocalIsFree(() => isFree ? true : false);
            setLocalImgUrl(() => main_img ? main_img : 'https://bit.ly/34BY10g');
        }
    }

    useEffect(() => {
        fetchProgram();
    }, []);

    const confirmEditHandler = async () => {
        const program = {
            id: localProID,
            main_img: localImgUrl != null ? localImgUrl : 'https://bit.ly/34BY10g',
            title: localTitle,
            description: localDesc,
            category: localCategory,
            difficulty_level: localDiffLevel,
            isFree: localIsFree,
        }
        const result = await updateProgram(program);
        if (result) {
            setOpenEditProgramModalHandler(dispatch, false);
            setReloadData(dispatch, !reLoadData)
        }
    };


    const firstChart = {
        labels: ["Maintaining", "Cutting", "Bulking"],
        datasets: { label: "Program Category Statistics", data: [10, 80, 100] },
    };


    const secondChart = {
        labels: ["Unfinished", "Progress", "Finished"],
        datasets: { label: "Program Progress Statistics", data: [70, 30, 300] },
    };


    return (
        <DashboardLayout>
            <MDBox>
                <MDBox display="flex" justifyContent="space-between" mx={1} mb={1}>
                    <MDButton onClick={confirmEditHandler} color="secondary" variant="outlined">
                        Save
                    </MDButton>
                    <Link
                        to={`/dashboard/programs`}
                    >
                        <MDButton color="secondary" variant="outlined">
                            Back
                        </MDButton>
                    </Link>
                </MDBox>

                <Grid container spacing={3} justifyContent={"center"}>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        {/* =======================( header )======================= */}
                        <Card style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                            <MDTypography style={{
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                lineHeight: '1.25',
                                margin: "0.1rem auto",
                                textTransform: "uppercase",
                            }}>
                                Program
                            </MDTypography>
                            <MDBox style={{ padding: '0.3rem', display: 'flex', justifyContent: 'center' }}>
                                <MDBox style={{ margin: "0.2rem", flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <img
                                        onClick={() => ImageRef.current.click()}
                                        src={localImgUrl ? localImgUrl : 'https://bit.ly/34BY10g'}
                                        alt={"main image that describes the program"}
                                        loading="lazy"
                                        style={{ cursor: 'pointer', width: "100%", height: "170px", maxWidth: "280px", borderRadius: "3px" }}
                                    />
                                    <MDTypography onClick={() => ImageRef.current.click()} style={{ width: "100%", textAlign: "center", cursor: "pointer" }} variant="subtitle2" fontWeight="light" fontSize={14} mx={1}>
                                        Change Image
                                    </MDTypography>
                                    <input ref={ImageRef} onChange={upLoadImageHandler} hidden accept="image/*" multiple type="file" onClick={() => console.log('upload is invoked !')} />
                                </MDBox>
                            </MDBox>
                        </Card>


                        {/* =======================( program infos )======================= */}
                        <Card style={{ padding: '1rem' }}>
                            <MDTypography style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                lineHeight: '1.25',
                                margin: "0.1rem auto",
                                marginBottom: "0.5rem",
                                textTransform: "uppercase",
                            }}>
                                Program info
                            </MDTypography>
                            <MDBox style={{ margin: "0rem", flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <MDBox mb={1} >
                                    <MDInput value={localTitle} onChange={(val) => setLocalTitle(val.target.value)} type="text" label="Title" />
                                </MDBox>
                                <MDBox mb={1} >
                                    <MDInput multiline rows={4} value={localDesc} onChange={(val) => setLocalDesc(val.target.value)} type="text" label="Description" fullWidth />
                                </MDBox>


                                <Divider height={2} color={"#0009"} />


                                <Grid container spacing={1} justifyContent={"center"}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                        <MDBox mb={1.2} >
                                            <FormControl fullWidth>
                                                <InputLabel id="select-role-label">Select Deff Level</InputLabel>
                                                <Select
                                                    variant="outlined"
                                                    labelId="select-role-label"
                                                    id="select-role"
                                                    value={localDiffLevel}
                                                    label="Select State"
                                                    onChange={(event) => setLocalDiffLevel(event.target.value)}
                                                    sx={{ padding: '0.75rem !important' }}
                                                >
                                                    {diff_levels_options()}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                        <MDBox mb={1.2} >
                                            <FormControl fullWidth>
                                                <InputLabel id="select-gender-label">Select Category</InputLabel>
                                                <Select
                                                    variant="outlined"
                                                    labelId="select-gender-label"
                                                    id="select-gender"
                                                    value={localCategory}
                                                    label="Select Category"
                                                    onChange={(event) => setLocalCategory(event.target.value)}
                                                    sx={{ padding: '0.75rem !important' }}
                                                >
                                                    {categories_options()}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} justifyContent={"center"}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <FormGroup>
                                            <FormControlLabel control={<Switch checked={localIsFree}
                                                onChange={(event) => setLocalIsFree(prev => event.target.checked)}
                                            />} label="isFree" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>

                    </Grid>

                    {/* =======================( statistics and list of activities )======================= */}

                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Grid container spacing={1} mb={4} >

                            <ProgramStatistics firstChart={firstChart} secondChart={secondChart} />

                            <ListOfActivities ProID={programID} />

                        </Grid>
                    </Grid>
                </Grid>
            </MDBox >
        </DashboardLayout>
    );
};

export default EditProgram;
