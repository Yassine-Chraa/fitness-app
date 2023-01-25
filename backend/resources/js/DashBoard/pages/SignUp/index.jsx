import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import BasicLayout from "../../layouts/auth-layouts/BasicLayout";
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import { Checkbox } from "@mui/material";
const SignUp = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password,setConfirmPassword ] = useState("");
    const [isAgree, setIsAgree] = useState(false);

    return (
        <BasicLayout image={bgImage}>
            <Card sx={{ marginTop: 6, marginBottom: 4, padding: 2, maxWidth: 800, minWidth: 340, flex: 1 }}>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-6}
                    p={2}
                    mb={4}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Join us today
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Enter your email and password to register
                    </MDTypography>
                </MDBox>

                <Grid container spacing={2} >
                    <Grid item xs={11} sm={12} md={6} lg={6} xl={6}>
                        <MDBox component="form" role="form">
                            <MDBox mb={3}>
                                <MDInput type="text" label="Name" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={3}>
                                <MDInput type="email" label="Email" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>
                    <Grid item xs={11} sm={12} md={6} lg={6} xl={6}>
                        <MDBox component="form" role="form">
                            <MDBox mb={3}>
                                <MDInput type="password" label="Password" variant="standard" fullWidth />
                            </MDBox>
                            <MDBox mb={3}>
                                <MDInput type="password" label="Confirm Password" variant="standard" fullWidth />
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>

                <MDBox mt={2} display="flex" alignItems="center" ml={-1}>
                    <Checkbox style={{ marginRight: "1rem" }} />
                    <MDTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                        I agree the
                    </MDTypography>
                    <MDTypography
                        component="a"
                        href="#"
                        variant="button"
                        fontWeight="bold"
                        color="info"
                        textGradient
                        style={{ marginLeft: "3px" }}
                    >
                        Terms and Conditions
                    </MDTypography>
                </MDBox>

                <MDBox fullWidth display="flex" justifyContent="center" mt={3} mb={3}>
                    <MDButton variant="gradient" color="info" style={{ padding: "1rem", minWidth: "10rem", maxWidth: "15rem", flex: 1 }}>
                        sign in
                    </MDButton>
                </MDBox>
            </Card>
        </BasicLayout >
    );
}

export default SignUp;
