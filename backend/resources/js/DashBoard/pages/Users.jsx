import { ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "../apiContext/Context/UserContext";
import DashboardLayout from "../components/DashboardLayout";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
const Users = () => {

    const { getUsers } = useUser();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const res = await getUsers();
        console.log(res)
        setData(res);
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <DashboardLayout>
            <MDTypography color='dark'>token : {window.api_token}</MDTypography>

            <MDBox color='dark'>{
                data != null ? data.map((element) => (
                    <ListItem key={element.id}>
                        <MDTypography>Name : {element.name}</MDTypography>
                        <MDTypography>Email : {element.email}</MDTypography>
                        <MDTypography>Password : {element.password}</MDTypography>
                    </ListItem>
                )) : ""
            }</MDBox>

            <MDBox>
                {window.api_token}
            </MDBox>
        </DashboardLayout>
    );
};

export default Users;
