import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import MDTypography from "../components/MDTypography";
import { useProduct } from "../context/APIContext/providers/ProductContextProvider";
import MDBox from "../components/MDBox";
import { Card, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import MDButton from "../components/MDButton";
const Products = () => {
    const { getProducts } = useProduct();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let res = await getProducts();
        res = res.map((ele) => {
            const { id, name, category, stock, prix } = ele;
            return {
                id,
                name,
                category,
                stock,
                prix,
                actions: <MDButton>edit</MDButton>,
            };
        });
        console.log(res);
        setData(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <MDBox>
                <Grid container spacing={6} justifyContent={"center"}>
                    <Grid item lg={12}>
                        <Card>
                            <MDBox
                                display={"flex"}
                                alignItems={"center"}
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Products Table
                                </MDTypography>
                                <MDBox ml={"auto"}>
                                    <Tooltip title="Filter list">
                                        <IconButton color="white">
                                            <Icon>filter_list</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </MDBox>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    canSearch={true}
                                    table={{
                                        columns: [
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                width: "12%",
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name",
                                                width: "30%",
                                            },
                                            {
                                                Header: "Category",
                                                accessor: "category",
                                            },
                                            {
                                                Header: "Stock",
                                                accessor: "stock",
                                                width: "12%",
                                            },
                                            {
                                                Header: "Prix (DH)",
                                                accessor: "prix",
                                                width: "12%",
                                            },
                                            {
                                                Header: "Actions",
                                                isSorted: false,
                                                accessor: "actions",
                                            },
                                        ],
                                        rows: data,
                                    }}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Products;
