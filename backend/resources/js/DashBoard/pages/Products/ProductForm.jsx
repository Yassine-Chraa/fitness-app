import { Card, Grid, Modal } from "@mui/material";
import React, { useEffect, productef, useState, useRef } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import MDTypography from "../../components/MDTypography";
import {
    useMaterialUIController,
    setOpenFormHandler,
} from "../../context/UIContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useProduct } from "../../context/APIContext/providers/ProductContextProvider";

const imgRegex = /image\/(png|jpg|JPG|jpeg|JPEG|jfif)$/i;
const colors = ["black", "blue", "white", "green"];
const categories = ["gym_cloths", "gym_nutrition"];

const ProductForm = ({ type, selectedID }) => {
    const { getProduct, updateProduct, addProduct } = useProduct();
    const [controller, dispatch] = useMaterialUIController();
    const { openFormHandler } = controller;
    const [imageFile, setImageFile] = useState();
    const ImageRef = useRef();

    const [product, setProduct] = useState({});

    const fetchData = () => {
        if (selectedID != 0)
            getProduct(selectedID).then((res) => setProduct(res));
        else
            setProduct({
                id: 0,
                img_url: "",
                name: "",
                category: "",
                description: "",
                size: "L",
                color: "Black",
                company: "",
                price: "",
                stock: 0,
            });
    };
    useEffect(() => {
        fetchData();
    }, [selectedID]);

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
                setProduct((prev) => {
                    return { ...prev, img_url: result };
                });
            }
        };
        fileReader.readAsDataURL(file);
    };

    const confirm = async () => {
        const result =
            type == "Add"
                ? await addProduct(product)
                : await updateProduct(selectedID, product);
        if (result) {
            setOpenFormHandler(dispatch, false);
        }
    };
    const cancel = () => {
        setOpenFormHandler(dispatch, false);
    };

    return (
        <Modal
            open={openFormHandler}
            onClose={cancel}
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
                    width: "80%",
                    borderRadius: "10px",
                    boxShadow: "#000e 1px 1px 10px",
                    // overflowY: 'scroll'
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
                        {type} Product
                    </MDTypography>
                </MDBox>
                <MDBox mb={3}>
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
                            onClick={() => ImageRef.current.click()}
                            variant="gradient"
                            src={"https://bit.ly/34BY10g"}
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
                                onChange={upLoadImageHandler}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onClick={() =>
                                    console.log("upload is invoked !")
                                }
                            />
                        </MDButton>
                    </MDBox>
                </MDBox>
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MDInput
                                value={product.name}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        };
                                    })
                                }
                                type="text"
                                label="Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <MDInput
                                value={product.stock}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            stock: e.target.value,
                                        };
                                    })
                                }
                                type="number"
                                label="Stock"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <MDInput
                                value={product.price}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            price: e.target.value,
                                        };
                                    })
                                }
                                type="number"
                                label="Price (DH)"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MDInput
                                value={product.company}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            company: e.target.value,
                                        };
                                    })
                                }
                                type="text"
                                label="Company"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select Color
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Color"
                                    value={product.color}
                                    onChange={(e) =>
                                        setProduct((prev) => {
                                            return {
                                                ...prev,
                                                color: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {colors.map((item, index) => (
                                        <MenuItem key={index} value={`${item}`}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-role-label">
                                    Select Category
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Select Category"
                                    value={product.category}
                                    onChange={(e) =>
                                        setProduct((prev) => {
                                            return {
                                                ...prev,
                                                category: e.target.value,
                                            };
                                        })
                                    }
                                    sx={{
                                        padding: "0.75rem !important",
                                    }}
                                >
                                    {categories.map((item, index) => (
                                        <MenuItem key={index} value={`${item}`}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <MDInput
                                value={product.description}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            description: e.target.value,
                                        };
                                    })
                                }
                                multiline
                                rows={4}
                                label="Description"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <MDBox
                    display="flex"
                    justifyContent="space-around"
                    mx={2}
                    mt={2}
                >
                    <MDButton
                        onClick={cancel}
                        variant="gradient"
                        color="warning"
                        style={{
                            padding: "2px",
                            minWidth: "6rem",
                            maxWidth: "8rem",
                            flex: 1,
                        }}
                    >
                        Cancel
                    </MDButton>
                    <MDButton
                        onClick={confirm}
                        variant="gradient"
                        color="success"
                        style={{
                            padding: "2px",
                            minWidth: "6rem",
                            maxWidth: "8rem",
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

export default ProductForm;
