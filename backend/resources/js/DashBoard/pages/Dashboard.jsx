import MDBox from "../components/MDBox";
import { Card, Grid } from "@mui/material";
import StatisticsCard from "../components/Cards/Statistics";
import DashboardLayout from "../layouts/DashboardLayout";
import Footer from "../components/Footer";
import { useUser } from "../context/APIContext/providers/UserContextProvider";
import { useEffect, useState } from "react";
import { useProduct } from "../context/APIContext/providers/ProductContextProvider";
import { useExercise } from "../context/APIContext/providers/ExerciseContextProvider";
import { Icon } from "@mui/material";
import { useProgram } from "../context/APIContext/providers/ProgramContextProvider";
import SimpleLineChart from "../components/Cards/SimpleLineChart";

const Dashboard = () => {
    const { getTotalUsers, getLastRegistredUsers } = useUser();
    const { getTotalProducts } = useProduct();
    const { getTotalExercises } = useExercise();
    const { getTotalPrograms } = useProgram();

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalExercises, setTotalExercises] = useState(0);
    const [totalPrograms, setTotalPrograms] = useState(0);
    const [users, setUsers] = useState({ labels: [], datasets: [] });

    const fetchData = async () => {
        try {
            let tmp = await getTotalUsers();
            setTotalUsers(tmp);
            tmp = await getTotalProducts();
            setTotalProducts(tmp);
            tmp = await getTotalExercises();
            setTotalExercises(tmp);
            tmp = await getTotalPrograms();
            setTotalPrograms(tmp);

            //Find Week number
            let currentDate = new Date();
            let startDate = new Date(currentDate.getFullYear(), 0, 1);

            var days = Math.floor(
                (currentDate - startDate) / (24 * 60 * 60 * 1000)
            );
            var weekNumber = Math.ceil(days / 7);

            if (weekNumber > 0)
                tmp = await getLastRegistredUsers(weekNumber - 1);
            else tmp = await getLastRegistredUsers(52);

            const labels = tmp.map((ele) => {
                return `${ele.day < 10 ? "0" : ""}${ele.day}/${
                    ele.month < 9 ? "0" : ""
                }${ele.month + 1}`;
            });
            const data = tmp.map((ele) => {
                return ele.count;
            });
            console.log(tmp);
            setUsers({ labels, datasets: { data } });
        } catch (e) {
            console.log(e);
        }
    };
    const salesData = {
        labels: ["21/05", "22/05", "23/05", "24/05", "25/05", "26/05", "27/05"],
        datasets: { data: [10, 15, 8, 100, 20, 3, 14] },
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <DashboardLayout>
            <MDBox pb={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Users"
                                count={totalUsers}
                                icon={<Icon>group</Icon>}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Products"
                                count={totalProducts}
                                icon={<Icon>store</Icon>}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Exercises"
                                count={totalExercises}
                                icon={<Icon>fitness_center</Icon>}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={3} md={6}>
                        <Card>
                            <StatisticsCard
                                title="Programs"
                                count={totalPrograms}
                                icon={<Icon>today</Icon>}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Grid container mb={2} columnSpacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <SimpleLineChart
                        sx={{ position: "relative" }}
                        color="success"
                        title="Users registered"
                        chart={users}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <SimpleLineChart
                        sx={{ position: "relative" }}
                        color="success"
                        title="Total Sales"
                        chart={salesData}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Dashboard;
