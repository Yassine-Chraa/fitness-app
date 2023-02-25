import { Card, Grid, Modal, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MDAvatar from '../../components/MDAvatar';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDTypography from '../../components/MDTypography';

import { async } from 'regenerator-runtime';
import { get, result } from 'lodash';
import { useProgram } from '../../context/APIContext/providers/ProgramContextProvider';
import {
    setOpenDeleteProgramModalHandler,
    setReloadData,
    useMaterialUIController
} from '../../context/UIContext';


const DeleteProgramModal = ({ selectedID }) => {
    const [controller, dispatch] = useMaterialUIController();
    const { openDeleteProgramModalHandler, reLoadData } = controller;
    const { getProgram, deleteProgram } = useProgram();

    const [localImgUrl, setLocalImgUrl] = useState('https://bit.ly/34BY10g');
    const [localTitle, setLocalTitle] = useState('Unknown Title !');
    const [localDesc, setLocalDesc] = useState('Unknown Description !');

    const fetchProgram = async () => {
        const program = await getProgram(selectedID);
        if (program) {
            const { id, main_img, title, description } = program;
            setLocalDesc((prev) => description ? description : prev)
            setLocalTitle((prev) => title ? title : prev)
            setLocalImgUrl((prev) => main_img ? main_img : prev);
        }
    }

    useEffect(() => {
        fetchProgram();
    }, [selectedID])

    const confirmDeleteHandler = async () => {
        const result = await deleteProgram(selectedID);
        if (result) {
            setOpenDeleteProgramModalHandler(dispatch, false);
            setReloadData(dispatch, !reLoadData)
        }
    };

    const cancelDeleteHandler = () => {
        setOpenDeleteProgramModalHandler(dispatch, false);
    }


    return (
        <Modal
            open={openDeleteProgramModalHandler}
            onClose={() => setOpenDeleteProgramModalHandler(dispatch, false)}
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card sx={{
                padding: 2,
                width: '70%', height: '60%',
                maxWidth: '620px',
                minWidth: '340px',
                borderRadius: '10px',
                boxShadow: '#000e 1px 1px 10px',
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
                        You are about to delete a Program !!
                    </MDTypography>
                </MDBox>
                <Grid container spacing={2} >

                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MDBox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img
                                src={localImgUrl ? localImgUrl : 'https://bit.ly/34BY10g'}
                                alt={"main image that describes the program"}
                                loading="lazy"
                                style={{ width: "250px", height: "180px", borderRadius: "5px" }}
                            />
                            <MDTypography
                                variant="h1" fontWeight="medium"
                                style={{ fontWeight: "600", fontSize: "20px", margin: "0.3rem auto" }} mx={1}>
                                Program with ID : {selectedID}
                            </MDTypography>
                        </MDBox>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MDBox mt={2}>
                            <MDBox mb={2} style={{ width: "100%", flex: 1 }}>
                                <MDTypography
                                    variant="h1" fontWeight="medium"
                                    style={{ fontWeight: "600", fontSize: "20px" }} mx={1}>
                                    {localTitle}
                                </MDTypography>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDTypography variant="subtitle2" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    {localDesc}
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>

                <MDBox display="flex" justifyContent="space-around" mx={2} mt={2}>
                    <MDButton onClick={cancelDeleteHandler} variant="gradient" color="warning" style={{ padding: "0.8rem", minWidth: "4rem", maxWidth: "10rem", flex: 1 }}>
                        NO
                    </MDButton>
                    <MDButton onClick={confirmDeleteHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "4rem", maxWidth: "10rem", flex: 1 }}>
                        YES
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default DeleteProgramModal;

