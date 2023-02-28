import { Card, Divider, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import CakeIcon from "@mui/icons-material/Cake";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import WcIcon from "@mui/icons-material/Wc";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useUser } from "../../context/APIContext/providers/UserContextProvider";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const Profile = () => {
    const { id } = useParams();
    const { getUser } = useUser();
    const [user, setUser] = useState({});
    const fetchUser = async () => {
        const data = await getUser(id);
        setUser(data);
    };
    const {
        name,
        email,
        bio,
        gender,
        weight,
        height,
        BMI,
        body_fat,
        role,
        birth_date,
        img_url,
        workout_level,
        top_goal,
    } = user;
    console.log(user);
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <DashboardLayout>
            <MDBox>
                <Grid container spacing={3} justifyContent={"center"}>
                    {/* =======================( small cards here )======================= */}
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Card
                            style={{ padding: "1rem", marginBottom: "0.5rem" }}
                        >
                            <MDTypography
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    lineHeight: "1.25",
                                }}
                            >
                                User
                            </MDTypography>
                            <MDBox
                                style={{
                                    padding: "0.3rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <MDAvatar
                                    variant="gradient"
                                    src={"https://bit.ly/34BY10g"}
                                    name={"ismail ben alla"}
                                    size="xxl"
                                />
                            </MDBox>
                            <MDBox
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <MDBox
                                    style={{
                                        marginTop: "1rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "0.99rem",
                                            fontWeight: "500",
                                            lineHeight: "1.25",
                                            textAlign: "center",
                                        }}
                                    >
                                        {name}
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.8rem",
                                            lineHeight: "1.25",
                                            fontWeight: "300",
                                            textAlign: 'center'
                                        }}
                                    >
                                        {email}
                                    </MDTypography>
                                    <Grid container columnGap={1} mt={1}>
                                        <MDTypography
                                            item
                                            style={{
                                                backgroundColor: "blue",
                                                color: "rgb(255, 255, 255)",
                                                borderRadius: 6,
                                                padding: "2px 8px",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            {workout_level}
                                        </MDTypography>
                                        <MDTypography
                                            item
                                            style={{
                                                backgroundColor: "orange",
                                                color: "rgb(255, 255, 255)",
                                                borderRadius: 6,
                                                padding: "2px 8px",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            {top_goal}
                                        </MDTypography>
                                    </Grid>
                                </MDBox>
                            </MDBox>
                        </Card>

                        <Card
                            style={{ padding: "1rem", marginBottom: "0.5rem" }}
                        >
                            <MDTypography
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    lineHeight: "1.25",
                                }}
                            >
                                About
                            </MDTypography>
                            {/* -----------------( role )----------------- */}
                            <AboutItem
                                icon={
                                    <PsychologyAltIcon
                                        fontWeight={"400"}
                                        fontSize="small"
                                        color="info"
                                    />
                                }
                                title={"Role : "}
                                value={role}
                            />
                            {/* -----------------( gender )----------------- */}
                            <AboutItem
                                icon={<WcIcon fontSize="small" color="info" />}
                                title={"Gender : "}
                                value={gender}
                            />
                            {/* -----------------( birthday )----------------- */}
                            <AboutItem
                                icon={
                                    <CakeIcon fontSize="small" color="info" />
                                }
                                title={"BirthDay : "}
                                value={birth_date}
                            />
                        </Card>
                    </Grid>
                    {/* =======================( big cards here )======================= */}
                    <Grid item xs={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Card style={{ padding: "1rem" }}>
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        Statistics
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Card style={{ padding: "0.6rem" }}>
                                    <MDBox
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            Weight
                                        </MDTypography>
                                        <SportsScoreIcon fontSize="medium" />
                                    </MDBox>
                                    <Divider />
                                    <MDTypography
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        {weight + " (KG)"}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Card style={{ padding: "0.6rem" }}>
                                    <MDBox
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            Height
                                        </MDTypography>
                                        <SportsScoreIcon fontSize="medium" />
                                    </MDBox>
                                    <Divider />
                                    <MDTypography
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        {height + " (m)"}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Card style={{ padding: "0.6rem" }}>
                                    <MDBox
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            Body Fat
                                        </MDTypography>
                                        <SportsScoreIcon fontSize="medium" />
                                    </MDBox>
                                    <Divider />
                                    <MDTypography
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        {body_fat + "%"}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Card style={{ padding: "0.6rem" }}>
                                    <MDBox
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            BMI
                                        </MDTypography>
                                        <SportsScoreIcon fontSize="medium" />
                                    </MDBox>
                                    <Divider />
                                    <MDTypography
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        {BMI?.toFixed(2)}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card style={{ padding: "1rem" }}>
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Biography
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: "500",
                                            margin: "0.5rem 0",
                                        }}
                                    >
                                        {bio}
                                    </MDTypography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default Profile;

export const AboutItem = ({ icon, title, value }) => {
    return (
        <MDBox
            style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "0.5rem",
            }}
        >
            {icon}
            <MDTypography
                color="info"
                style={{
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                    marginLeft: "0.5rem",
                }}
            >
                {title}
            </MDTypography>
            <MDTypography
                style={{
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                    marginLeft: "0.1rem",
                }}
            >
                {value}
            </MDTypography>
        </MDBox>
    );
};
