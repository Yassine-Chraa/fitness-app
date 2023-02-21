import { Card, Grid, Modal, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import MDAvatar from '../../components/MDAvatar';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDInput from '../../components/MDInput';
import MDTypography from '../../components/MDTypography';
import { useMaterialUIController, setOpenDeleteModalHandler } from '../../context/UIContext';
import { useUser } from '../../context/APIContext/providers/UserContextProvider';

import { async } from 'regenerator-runtime';
import { get, result } from 'lodash';

const DeleteUserModal = ({ selectedID }) => {
    const [controller, dispatch] = useMaterialUIController();
    const { openDeleteModalHandler } = controller;
    const { deleteUser, getUser } = useUser();

    const [localRole, setLocalRole] = useState('Unknown');
    const [localEmail, setLocalEmail] = useState('Unknown');
    const [localName, setLocalName] = useState('Unknown');
    const [localImgUrl, setLocalImgUrl] = useState('https://bit.ly/34BY10g');
    const [localLevel, setLocalLevel] = useState('Unknown');
    const [localTopGoal, setLocalTopGoal] = useState('Unknown');
    const [localHeight, setLocalHeight] = useState(0);
    const [localWeight, setLocalWeight] = useState(0);
    const [localScore, setLocalScore] = useState(0);

    const fetchUser = async () => {
        const user = await getUser(selectedID);
        if (user) {
            const { name, email, img_url, weight, height, role, score, workout_level, top_goal } = user;
            setLocalRole(() => role);
            setLocalLevel(() => workout_level);
            setLocalTopGoal(() => top_goal);
            setLocalHeight(() => height);
            setLocalWeight(() => weight);
            setLocalScore(() => score);
            setLocalEmail(() => email);
            setLocalName(() => name);
            setLocalImgUrl(() => img_url);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [selectedID])

    const confirmEditUserHandler = async () => {
        const result = await deleteUser(selectedID);
        if (result) {
            setOpenDeleteModalHandler(dispatch, false);
        }
    };

    const cancelEditUserHandler = () => {
        setOpenDeleteModalHandler(dispatch, false);
    }


    return (
        <Modal
            open={openDeleteModalHandler}
            onClose={() => setOpenDeleteModalHandler(dispatch, false)}
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card sx={{
                padding: 2,
                width: '70%', height: '60%',
                maxWidth: '620px',
                borderRadius: '10px',
                boxShadow: '#000e 1px 1px 10px',
                // overflowY: 'scroll'
            }}>
                <MDBox
                    variant="gradient"
                    bgColor="error"
                    borderRadius="lg"
                    coloredShadow="error"
                    mx={2}
                    mt={-5}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" mx={1}>
                        You are about to delete a user !!
                    </MDTypography>
                </MDBox>
                <Grid container spacing={2} >

                    <Grid item xs={11} sm={6} md={6} lg={6} xl={6}>
                        <MDBox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Tooltip title={`${localName}`}>
                                <MDAvatar variant="gradient" src={localImgUrl} name={localName} size="xxl" style={{ cursor: 'pointer' }} />
                            </Tooltip>
                            <MDBox mb={1} mt={1} lineHeight={1} style={{ backgroundColor: '#f7f7f7ab', padding: '1rem', borderRadius: '0.5rem' }}>
                                <MDTypography display="block" variant="button" fontWeight="medium">{localName}</MDTypography>
                                <MDTypography variant="caption">{localEmail}</MDTypography>
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox mt={2}>
                            <MDBox mb={2}>
                                <MDInput value={localLevel} style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px',paddingLeft: '4px' }} disabled type="text" label="Level" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localTopGoal} style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px',paddingLeft: '4px' }} disabled type="text" label="Goal" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3} xl={3}>
                        <MDBox mt={2}>
                            <MDBox mb={2}>
                                <MDInput value={localScore} style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px',paddingLeft: '4px' }} disabled type="text" label="Score" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput value={localHeight * localWeight} style={{ borderTopLeftRadius: '7px', borderTopRightRadius: '7px',paddingLeft: '4px' }} disabled type="text" label="W x H" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>

                <MDBox display="flex" justifyContent="space-around" mx={2} mt={2}>
                    <MDButton onClick={cancelEditUserHandler} variant="gradient" color="warning" style={{ padding: "0.8rem", minWidth: "4rem", maxWidth: "12rem", flex: 1 }}>
                        NO
                    </MDButton>
                    <MDButton onClick={confirmEditUserHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "4rem", maxWidth: "12rem", flex: 1 }}>
                        YES
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default DeleteUserModal;

