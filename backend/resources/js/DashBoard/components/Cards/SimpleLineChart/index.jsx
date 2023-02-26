import { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import Card from "@mui/material/Card";

import MDBox from "../../MDBox";
import MDTypography from "../../MDTypography";
import configs from "../LineCharts/configs";


const SimpleLineChart = ({ color, title, description, date, chart }) => {
    const { data, options } = configs(chart.labels || [], chart.datasets || {});

    return (
        <Card sx={{ height: "100%" }}>
            <MDBox padding="0.7rem">
                {useMemo(
                    () => (
                        <MDBox
                            variant="gradient"
                            bgColor={color}
                            borderRadius="lg"
                            coloredShadow={color}
                            py={0}
                            pr={0}
                            mt={0}
                            height="12rem"
                        >
                            <Line data={data} options={options} />
                        </MDBox>
                    ),
                    [chart, color]
                )}
                <MDBox pt={2} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        {description}
                    </MDTypography>
                </MDBox>
            </MDBox>
        </Card>
    );
}

SimpleLineChart.defaultProps = {
    color: "dark",
    description: "",
};

SimpleLineChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    date: PropTypes.string.isRequired,
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default SimpleLineChart;
