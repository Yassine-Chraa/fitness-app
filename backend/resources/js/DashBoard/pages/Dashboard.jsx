import MDBox from "../components/MDBox";
import { Card, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import StatisticsCard from "../components/Cards/StatisticsCar";
import { useProduct } from "../apiContext/Context/ProductContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { getProducts } = useProduct();
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const res = await getProducts();
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
            <p>{window.api_token}</p>

            <p>{data.length != 0 ? data[0].name+' / '+data[0].prix : null}</p>
        </MDBox>
    );
};

export default Dashboard;
