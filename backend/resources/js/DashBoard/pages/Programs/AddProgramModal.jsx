import { Card, Grid, Modal } from '@mui/material';
import React, { useRef, useState } from 'react';
import MDAvatar from '../../components/MDAvatar';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDInput from '../../components/MDInput';
import MDTypography from '../../components/MDTypography';
import { useMaterialUIController, setOpenAddModalHandler, setOpenAddProgramModalHandler } from '../../context/UIContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUser } from '../../context/APIContext/providers/UserContextProvider';
import { async } from 'regenerator-runtime';
import { result } from 'lodash';
import { useProgram } from '../../context/APIContext/providers/ProgramContextProvider';
import { Image } from '@mui/icons-material';


const imgRegex = /image\/(png|PNG|jpg|JPG|jpeg|JPEG|jfif|JFIF)$/i;
const vidRegex = /video\/(mp4|gif|GIF|MP4)$/i;
const categories = ['maintaining', 'bulking', 'cutting'];
const states = ['progress', 'unfinished', 'finished'];


const AddProgramModal = () => {

    const [controller, dispatch] = useMaterialUIController();
    const { openAddProgramModalHandler } = controller;

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [localVidUrl, setLocalVidUrl] = useState(null);
    const [videoFile, setVideoFile] = useState();
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();
    const VideoRef = useRef();

    const { addProgram } = useProgram();

    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localState, setLocalState] = useState(states[0]);

    const [localTitle, setLocalTitle] = useState('');
    const [localDesc, setLocalDesc] = useState('');

    const [localBreakDuration, setLocalBreakDuration] = useState(0);
    const [localDuration, setLocalDuration] = useState(0);

    const [localStartTime, setLocalStartTime] = useState('2000-02-02');
    const [localEndTime, setLocalEndTime] = useState('2000-02-02');

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
    const upLoadVideoHandler = (event) => {
        var file = event.target.files[0];
        setVideoFile(file);
        if (!file.type.match(vidRegex)) {
            alert("Video format is not valid !!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
                setLocalVidUrl(result)
            }
        }
        fileReader.readAsDataURL(file);
    }



    const confirmAddProgramHandler = async () => {
        const program = {
            name_img: localImgUrl,
            main_vid: localVidUrl,
            title: localTitle,
            description: localDesc,
            start_time: localStartTime,
            end_time: localEndTime,
            duration: localDuration,
            break_duration: localBreakDuration,
            category: localCategory,
            state: localState,
            isFree: false,
        }
        const result = await addProgram(program);
        if (result) {
            setOpenAddProgramModalHandler(dispatch, false);
        }
    };

    const cancelAddProgramHandler = () => {
        setOpenAddProgramModalHandler(dispatch, false);
    }

    return (
        <Modal
            open={openAddProgramModalHandler}
            onClose={() => setOpenAddProgramModalHandler(dispatch, false)}
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card sx={{
                padding: 2,
                width: '80%', height: '80%',
                borderRadius: '10px',
                boxShadow: '#000e 1px 1px 10px',
            }}>
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
                <Grid container spacing={2} >

                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <MDBox style={{ margin: "0.5rem", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img
                                onClick={() => ImageRef.current.click()}
                                src={localImgUrl == null ? 'https://bit.ly/34BY10g' : localImgUrl}
                                alt={"main image that describes the program"}
                                loading="lazy"
                                style={{ cursor: 'pointer', width: "100px", height: "100px", borderRadius: "5px" }}
                            />
                            <MDTypography style={{ width: "100%", textAlign: "center" }} variant="subtitle2" fontWeight="medium" mx={1}>
                                Desc Image
                            </MDTypography>
                            <input ref={ImageRef} onChange={upLoadImageHandler} hidden accept="image/*" multiple type="file" onClick={() => console.log('upload is invoked !')} />
                        </MDBox>
                        <MDBox style={{ margin: "0.5rem", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <video
                                autoPlay
                                loop
                                muted
                                onClick={() => VideoRef.current.click()}
                                src={localVidUrl == null ? 'https://bit.ly/34BY10g' : localVidUrl}
                                alt={"bla bla"}
                                loading="lazy"
                                style={{ cursor: 'pointer', width: "160px", height: "130px", borderRadius: "5px" }}
                            />
                            <MDTypography style={{ width: "100%", textAlign: "center" }} variant="subtitle2" fontWeight="medium" mx={1}>
                                Desc Video
                            </MDTypography>
                            <input ref={VideoRef} onChange={upLoadVideoHandler} hidden accept="video/*" multiple type="file" />
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={1}>
                                <MDInput value={localDuration} onChange={(val) => setLocalDuration(val.target.value)} type="number" label="Duration" variant="filled" fullWidth />
                            </MDBox>
                            <MDBox mb={1}>
                                <MDInput value={localBreakDuration} onChange={(val) => setLocalBreakDuration(val.target.value)} type="number" label="break Duration" variant="filled" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={1}>
                                <MDInput value={localStartTime} onChange={(val) => setLocalStartTime(val.target.value)} type="date" label="Start-time" variant="filled" fullWidth />
                            </MDBox>
                            <MDBox mb={1}>
                                <MDInput value={localEndTime} onChange={(val) => setLocalEndTime(val.target.value)} type="date" label="End-time" variant="filled" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    {/* ---------( dropdown lists )----------- */}
                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={1} >
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
                            <MDBox mb={1} >
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
                        </MDBox>
                    </Grid>

                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <MDBox component="form" role="form" style={{ display: "flex", justifyContent: "center" }}>
                            <MDBox mb={1}>
                                <MDInput value={localTitle} onChange={(val) => setLocalTitle(val.target.value)} type="text" label="Title" />
                            </MDBox>
                        </MDBox>
                        <MDBox component="form" role="form" mt={1}>
                            <MDBox mb={1}>
                                <MDInput multiline rows={4} value={localDesc} onChange={(val) => setLocalDesc(val.target.value)} type="text" label="Description" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>

                <MDBox display="flex" justifyContent="space-around" mx={2} mt={1}>
                    <MDButton onClick={cancelAddProgramHandler} variant="gradient" color="warning" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Cancel
                    </MDButton>
                    <MDButton onClick={confirmAddProgramHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Done
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default AddProgramModal;

