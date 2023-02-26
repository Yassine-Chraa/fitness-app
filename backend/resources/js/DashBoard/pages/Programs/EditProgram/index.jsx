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


//============================================================================================
const imgRegex = /image\/(png|PNG|jpg|JPG|jpeg|JPEG|jfif|JFIF)$/i;
const categories = ['maintaining', 'bulking', 'cutting'];
const states = ['progress', 'unfinished', 'finished'];
//============================================================================================


const EditProgram = ({ selectedID }) => {

    const [controller, dispatch] = useMaterialUIController();
    const { openEditProgramModalHandler,reLoadData } = controller;

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();

    const { getProgram, updateProgram } = useProgram();

    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localState, setLocalState] = useState(states[0]);

    const [localTitle, setLocalTitle] = useState('');
    const [localDesc, setLocalDesc] = useState('');

    const [localBreakDuration, setLocalBreakDuration] = useState(0);
    const [localDuration, setLocalDuration] = useState(0);
    const [localProID, setLocalProID] = useState(0);

    const [localStartTime, setLocalStartTime] = useState('2000-02-02');
    const [localEndTime, setLocalEndTime] = useState('2000-02-02');

    const [localIsFree, setLocalIsFree] = useState(false);

    const states_options = () => states.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
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
        const program = await getProgram(selectedID);
        if (program) {
            const { id, main_img, title, state, description, start_time, end_time, duration, break_duration, category, isFree } = program;
            setLocalCategory(category ? category : categories[0]);
            setLocalProID(id ? id : 0);
            setLocalState(state ? state : states[0]);
            setLocalTitle(title ? title : "title here");
            setLocalDesc(description ? description : "short description about the program here.");
            setLocalBreakDuration(break_duration ? break_duration : 0);
            setLocalDuration(duration ? duration : 0);
            setLocalStartTime(start_time ? start_time.split(" ")[0] : "2000-02-02");
            setLocalEndTime(end_time ? end_time.split(" ")[0] : "2000-02-02");
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
            start_time: localStartTime,
            end_time: localEndTime,
            duration: localDuration,
            break_duration: localBreakDuration,
            category: localCategory,
            state: localState,
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
        <MDBox>
            <MDBox display="flex" justifyContent="flex-end" mx={1} mb={1}>
                <MDButton onClick={confirmEditHandler} color="secondary" variant="outlined">
                    Save
                </MDButton>
                <MDButton onClick={() => setOpenEditProgramModalHandler(dispatch, false)} color="secondary" variant="outlined">
                    Back
                </MDButton>
            </MDBox>

            <Grid container spacing={3} justifyContent={"center"}>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    {/* =======================( header )======================= */}
                    <Card style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                        <MDTypography style={{
                            fontSize: '1rem',
                            fontWeight: '600',
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
                                <MDTypography onClick={() => ImageRef.current.click()} style={{ width: "100%", textAlign: "center", cursor: "pointer" }} variant="subtitle2" fontWeight="small" fontSize={14} mx={1}>
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
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <MDBox mb={1}>
                                        <MDInput value={localDuration} onChange={(val) => setLocalDuration(val.target.value)} type="number" label="Duration" variant="filled" fullWidth />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <MDBox mb={1}>
                                        <MDInput value={localBreakDuration} onChange={(val) => setLocalBreakDuration(val.target.value)} type="number" label="break Duration" variant="filled" fullWidth />
                                    </MDBox>
                                </Grid>
                            </Grid>


                            <Divider height={2} color={"#0009"} />


                            <Grid container spacing={1} justifyContent={"center"}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <MDBox mb={1}>
                                        <MDInput value={localStartTime} onChange={(val) => setLocalStartTime(val.target.value)} type="date" label="Start-time" variant="filled" fullWidth />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <MDBox mb={1}>
                                        <MDInput value={localEndTime} onChange={(val) => setLocalEndTime(val.target.value)} type="date" label="End-time" variant="filled" fullWidth />
                                    </MDBox>
                                </Grid>
                            </Grid>


                            <Divider height={2} color={"#0009"} />


                            <Grid container spacing={1} justifyContent={"center"}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <MDBox mb={1.2} >
                                        <FormControl fullWidth>
                                            <InputLabel id="select-role-label">Select State</InputLabel>
                                            <Select
                                                variant="outlined"
                                                labelId="select-role-label"
                                                id="select-role"
                                                value={localState}
                                                label="Select State"
                                                onChange={(event) => setLocalState(event.target.value)}
                                                sx={{ padding: '0.75rem !important' }}
                                            >
                                                {states_options()}
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
                                            defaultChecked />} label="isFree" />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Card>

                </Grid>

                {/* =======================( statistics and list of activities )======================= */}

                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container spacing={1}  >

                        <ProgramStatistics firstChart={firstChart} secondChart={secondChart} />

                        <ListOfActivities ProID={selectedID} />

                    </Grid>
                </Grid>
            </Grid>
        </MDBox >
    );
};

export default EditProgram;
