import MDBox from "../components/MDBox";
import { Card, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import StatisticsCard from "../components/Cards/StatisticsCar";
import DashboardLayout from "../layouts/DashboardLayout";
import Footer from "../components/Footer";
const Dashboard = () => {
    return (
        <DashboardLayout>
            <MDBox pb={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={100}
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
                                count={100}
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
                                count={100}
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
                                count={100}
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
