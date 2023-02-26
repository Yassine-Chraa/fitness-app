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
                                        }}
                                    >
                                        {email}
                                    </MDTypography>
                                </MDBox>
                                <MDBox
                                    style={{
                                        flex: 1,
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        disableRipple
                                        color="success"
                                        variant="outlined"
                                        onClick={() => console.log("view icon")}
                                        sx={{
                                            padding: "7px",
                                            margin: "0.5rem",
                                            transition: "all 0.4s ease",
                                            ":hover": {
                                                color: "#fff",
                                                backgroundColor: "#333",
                                            },
                                        }}
                                    >
                                        <FacebookIcon
                                            fontSize="medium"
                                            color="secondary"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        disableRipple
                                        color="success"
                                        variant="outlined"
                                        onClick={() => console.log("view icon")}
                                        sx={{
                                            padding: "7px",
                                            margin: "0.5rem",
                                            transition: "all 0.4s ease",
                                            ":hover": {
                                                color: "#fff",
                                                backgroundColor: "#333",
                                            },
                                        }}
                                    >
                                        <TwitterIcon
                                            fontSize="medium"
                                            color="secondary"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        disableRipple
                                        color="success"
                                        variant="outlined"
                                        onClick={() => console.log("view icon")}
                                        sx={{
                                            padding: "7px",
                                            margin: "0.5rem",
                                            transition: "all 0.4s ease",
                                            ":hover": {
                                                color: "#fff",
                                                backgroundColor: "#333",
                                            },
                                        }}
                                    >
                                        <InstagramIcon
                                            fontSize="medium"
                                            color="secondary"
                                        />
                                    </IconButton>
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

                        <Card style={{ padding: "1rem" }}>
                            <MDTypography
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    lineHeight: "1.25",
                                }}
                            >
                                Body Mass Index
                            </MDTypography>
                            <MDBox
                                style={{
                                    marginTop: "1rem",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    flexDirection: "column",
                                }}
                            >
                                <MDBox
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            border: "gray 1px solid",
                                            padding: "0.4rem 1.3rem",
                                            borderRadius: "0.3rem",
                                        }}
                                    >
                                        H : {height}
                                    </MDTypography>
                                    <Tooltip title={weight / (height * height)}>
                                        <CloseRoundedIcon
                                            fontSize="medium"
                                            color="secondary"
                                            sx={{
                                                margin: "0 0.1rem",
                                                transition: "all 0.4s ease",
                                                cursor: "pointer",
                                                ":hover": {
                                                    color: "#fff",
                                                    backgroundColor: "#444",
                                                },
                                            }}
                                        />
                                    </Tooltip>
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            border: "gray 1px solid",
                                            padding: "0.4rem 1.3rem",
                                            borderRadius: "0.3rem",
                                        }}
                                    >
                                        W : {weight}
                                    </MDTypography>
                                </MDBox>
                                <MDBox
                                    style={{
                                        marginTop: "1.4rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Card
                                        style={{
                                            padding: "0.4rem 0.5rem",
                                            borderRadius: "0.4rem",
                                            backgroundColor: "red",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "0.9rem",
                                                fontWeight: "500",
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            UNDER
                                        </MDTypography>
                                    </Card>
                                    <Card
                                        style={{
                                            padding: "0.4rem 0.5rem",
                                            borderRadius: "0.4rem",
                                            backgroundColor: "green",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "0.9rem",
                                                fontWeight: "500",
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            NORMAL
                                        </MDTypography>
                                    </Card>
                                    <Card
                                        style={{
                                            padding: "0.4rem 0.5rem",
                                            borderRadius: "0.4rem",
                                            backgroundColor: "red",
                                        }}
                                    >
                                        <MDTypography
                                            style={{
                                                fontSize: "0.9rem",
                                                fontWeight: "500",
                                                lineHeight: "1.25",
                                            }}
                                        >
                                            OVER
                                        </MDTypography>
                                    </Card>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                    {/* =======================( big cards here )======================= */}
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
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
                            <Grid item xs={4} sm={4} md={4} lg={4}>
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
                                            Level
                                        </MDTypography>
                                        <SportsMartialArtsIcon fontSize="medium" />
                                    </MDBox>
                                    <Divider />
                                    <MDTypography
                                        style={{
                                            fontSize: "1.2rem",
                                            fontWeight: 500,
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        {workout_level}
                                    </MDTypography>
                                </Card>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4} lg={4}>
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
                                            Top Goal
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
                                        {top_goal}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
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

                            <Grid item xs={12} sm={12} md={12} lg={12}>
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
