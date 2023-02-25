import { Card, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, Switch, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";

import { setOpenEditProgramModalHandler, useMaterialUIController } from "../../context/UIContext";
import { useProgram } from "../../context/APIContext/providers/ProgramContextProvider";
import MDInput from "../../components/MDInput";
import SimpleLineChart from "../../components/Cards/SimpleLineChart";

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MoreVertIcon from '@mui/icons-material/MoreVert';


//============================================================================================
const imgRegex = /image\/(png|PNG|jpg|JPG|jpeg|JPEG|jfif|JFIF)$/i;
const categories = ['maintaining', 'bulking', 'cutting'];
const states = ['progress', 'unfinished', 'finished'];
//============================================================================================


const EditProgram = ({ selectedID }) => {

    const [controller, dispatch] = useMaterialUIController();
    const { openEditProgramModalHandler } = controller;

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();

    const { getProgram, updateProgram } = useProgram;

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

    const fetchProgram = async () => {
        const program = await getProgram(selectedID);
        if (program) {
            const { id, main_img, title, state, description, start_time, end_time, duration, break_duration, category, isFree } = program;

            setLocalCategory(category ? category : categories[0]);
            setLocalState(state ? state : states[0]);
            setLocalTitle(title ? title : "title here");
            setLocalDesc(description ? description : "short description about the program here.");
            setLocalBreakDuration(break_duration ? break_duration : 0);
            setLocalDuration(duration ? duration : 0);
            setLocalStartTime(start_time ? start_time : "2000-02-02");
            setLocalEndTime(end_time ? end_time : "2000-02-02");

            setImgUrl(() => main_img ? main_img : 'https://bit.ly/34BY10g');
        }
    }

    useEffect(() => {
        fetchProgram();
    }, []);


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
                <MDButton onClick={() => setOpenEditProgramModalHandler(dispatch, false)} variant="standard">
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
                                    src={'https://bit.ly/34BY10g'}
                                    alt={"main image that describes the program"}
                                    loading="lazy"
                                    style={{ cursor: 'pointer', width: "100%", height: "170px", maxWidth: "280px", borderRadius: "4px" }}
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


                            <Divider height={2} color={"#0005"} />


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


                            <Divider height={2} color={"#0005"} />


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


                            <Divider height={2} color={"#0005"} />


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
                                        <FormControlLabel control={<Switch defaultChecked />} label="isFree" />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Card>

                </Grid>
                {/* =======================( big cards here )======================= */}
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container spacing={1}  >
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                            <SimpleLineChart
                                sx={{ position: "relative" }}
                                color="success"
                                title="Title Here"
                                description={
                                    <>
                                        (<strong>+15%</strong>) increase in today sales.
                                    </>
                                }
                                date="updated 4 min ago"
                                chart={firstChart}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SimpleLineChart
                                sx={{ position: "relative" }}
                                color="success"
                                title="Title Here"
                                description={
                                    <>
                                        (<strong>+15%</strong>) increase in today sales.
                                    </>
                                }
                                date="updated 4 min ago"
                                chart={secondChart}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card style={{ padding: '1rem' }}>
                                <MDBox style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <MDBox>
                                        <MDTypography style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            lineHeight: '1.25',
                                            margin: "0.1rem auto",
                                            marginBottom: "0.3rem",
                                            textTransform: "uppercase",
                                        }}>
                                            Activities
                                        </MDTypography>
                                        <MDTypography component="div" variant="button" color="text" fontWeight="light">
                                            all activities of the current program
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox>
                                        <Search>
                                            <SearchIconWrapper>
                                                <SearchIcon />
                                            </SearchIconWrapper>
                                            <StyledInputBase
                                                placeholder="Search…"
                                                inputProps={{ 'aria-label': 'search' }}
                                            />
                                        </Search>
                                    </MDBox>
                                </MDBox>
                                <MDBox>
                                    <ActivityItem />
                                    <ActivityItem />
                                    <ActivityItem />
                                    <ActivityItem />
                                    <ActivityItem />
                                    <ActivityItem />
                                </MDBox>

                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </MDBox >
    );
};

export default EditProgram;


//==================================================================================================


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #0004",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    boxShadow: `0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)`,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


//==================================================================================================


export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


//==================================================================================================


export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(0.6em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


//==================================================================================================


export const ActivityItem = () => {
    return (
        <MDBox style={{
            display: 'flex', justifyContent: "space-between", alignItems: "center",
            flexDirection: "row", borderRadius: "6px", border: "1px solid #0006",
            padding: "0.4rem", marginTop: "1rem",
        }}>
            <MDBox style={{
                border: "1px solid #0006", width: "74px", height: "74px",
                display: 'flex', justifyContent: "center", alignItems: "center",
                flexDirection: "column", borderRadius: "6px",
            }}>
                <MDTypography style={{
                    fontSize: '1.6rem', fontWeight: '700', lineHeight: '1.25', margin: "0.2rem auto",
                    marginBottom: "0.2rem", textTransform: "uppercase",
                }}>
                    02
                </MDTypography>
                <MDTypography style={{
                    fontSize: '0.6rem', fontWeight: '600', lineHeight: '1.25', margin: "0.1rem auto",
                    marginBottom: "0.3rem", textTransform: "uppercase",
                }}>
                    Sun
                </MDTypography>
            </MDBox>
            <MDBox>
                <MDBox style={{
                    flex: 1, display: 'flex', justifyContent: "space-between", alignItems: "flex-start",
                    flexDirection: "column",
                }}>
                    <MDTypography style={{
                        fontSize: '1rem', fontWeight: '600', lineHeight: '1.25', margin: "0.1rem",
                        marginBottom: "0.1rem",
                    }}>
                        title of the activity
                    </MDTypography>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        feature or category
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox>
                <MDBox style={{
                    flex: 1, display: 'flex', justifyContent: "center", alignItems: "center",
                    flexDirection: "row",
                }}>
                    <DirectionsRunIcon sx={{ marginRight: "0.4rem", }} />
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        State Here
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox>
                <IconButton>
                    <MoreVertIcon fontWeight={"large"} style={{ fontSize: "1.4rem" }} />
                </IconButton>
            </MDBox>
        </MDBox>
    );
};
