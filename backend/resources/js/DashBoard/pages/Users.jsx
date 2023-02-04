import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import MDTypography from "../components/MDTypography";
import { useUser } from "../context/APIContext/providers/UserContextProvider";
import MDBox from "../components/MDBox";
import { Card, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import MDButton from "../components/MDButton";
import MDAvatar from "../components/MDAvatar";
import { Button } from "bootstrap";

export const Profile = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">{name}</MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
    </MDBox>
);


const Users = () => {
    const { getUsers } = useUser();
    const [data, setData] = useState([]);

    const dataLabels = [
        {
            Header: "Profile",
            accessor: "profile",
            width: "12%",
        },
        {
            Header: "Id",
            accessor: "id",
            width: "12%",
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
    ]

    const fetchData = async () => {
        let res = await getUsers();
        res = res.map((ele) => {
            const { id, name, email, role } = ele;
            return {
                profile: <Profile name={name} email={email} image={'https://bit.ly/34BY10g'} />,
                id,
                role,
                actions: <MDButton>edit</MDButton>,
            };
        });
        setData(res);
        console.log(res)
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
                                    table={{ columns: dataLabels, rows: data, }}
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
