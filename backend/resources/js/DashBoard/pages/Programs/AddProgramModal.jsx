import { Card, Grid, Modal } from '@mui/material';
import React, { useRef, useState } from 'react';
import MDAvatar from '../../components/MDAvatar';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDInput from '../../components/MDInput';
import MDTypography from '../../components/MDTypography';
import { useMaterialUIController, setOpenAddModalHandler, setOpenAddProgramModalHandler, setReloadData } from '../../context/UIContext';

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
const diff_levels = ['beginner', 'intermediate', 'advanced'];


const AddProgramModal = () => {

    const [controller, dispatch] = useMaterialUIController();
    const { openAddProgramModalHandler, reLoadData } = controller;

    const [localImgUrl, setLocalImgUrl] = useState(null);
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();

    const { addProgram } = useProgram();

    const [localCategory, setLocalCategory] = useState(categories[0]);
    const [localdiffLevel, setLocaldiffLevel] = useState(diff_levels[0]);

    const [localTitle, setLocalTitle] = useState('');
    const [localDesc, setLocalDesc] = useState('');

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




    const confirmAddHandler = async () => {
        const program = {
            main_img: localImgUrl != null ? localImgUrl : 'https://bit.ly/34BY10g',
            title: localTitle,
            description: localDesc,
            category: localCategory,
            state: localdiffLevel,
            isFree: false,
        }
        const result = await addProgram(program);
        if (result) {
            setOpenAddProgramModalHandler(dispatch, false);
            setReloadData(dispatch, !reLoadData)
        }
    };

    const cancelAddHandler = () => {
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

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <MDBox style={{ margin: "0.5rem", flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img
                                onClick={() => ImageRef.current.click()}
                                src={localImgUrl == null ? 'https://bit.ly/34BY10g' : localImgUrl}
                                alt={"main image that describes the program"}
                                loading="lazy"
                                style={{ cursor: 'pointer', width: "180px", height: "120px", borderRadius: "5px" }}
                            />
                            <MDTypography style={{ width: "100%", textAlign: "center" }} variant="subtitle2" fontWeight="medium" mx={1}>
                                Desc Image
                            </MDTypography>
                            <input ref={ImageRef} onChange={upLoadImageHandler} hidden accept="image/*" multiple type="file" onClick={() => console.log('upload is invoked !')} />
                        </MDBox>


                        <MDBox component="form" role="form" style={{ flex: 1 }}>
                            <MDBox m={1} >
                                <FormControl fullWidth>
                                    <InputLabel id="select-role-label">Select State</InputLabel>
                                    <Select
                                        variant="outlined"
                                        labelId="select-role-label"
                                        id="select-role"
                                        value={localdiffLevel}
                                        label="Select State"
                                        onChange={(event) => setLocaldiffLevel(event.target.value)}
                                        sx={{ padding: '0.75rem !important' }}
                                    >
                                        {diff_levels_options()}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox m={1} >
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

                    {/* ---------( dropdown lists )----------- */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MDBox style={{ margin: "0rem", flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <MDBox mb={1} >
                                <MDInput value={localTitle} onChange={(val) => setLocalTitle(val.target.value)} type="text" label="Title" />
                            </MDBox>
                            <MDBox mb={1} >
                                <MDInput multiline rows={4} value={localDesc} onChange={(val) => setLocalDesc(val.target.value)} type="text" label="Description" fullWidth />
                            </MDBox>
                        </MDBox>

                    </Grid>


                </Grid>

                <MDBox display="flex" justifyContent="space-around" mx={2} mt={1}>
                    <MDButton onClick={cancelAddHandler} variant="gradient" color="warning" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Cancel
                    </MDButton>
                    <MDButton onClick={confirmAddHandler} variant="gradient" color="success" style={{ padding: "1rem", minWidth: "6rem", maxWidth: "14rem", flex: 1 }}>
                        Done
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    )
};

export default AddProgramModal;

