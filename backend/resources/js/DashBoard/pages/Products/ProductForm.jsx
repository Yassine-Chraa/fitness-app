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
import { useCategory } from "../../context/APIContext/providers/CategoryContextProvider";

const imgRegex = /image\/(png|jpg|JPG|jpeg|JPEG|jfif|webp)$/i;
const colors = ["black", "blue", "white", "green"];
const sizes = ["S", "M", "L", "XL"];
//const categories = ["gym_cloths", "gym_nutrition"];

const ProductForm = ({ type, selectedID }) => {
    const { getProduct, updateProduct, addProduct } = useProduct();
    const { getCategories, categories } = useCategory();
    const [controller, dispatch] = useMaterialUIController();
    const { openFormHandler } = controller;
    const [imageFile, setImageFile] = useState("");
    const ImageRef = useRef();

    const [product, setProduct] = useState({});

    const fetchData = async () => {
        await getCategories();
        if (selectedID != 0)
            getProduct(selectedID).then((res) => setProduct(res));
        else
            setProduct({
                product_img:
                    "https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png",
                name: "",
                category_id: "",
                description: "",
                company: "",
                price: "",
                stock: 0,
            });
    };
    useEffect(() => {
        fetchData();
    }, [selectedID]);

    const uploadImage = (event) => {
        var file = event.target.files[0];
        if (!file.type.match(imgRegex)) {
            alert("image format is not valid !!");
            return;
        }
        setImageFile(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            const { result } = e.target;
            setProduct((prev) => {
                return {
                    ...prev,
                    product_img: result,
                };
            });
        };
    };

    const confirm = async () => {
        try {
            const result =
                type == "Add"
                    ? await addProduct(product, imageFile)
                    : await updateProduct(selectedID, product, imageFile);
            if (result) {
                setOpenFormHandler(dispatch, false);
                setImageFile("")
                if(type == "Add"){
                    setProduct({
                        product_img:
                            "https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png",
                        name: "",
                        category_id: "",
                        description: "",
                        company: "",
                        price: "",
                        stock: 0,
                    });
                }
            }
        } catch (e) {
            console.log(e);
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
                            variant="gradient"
                            src={product.product_img}
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
                                onChange={uploadImage}
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                            />
                        </MDButton>
                    </MDBox>
                </MDBox>
                <Grid container spacing={2}>
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
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="select-role-label">
                                Select Category
                            </InputLabel>
                            <Select
                                variant="outlined"
                                label="Select Category"
                                value={product.category_id}
                                onChange={(e) =>
                                    setProduct((prev) => {
                                        return {
                                            ...prev,
                                            category_id: e.target.value,
                                        };
                                    })
                                }
                                sx={{
                                    padding: "0.75rem !important",
                                }}
                            >
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={`${item.id}`}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <MDInput
                            spellcheck="false"
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
