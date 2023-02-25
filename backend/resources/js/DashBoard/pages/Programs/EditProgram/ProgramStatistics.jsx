import { Grid } from "@mui/material";
import SimpleLineChart from "../../../components/Cards/SimpleLineChart";


const ProgramStatistics = ({ firstChart, secondChart }) => {

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12}>

                <SimpleLineChart
                    sx={{ position: "relative" }}
                    color="success"
                    title="Title Here"
                    description={
                        <>
                            (<strong>+15%</strong>) increase in today sales.
                        </>
                    }
                    date="updated 4 min ago"
                    chart={firstChart}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <SimpleLineChart
                    sx={{ position: "relative" }}
                    color="success"
                    title="Title Here"
                    description={
                        <>
                            (<strong>+15%</strong>) increase in today sales.
                        </>
                    }
                    date="updated 4 min ago"
                    chart={secondChart}
                />
            </Grid>
        </>
    );
};

export default ProgramStatistics;
