import { Card, Grid, Modal } from '@mui/material';
import React, { useRef, useState } from 'react';
import MDAvatar from '../../components/MDAvatar';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDInput from '../../components/MDInput';
import MDTypography from '../../components/MDTypography';
import { useMaterialUIController, setOpenAddModalHandler } from '../../context/UIContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUser } from '../../context/APIContext/providers/UserContextProvider';
import { async } from 'regenerator-runtime';
import { result } from 'lodash';


const imgRegex = /image\/(png|jpg|JPG|jpeg|JPEG|jfif)$/i;
const roles = ['admin', 'vip', 'client', 'coach', 'doctor'];
const genders = ['male', 'female', 'unknown'];
const work_out_levels = ['beginner', 'intermediate', 'advanced'];
const top_goals = ['maintaining', 'bulking', 'cutting'];


const AddUserModal = () => {

    const [controller, dispatch] = useMaterialUIController();
    const { openAddModalHandler } = controller;
    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState();
    const { addUser } = useUser();
    const ImageRef = useRef();

    const [localRole, setLocalRole] = useState(roles[0]);
    const [localGender, setLocalGender] = useState(genders[0]);
    const [localLevel, setLocalLevel] = useState(work_out_levels[0]);
    const [localTopGoal, setLocalTopGoal] = useState(top_goals[0]);

    const [localName, setLocalName] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [localCountry, setLocalCountry] = useState('');
    const [localCity, setLocalCity] = useState('');

    const [localHeight, setLocalHeight] = useState(0);
    const [localWeight, setLocalWeight] = useState(0);
    const [localScore, setLocalScore] = useState(0);
    const [localBirthDay, setLocalBirthDay] = useState('2000-02-02');

    const roles_options = () => roles.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
    const genders_options = () => genders.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
    const work_out_levels_options = () => work_out_levels.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
    const top_goals_options = () => top_goals.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)


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

    const confirmAddUserHandler = async () => {
        const user = {
            name: localName,
            email: localEmail,
            weight: localWeight,
            height: localHeight,
            role: localRole,
            country: localCountry,
            birth_date: localBirthDay,
            city: localCity,
            gender: localGender,
            score: localScore,
            work_out_level: localLevel,
            top_goal: localTopGoal,
            img_url: localImgUrl ? localImgUrl : 'https://bit.ly/34BY10g',
            password: 'fitnessapp',
            password_confirmation: 'fitnessapp',
            bio: 'short description about the user here !',
        }
        const result = await addUser(user);
        if (result) {
            setOpenAddModalHandler(dispatch, false);
        }
    };

    const cancelAddUserHandler = () => {
        setOpenAddModalHandler(dispatch, false);
    }

    return (
        <Modal
            open={openAddModalHandler}
            onClose={() => setOpenAddModalHandler(dispatch, false)}
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card sx={{
                padding: 2,
                width: '80%', height: '80%',
                borderRadius: '10px',
                boxShadow: '#000e 1px 1px 10px',
                // overflowY: 'scroll'
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
                        Add User
                    </MDTypography>
                </MDBox>
                <Grid container spacing={2} >

                    <Grid item xs={11} sm={6} md={6} lg={6} xl={6}>
                        <MDBox component="form" role="form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <MDAvatar onClick={() => ImageRef.current.click()} variant="gradient" src={localImgUrl == null ? 'https://bit.ly/34BY10g' : imgUrl} name={'ismail ben alla'} size="xxl" style={{ cursor: 'pointer' }} />
                            <MDButton onClick={() => ImageRef.current.click()} variant="gradient" color="info" style={{ padding: "0rem", minWidth: "12rem", maxWidth: "14rem", flex: 1 }}>
                                Upload Image
                                <input ref={ImageRef} onChange={upLoadImageHandler} hidden accept="image/*" multiple type="file" onClick={() => console.log('upload is invoked !')} />
                            </MDButton>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form" mt={2}>
                            <MDBox mb={2}>
                                <MDInput value={localName} onChange={(val) => setLocalName(val.target.value)} type="text" label="Name" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localEmail} onChange={(val) => setLocalEmail(val.target.value)} type="email" label="Email" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form" mt={2}>
                            <MDBox mb={2}>
                                <MDInput value={localCountry} onChange={(val) => setLocalCountry(val.target.value)} type="text" label="Country" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localCity} onChange={(val) => setLocalCity(val.target.value)} type="text" label="City" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>


                    {/* ---------( dropdown lists )----------- */}
                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form" mt={2}>
                            <MDBox mb={2} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-role-label">Select Role</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={localRole}
                                        label="Select Role"
                                        onChange={(event) => setLocalRole(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {roles_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox mb={2} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender-label">Select Role</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={localGender}
                                        label="Select Gender"
                                        onChange={(event) => setLocalGender(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {genders_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </MDBox>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form" mt={2}>
                            <MDBox mb={2} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-role-label">Select Role</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={localLevel}
                                        label="Select Role"
                                        onChange={(event) => setLocalLevel(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {work_out_levels_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox mb={2} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender-label">Select Role</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={localTopGoal}
                                        label="Select Gender"
                                        onChange={(event) => setLocalTopGoal(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {top_goals_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </MDBox>
                    </Grid>
                    {/* ---------( number inputs )----------- */}

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDInput value={localHeight} onChange={(val) => setLocalHeight(val.target.value)} type="number" label="Height" variant="filled" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localWeight} onChange={(val) => setLocalWeight(val.target.value)} type="number" label="Weight" variant="filled" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDInput value={localScore} onChange={(val) => setLocalScore(val.target.value)} type="number" label="Score" variant="filled" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localBirthDay} onChange={(val) => setLocalBirthDay(val.target.value)} type="date" label="BirthDay" variant="filled" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                </Grid>

                <MDBox display="flex" justifyContent="space-around" mx={2} mt={2}>
                    <MDButton onClick={cancelAddUserHandler} variant="gradient" color="warning" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Cancel
                    </MDButton>
                    <MDButton onClick={confirmAddUserHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Done
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default AddUserModal;
