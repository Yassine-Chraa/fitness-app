import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import MDTypography from "../components/MDTypography";
import { useUser } from "../context/APIContext/providers/UserContextProvider";
import MDBox from "../components/MDBox";
import { Card, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import MDButton from "../components/MDButton";
const Users = () => {
    const { getUsers } = useUser();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let res = await getUsers();
        res = res.map((ele) => {
            const { id, name, email, role } = ele;
            return {
                id,
                name,
                email,
                role,
                actions: <MDButton>edit</MDButton>,
            };
        });
        setData(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <MDBox>
                <Grid container spacing={6} justifyContent={"center"}>
                    <Grid item lg={9}>
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
                                    Users Table
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
                                                Header: "Full Name",
                                                accessor: "name",
                                                width: "30%",
                                            },
                                            {
                                                Header: "email",
                                                accessor: "email",
                                            },
                                            {
                                                Header: "Role",
                                                accessor: "role",
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

export default Users;
