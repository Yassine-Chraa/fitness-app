import { Card, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProduct } from "../../context/APIContext/providers/ProductContextProvider";
import { size } from "lodash";

const ProductDetails = () => {
    const { id } = useParams();
    const { getProduct } = useProduct();
    const [product, setProduct] = useState({});
    const sizes = ["XS", "S", "M", "L", "XL"];
    const colors = ["black", "blue", "white", "green"];
    const fetchData = async () => {
        const data = await getProduct(id);
        console.log(data);
        setProduct(data);
    };
    const { name, category, price, stock, description } = product;
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
                            <img
                                style={{ width: "100%"}}
                                src="https://static.thcdn.com/images/large/webp//productimg/1600/1600/13764083-9285015158202439.jpg"
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12}  sm={6}>
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
                            <MDBox mt={2}>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                        opacity: 0.6,
                                    }}
                                >
                                    Size:
                                </MDTypography>
                                <Grid container columnGap={1} mt={1}>
                                    {sizes.map((ele, index) => {
                                        return (
                                            <Grid
                                                item
                                                className="size-item"
                                                style={{
                                                    borderWidth:
                                                        index == 0 ? 2 : 1,
                                                    borderColor:
                                                        index == 0
                                                            ? "rgb(145, 69, 69"
                                                            : "rgb(236, 227, 227)",
                                                }}
                                            >
                                                {ele}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </MDBox>
                            <MDBox mt={4}>
                                <MDTypography
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "400",
                                        color: "#000",
                                    }}
                                >
                                    Color:
                                </MDTypography>
                                <Grid container columnGap={2} mt={1}>
                                    {colors.map((ele,index) => {
                                        return (
                                            <Grid
                                                item
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    borderRadius: "50%",
                                                    backgroundColor: ele,
                                                    outline:
                                                        index == 0
                                                            ? "solid 2px"
                                                            : "",
                                                    outlineOffset:
                                                        index == 0 ? 3 : "",
                                                }}
                                            ></Grid>
                                        );
                                    })}
                                </Grid>
                            </MDBox>
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