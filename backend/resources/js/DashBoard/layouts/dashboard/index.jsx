import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import axios from "axios";
import { useEffect, useState } from "react";


const fetchClient = () => {
    const defaultOptions = {
        baseURL: "http://127.0.0.1:8000/api/",
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let connector = axios.create(defaultOptions);

    connector.interceptors.request.use((config) => {
        console.log(config)
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });
    return connector;
};


const Dashboard = () => {
    const [data, SetData] = useState("No Data");
    const [connector, SetConnector] = useState(null);

    const updateRequestHandler = () => {
        try {
            console.log(connector.Authorization)
            connector.get("meals").then((response) => console.log(response));

        } catch (error) {
            console.log("there is an Error !");
        }
    }

    useEffect(() => {
        SetConnector(() => fetchClient());
        axios.post('http://127.0.0.1:8000/api/meals', {id:1}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "tok tok"
            },
        })
            .then((response) => {
                console.log('response', response.data)

            })
            .catch((error) => {
                alert('error', error.response)
            })
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                {data}
            </MDBox>
            <MDBox py={3}>
                <MDButton variant="gradient" color="info" onClick={updateRequestHandler}>Button</MDButton>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default Dashboard;
