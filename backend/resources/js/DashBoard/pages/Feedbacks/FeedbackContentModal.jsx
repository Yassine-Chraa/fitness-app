import { Card, Grid, Modal } from "@mui/material";
import React, { useEffect, productef, useState, useRef } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import {
    useMaterialUIController,
    setOpenFormHandler,
} from "../../context/UIContext";
import { useFeedback } from "../../context/APIContext/providers/FeedbackContextControler";

const reactions = ['Very Good','Good','Fair','Poor'];
const FeedbackContentModal = ({ selectedID }) => {
    const { getFeedback } = useFeedback();
    const [controller, dispatch] = useMaterialUIController();
    const { openFormHandler } = controller;
    const [feedback, setFeedback] = useState({});
    const cancel = () => {
        setOpenFormHandler(dispatch, false);
    };

    useEffect(() => {
        if (selectedID != 0)
            getFeedback(selectedID).then((res) => {
                setFeedback(res);
            });
    }, [selectedID]);

    return (
        <Modal
            open={openFormHandler}
            onClose={cancel}
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    padding: 2,
                    width: "80%",
                    borderRadius: "10px",
                    boxShadow: "#000e 1px 1px 10px",
                    // overflowY: 'scroll'
                }}
            >
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-5}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" mx={1}>
                        View Feedback
                    </MDTypography>
                </MDBox>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Card
                            style={{
                                padding: "1rem 2rem",
                                marginBottom: "0.5rem",
                                borderRadius: "12px",
                            }}
                        >
                            <MDBox
                                style={{
                                    padding: "0.3rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <MDAvatar
                                    variant="gradient"
                                    src={feedback?.user?.profile}
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
                                        {feedback?.user?.name}
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.8rem",
                                            lineHeight: "1.25",
                                            fontWeight: "300",
                                        }}
                                    >
                                        {feedback?.user?.email}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Card
                            style={{
                                padding: "1rem 2rem",
                                marginBottom: "0.5rem",
                                borderRadius: "12px",
                            }}
                        >
                            <MDTypography
                                style={{
                                    fontSize: "0.99rem",
                                    fontWeight: "500",
                                    lineHeight: "1.25",
                                }}
                            >
                                {feedback?.message}
                            </MDTypography>
                        </Card>
                        <Grid container columnSpacing={2}>
                            <Grid item sm={6} md={3}>
                                <Card
                                    style={{
                                        padding: "1rem 2rem",
                                        marginBottom: "0.5rem",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        Feedback 1
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            color:'#000',
                                            textAlign:'center',
                                            marginTop: 20,
                                            backgroundColor: 'orange',
                                            padding: 2
                                        }}
                                    >
                                        {reactions[feedback.f1-1]}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={3}>
                                <Card
                                    style={{
                                        padding: "1rem 2rem",
                                        marginBottom: "0.5rem",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        Feedback 2
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            color:'#000',
                                            textAlign:'center',
                                            marginTop: 20,
                                            backgroundColor: 'orange',
                                            padding: 2
                                        }}
                                    >
                                        {reactions[feedback.f2-1]}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={3}>
                                <Card
                                    style={{
                                        padding: "1rem 2rem",
                                        marginBottom: "0.5rem",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        Feedback 3
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            color:'#000',
                                            textAlign:'center',
                                            marginTop: 20,
                                            backgroundColor: 'orange',
                                            padding: 2
                                        }}
                                    >
                                        {reactions[feedback.f3-1]}
                                    </MDTypography>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={3}>
                                <Card
                                    style={{
                                        padding: "1rem 2rem",
                                        marginBottom: "0.5rem",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <MDTypography
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                        }}
                                    >
                                        Feedback 4
                                    </MDTypography>
                                    <MDTypography
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: "600",
                                            lineHeight: "1.25",
                                            color:'#000',
                                            textAlign:'center',
                                            marginTop: 20,
                                            backgroundColor: 'orange',
                                            padding: 2
                                        }}
                                    >
                                        {reactions[feedback.f4-1]}
                                    </MDTypography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <MDBox
                    display="flex"
                    justifyContent="space-around"
                    mx={2}
                    mt={2}
                >
                    <MDButton
                        onClick={cancel}
                        variant="gradient"
                        color="warning"
                        style={{
                            padding: "2px",
                            minWidth: "6rem",
                            maxWidth: "8rem",
                            flex: 1,
                        }}
                    >
                        Cancel
                    </MDButton>
                </MDBox>
            </Card>
        </Modal>
    );
};

export default FeedbackContentModal;
