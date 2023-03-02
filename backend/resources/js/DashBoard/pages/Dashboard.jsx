import MDBox from "../components/MDBox";
import { Card, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import StatisticsCard from "../components/Cards/Statistics";
import DashboardLayout from "../layouts/DashboardLayout";
import Footer from "../components/Footer";
import { useUser } from "../context/APIContext/providers/UserContextProvider";
import { useEffect, useState } from "react";
const Dashboard = () => {
    const [total,setTotal] = useState(0);
    const { getTotal } = useUser();

    const fetchData = async () => {
        try {
            const data = await getTotal();
            setTotal(data)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData();
    },[]);
    return (
        <DashboardLayout>
            <MDBox pb={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={total}
                                percentage={{
                                    label: "than yesterday",
                                    amount: "-5%",
                                    color: "error",
                                }}
                                icon={
                                    <BarChartIcon
                                        fontSize="medium"
                                        color="inherit"
                                    />
                                }
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={total}
                                percentage={{
                                    label: "than yesterday",
                                    amount: "-5%",
                                    color: "error",
                                }}
                                icon={
                                    <BarChartIcon
                                        fontSize="medium"
                                        color="inherit"
                                    />
                                }
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={total}
                                percentage={{
                                    label: "than yesterday",
                                    amount: "-5%",
                                    color: "error",
                                }}
                                icon={
                                    <BarChartIcon
                                        fontSize="medium"
                                        color="inherit"
                                    />
                                }
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={total}
                                percentage={{
                                    label: "than yesterday",
                                    amount: "-5%",
                                    color: "error",
                                }}
                                icon={
                                    <BarChartIcon
                                        fontSize="medium"
                                        color="inherit"
                                    />
                                }
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default Dashboard;
