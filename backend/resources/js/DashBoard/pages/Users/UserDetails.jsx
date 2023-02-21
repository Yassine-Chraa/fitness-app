import { Card, Divider, Grid, Icon, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import MDAvatar from "../../components/MDAvatar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ScoreIcon from '@mui/icons-material/Score';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CakeIcon from '@mui/icons-material/Cake';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import WcIcon from '@mui/icons-material/Wc';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useMaterialUIController } from "../../context/UIContext";
import ReportsLineChart from "../../components/Cards/LineCharts";
import { useUser } from "../../context/APIContext/providers/UserContextProvider";

const sales = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
};
const tasks = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
};

const UserDetails = ({ selectedID }) => {

    const { getUser } = useUser();

    const [controller, dispatch] = useMaterialUIController();
    const [imgUrl, setImgUrl] = useState(null);

    const [localRole, setLocalRole] = useState('');
    const [localGender, setLocalGender] = useState('');
    const [localLevel, setLocalLevel] = useState('');
    const [localTopGoal, setLocalTopGoal] = useState('');

    const [localName, setLocalName] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [localCountry, setLocalCountry] = useState('');
    const [localCity, setLocalCity] = useState('');

    const [localHeight, setLocalHeight] = useState(0);
    const [localWeight, setLocalWeight] = useState(0);
    const [localScore, setLocalScore] = useState(0);
    const [localBirthDay, setLocalBirthDay] = useState('2000-02-02');
    const [localBio, setLocalBio] = useState('there is no biography for this user .');

    const fetchUser = async () => {
        const user = await getUser(selectedID);
        console.log(user)
        if (user) {
            const { name, email, bio, weight, height, role, country, birth_date, img_url, city, gender, score, work_out_level, top_goal } = user;
            setLocalGender(gender ? gender : genders[0]);
            setLocalRole(role ? role : roles[0]);
            setLocalLevel(work_out_level ? work_out_level : '');
            setLocalTopGoal(top_goal ? top_goal : '');

            setLocalName(name ? name : '');
            setLocalEmail(email ? email : '');
            setLocalCountry(country ? country : '');
            setLocalCity(city ? city : '');

            setLocalScore(() => score ? score : 0);
            setLocalWeight(() => weight ? weight : 0);
            setLocalHeight(() => height ? height : 0);
            setLocalBirthDay(() => birth_date ? birth_date : "2022-02-02");
            setLocalBio(() => bio ? bio : "there is no bio for this user.");

            setImgUrl(() => img_url ? img_url : '');
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])




    return (
        <MDBox>
            <Grid container spacing={3} justifyContent={"center"}>
                {/* =======================( small cards here )======================= */}
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Card style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                        <MDTypography style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            lineHeight: '1.25',
                        }}>
                            User
                        </MDTypography>
                        <MDBox style={{ padding: '0.3rem', display: 'flex', justifyContent: 'center' }}>
                            <MDAvatar variant="gradient" src={'https://bit.ly/34BY10g'} name={'ismail ben alla'} size="xxl" />
                        </MDBox>
                        <MDBox style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <MDBox style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                <MDTypography style={{
                                    fontSize: '0.99rem',
                                    fontWeight: '500',
                                    lineHeight: '1.25',
                                    textAlign: 'center',
                                }}>
                                    {localName}
                                </MDTypography>
                                <MDTypography style={{
                                    fontSize: '0.8rem',
                                    lineHeight: '1.25',
                                    fontWeight: '300',
                                }}>
                                    {localEmail}
                                </MDTypography>
                            </MDBox>
                            <MDBox style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                <IconButton
                                    size="small"
                                    disableRipple
                                    color="success"
                                    variant="outlined"
                                    onClick={() => console.log('view icon')}
                                    sx={{
                                        padding: '7px',
                                        margin: '0.5rem',
                                        transition: 'all 0.4s ease',
                                        ":hover": {
                                            color: '#fff',
                                            backgroundColor: '#333',
                                        }
                                    }}
                                >
                                    <FacebookIcon fontSize='medium' color="secondary" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    disableRipple
                                    color="success"
                                    variant="outlined"
                                    onClick={() => console.log('view icon')}
                                    sx={{
                                        padding: '7px',
                                        margin: '0.5rem',
                                        transition: 'all 0.4s ease',
                                        ":hover": {
                                            color: '#fff',
                                            backgroundColor: '#333',
                                        }
                                    }}
                                >
                                    <TwitterIcon fontSize='medium' color="secondary" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    disableRipple
                                    color="success"
                                    variant="outlined"
                                    onClick={() => console.log('view icon')}
                                    sx={{
                                        padding: '7px',
                                        margin: '0.5rem',
                                        transition: 'all 0.4s ease',
                                        ":hover": {
                                            color: '#fff',
                                            backgroundColor: '#333',
                                        }
                                    }}
                                >
                                    <InstagramIcon fontSize='medium' color="secondary" />
                                </IconButton>
                            </MDBox>
                        </MDBox>
                    </Card>

                    <Card style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                        <MDTypography style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            lineHeight: '1.25',
                        }}>
                            About
                        </MDTypography>
                        {/* -----------------( role )----------------- */}
                        <AboutItem icon={<PsychologyAltIcon fontWeight={'400'} fontSize="small" color="info" />} title={"Role : "} value={localRole} />
                        {/* -----------------( gender )----------------- */}
                        <AboutItem icon={<WcIcon fontSize="small" color="info" />} title={"Gender : "} value={localGender} />
                        {/* -----------------( country )----------------- */}
                        <AboutItem icon={<PublicIcon fontSize="small" color="info" />} title={"Country : "} value={localCountry} />
                        {/* -----------------( city )----------------- */}
                        <AboutItem icon={<LocationCityIcon fontSize="small" color="info" />} title={"City : "} value={localCity} />
                        {/* -----------------( birthday )----------------- */}
                        <AboutItem icon={<CakeIcon fontSize="small" color="info" />} title={"BirthDay : "} value={localBirthDay} />
                    </Card>

                    <Card style={{ padding: '1rem' }}>
                        <MDTypography style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            lineHeight: '1.25',
                        }}>
                            Body Mass Index
                        </MDTypography>
                        <MDBox style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                            <MDBox style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <MDTypography style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    lineHeight: '1.25',
                                    border: 'gray 1px solid',
                                    padding: '0.4rem 1.3rem',
                                    borderRadius: '0.3rem',
                                }}>
                                    H : {localHeight}
                                </MDTypography>
                                <Tooltip title={localWeight / (localHeight * localHeight)}>
                                    <CloseRoundedIcon fontSize="medium" color='secondary'
                                        sx={{
                                            margin: '0 0.1rem',
                                            transition: 'all 0.4s ease',
                                            cursor: 'pointer',
                                            ":hover": {
                                                color: '#fff',
                                                backgroundColor: '#444',
                                            }
                                        }} />
                                </Tooltip>
                                <MDTypography style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    lineHeight: '1.25',
                                    border: 'gray 1px solid',
                                    padding: '0.4rem 1.3rem',
                                    borderRadius: '0.3rem',
                                }}>
                                    W : {localWeight}
                                </MDTypography>
                            </MDBox>
                            <MDBox style={{ marginTop: '1.4rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <Card style={{
                                    padding: '0.4rem 0.5rem',
                                    borderRadius: '0.4rem',
                                    backgroundColor: 'red',
                                }}>
                                    <MDTypography style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        lineHeight: '1.25',
                                    }}>
                                        UNDER
                                    </MDTypography>
                                </Card>
                                <Card style={{
                                    padding: '0.4rem 0.5rem',
                                    borderRadius: '0.4rem',
                                    backgroundColor: 'green',
                                }}>
                                    <MDTypography style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        lineHeight: '1.25',
                                    }}>
                                        NORMAL
                                    </MDTypography>
                                </Card>
                                <Card style={{
                                    padding: '0.4rem 0.5rem',
                                    borderRadius: '0.4rem',
                                    backgroundColor: 'red',
                                }}>
                                    <MDTypography style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        lineHeight: '1.25',
                                    }}>
                                        OVER
                                    </MDTypography>
                                </Card>
                            </MDBox>
                        </MDBox>
                    </Card>

                </Grid>
                {/* =======================( big cards here )======================= */}
                <Grid item xs={8} sm={8} md={8} lg={8} >
                    <Grid container spacing={1}  >
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop:"2rem" }}>

                            <ReportsLineChart
                                color="success"
                                title="daily sales"
                                description={
                                    <>
                                        (<strong>+15%</strong>) increase in today sales.
                                    </>
                                }
                                date="updated 4 min ago"
                                chart={sales}
                            />

                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ padding: '0.6rem' }}>
                                <MDBox style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <MDTypography style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        lineHeight: '1.25',
                                    }}>
                                        Score
                                    </MDTypography>
                                    <ScoreIcon fontSize="medium" />
                                </MDBox>
                                <Divider />
                                <MDTypography style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                    lineHeight: '1.25',
                                }}>
                                    {localScore} Ps
                                </MDTypography>
                            </Card>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ padding: '0.6rem' }}>
                                <MDBox style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <MDTypography style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        lineHeight: '1.25',
                                    }}>
                                        Level
                                    </MDTypography>
                                    <SportsMartialArtsIcon fontSize="medium" />
                                </MDBox>
                                <Divider />
                                <MDTypography style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                    lineHeight: '1.25',
                                }}>
                                    {localLevel}
                                </MDTypography>
                            </Card>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ padding: '0.6rem' }}>
                                <MDBox style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <MDTypography style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        lineHeight: '1.25',
                                    }}>
                                        Top Goal
                                    </MDTypography>
                                    <SportsScoreIcon fontSize="medium" />
                                </MDBox>
                                <Divider />
                                <MDTypography style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 500,
                                    lineHeight: '1.25',
                                }}>
                                    {localTopGoal}
                                </MDTypography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card style={{ padding: '1rem' }}>
                                <MDTypography style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                }}>
                                    Biography
                                </MDTypography>
                                <MDTypography style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    margin: '0.5rem 0',
                                }}>
                                    {localBio}
                                </MDTypography>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </MDBox >
    );
};

export default UserDetails;


export const AboutItem = ({ icon, title, value }) => {
    return (
        <MDBox style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '0.5rem' }}>
            {icon}
            <MDTypography color="info" style={{
                fontSize: '0.8rem',
                fontWeight: '500',
                lineHeight: '1.2',
                marginLeft: '0.5rem',
            }}>
                {title}
            </MDTypography>
            <MDTypography style={{
                fontSize: '0.8rem',
                fontWeight: '500',
                lineHeight: '1.2',
                marginLeft: '0.1rem',
            }}>
                {value}
            </MDTypography>
        </MDBox>
    );
};
