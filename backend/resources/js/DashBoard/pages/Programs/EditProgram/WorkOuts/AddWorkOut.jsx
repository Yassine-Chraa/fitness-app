import { Card, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import MDBox from '../../../../components/MDBox';
import MDButton from '../../../../components/MDButton';
import MDInput from '../../../../components/MDInput';
import MDTypography from '../../../../components/MDTypography';
import { useMaterialUIController, setOpenAddWorkOutModalHandler } from '../../../../context/UIContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { async } from 'regenerator-runtime';
import { useWorkOut } from '../../../../context/APIContext/providers/WorkOutContextProvider';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const states = ['unstarted','progress', 'finished'];


const AddWorkOutModal = ({ ProgramID }) => {

    const [controller, dispatch] = useMaterialUIController();
    const { openAddWorkOutModalHandler } = controller;

    const { addWorkOut } = useWorkOut();

    const [localDay, setLocalDay] = useState(days[0]);
    const [localState, setLocalState] = useState(states[0]);

    const [localTitle, setLocalTitle] = useState('');
    const [localDuration, setLocalDuration] = useState(0);

    const days_options = () => days.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)
    const states_options = () => states.map((item, index) => <MenuItem key={index} value={`${item}`}>{item}</MenuItem>)

    const confirmAddHandler = async () => {
        const workout = {
            title: localTitle,
            duration: localDuration,
            day: localDay,
            state: localState,
            program_id: ProgramID.ProID,
        }
        const result = await addWorkOut(workout);
        if (result) {
            setOpenAddWorkOutModalHandler(dispatch, false);
        }
    };

    const cancelAddHandler = () => {
        setOpenAddWorkOutModalHandler(dispatch, false);
    }

    return (
        <Modal
            open={openAddWorkOutModalHandler}
            onClose={() => setOpenAddWorkOutModalHandler(dispatch, false)}
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card sx={{
                padding: 2,
                width: '50%', height: '35%',
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
                        Add New WorkOut
                    </MDTypography>
                </MDBox>
                <Grid container spacing={1} mt={2} >

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <MDBox component="form" role="form" style={{ flex: 1 }}>
                            <MDBox m={1} >
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
                            <MDBox m={1} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-gender-label">Select Day</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-gender-label"
                                        id="select-gender"
                                        value={localDay}
                                        label="Select Category"
                                        onChange={(event) => setLocalDay(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {days_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <MDBox m={1}>
                            <MDInput value={localTitle} onChange={(val) => setLocalTitle(val.target.value)} type="text" label="Title" />
                        </MDBox>
                        <MDBox m={1}>
                            <MDInput value={localDuration} onChange={(val) => setLocalDuration(val.target.value)} type="number" label="Duration" fullWidth />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox display="flex" justifyContent="space-around" mx={2} mt={1}>
                    <MDButton onClick={cancelAddHandler} variant="gradient" color="warning" style={{ padding: "1rem", minWidth: "3rem", maxWidth: "9rem", flex: 1 }}>
                        Cancel
                    </MDButton>
                    <MDButton onClick={confirmAddHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "9rem", flex: 1 }}>
                        Done
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default AddWorkOutModal;

