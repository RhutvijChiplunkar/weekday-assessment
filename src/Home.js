import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './App.css';
import {
    createTheme,
    ThemeProvider,
    alpha,
    getContrastRatio,
} from '@mui/material/styles';
import { Box, makeStyles } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';
import ExpandableParagraph from './ExpandableParagraph';



const violetBase = '#FFFFFF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

const Home = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "limit": 947,
        "offset": 0
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };

    // This state is used to store fetched data from API
    const [data, setData] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions); 
            setData(response.data);
        };

        fetchData();

    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className='grids'>
            <>
                <Grid container spacing={2}>  {/* Add spacing between grid items */}
                    {data["jdList"].map((item, id) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={id}>

                                <Paper variant="elevation" className='indi-card'>
                                    {/* {item.jobRole} */}
                                    <CardContent className='card'>
                                        {/*Comapny logo, name, role and location */}
                                        <div className='company-info'>
                                            <Box>
                                                <Grid container spacing={0}>
                                                    <Grid xs={4}>
                                                        <img src={item.logoUrl} alt="Image" />
                                                    </Grid>
                                                    <Grid xs={8}>
                                                        <div>
                                                            <h2 className='company-name'>{item.companyName}</h2>
                                                            <h3 className='company-jobrole'>{item.jobRole}</h3>
                                                            <p>{item.location}</p>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            <p>Estimated Salary: {item.minJdSalary} - {item.maxJdSalary} LPA<span aria-label="Offered salary range" class=""> ✅</span><br /></p>
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            <p>About Company:</p>
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            <div>
                                                <p>About us:</p>
                                                {/* <p>{item.jobDetailsFromCompany}</p> */}
                                                <ExpandableParagraph
                                                    text={item.jobDetailsFromCompany}
                                                    maxLength={125} // Set the maximum length of characters to display
                                                />
                                            </div>
                                        </Typography>
                                        <Typography variant="body2">
                                            <div>
                                                <h3>Minimum experience</h3>
                                                <h4>{item.minExp} Years</h4>
                                            </div>
                                        </Typography>
                                        <Typography>
                                            <div className='btn-div-1'>
                                                <Button className='btn'>⚡ Easy Apply</Button>
                                            </div>
                                        </Typography>
                                        <Typography>
                                            <div className='btn-div-2'>
                                                <ThemeProvider theme={theme}>
                                                    <Button color='violet' className='btn-2' startIcon={<AccountCircleRounded />} >Unlock referral ask</Button>
                                                </ThemeProvider>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Paper>

                            </Grid>

                        )
                    })}

                </Grid>
            </>


        </div >
    )
}

export default Home
