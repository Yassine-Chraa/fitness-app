import { Card, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProduct } from "../../context/APIContext/providers/ProductContextProvider";

const ProductDetails = () => {
    const { id } = useParams();
    const { getProduct } = useProduct();
    const [product, setProduct] = useState({});
    const [colorInd, setColorInd] = useState(0);
    const [sizeInd, setSizeInd] = useState(0);
    const sizes = ["XS", "S", "M", "L", "XL"];
    const colors = ["black", "blue", "white", "green"];
    const fetchData = async () => {
        const data = await getProduct(id);
        console.log(data);
        setProduct(data);
    };
    const { name, product_img, category, price, stock, description, items } =
        product;
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <MDBox>
                <Grid container spacing={3} justifyContent={"center"}>
                    <Grid item xs={12} sm={6}>
                        <MDBox
                            style={{
                                padding: "0.3rem",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img style={{ width: "100%" }} src={product_img} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MDBox
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <MDBox>
                                <Grid container columnGap={1}>
                                    <MDTypography
                                        item
                                        style={{
                                            backgroundColor: "orange",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: 6,
                                            padding: "2px 8px",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Current Stock: {stock}
                                    </MDTypography>
                                </Grid>
                            </MDBox>
                            <MDBox>
                                <MDTypography
                                    style={{
                                        fontSize: "2.8rem",
                                        lineHeight: 1.1,
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                >
                                    {name}
                                </MDTypography>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "300",
                                        color: "rgb(145, 69, 69)",
                                        opacity: 0.6,
                                    }}
                                >
                                    {category}
                                </MDTypography>
                                <MDTypography
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "bold",
                                        marginTop: 16,
                                    }}
                                >
                                    {price + " DH"}
                                </MDTypography>
                            </MDBox>
                            <hr
                                style={{
                                    width: "90%",
                                    height: 2,
                                    border: "unset",
                                    backgroundColor: "#e6c0c0",
                                }}
                            />
                            <MDBox mt={4}>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                    }}
                                >
                                    Product Overview
                                </MDTypography>
                                <MDTypography
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                        opacity: 0.6,
                                    }}
                                >
                                    {description}
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default ProductDetails;
