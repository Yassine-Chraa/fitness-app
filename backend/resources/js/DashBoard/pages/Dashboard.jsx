import MDBox from "../components/MDBox";
import { Card, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import StatisticsCard from "../components/Cards/StatisticsCar";
import { useEffect, useState } from "react";
import { useUser } from "../apiContext/Context/UserContext";

const Dashboard = () => {
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
        <MDBox py={3}>
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
            {/* <p>{window.api_token}</p>

            <p>{count(data) != 0 ? data[0].name+' / '+data[0].prix : null}</p> */}

            <MDBox>
                {window.api_token}
            </MDBox>
        </MDBox>
    );
};

export default Dashboard;
