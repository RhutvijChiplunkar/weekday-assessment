import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material';
import './App.css';
import {
    createTheme,
    ThemeProvider,
    alpha,
    getContrastRatio,
} from '@mui/material/styles';
import { Box } from '@mui/material';
import { AccountCircleRounded } from '@mui/icons-material';
import ExpandableParagraph from './ExpandableParagraph';
import MultiFilterData from './MultiFilterData';


//colour scheme for the button
const violetBase = '#FFFFFF';
const violetMain = alpha(violetBase, 1);

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
        "limit": 10,
        "offset": 0
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };

    // This state is used to store fetched data from API
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [currentData,setCurrentData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
            setData(response.data);
            setCurrentData(response.data["jdList"]);
        };

        fetchData();

    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className='grids'>
            <div className='filters-all'>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <TextField label="Search company name" variant="standard" onChange={(e) => setSearch(e.target.value)} />
                    <MultiFilterData data={data["jdList"]} currentData={currentData} setCurrentData={setCurrentData} />
                </Box>
            </div>
            <>
                <Grid container spacing={2}> 
                    {currentData.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.companyName.toLowerCase().includes(search);
                    }).
                        map((item, id) => {
                            return (
                                <Grid item xs={12} md={6} lg={4} key={id}>

                                    <Paper variant="elevation" className='indi-card'>
                                        <div className='card-top'>
                                            <p className='posting-days'>⏳ Posted 5 Days ago</p>
                                        </div>
                                        <CardContent className='card'>
                                            {/*Comapny logo, name, role and location */}
                                            <div className='company-info'>
                                                <Box>
                                                    <Grid item container spacing={0}>
                                                        <Grid item xs={4}>
                                                            <img src={item.logoUrl} alt="Image" />
                                                        </Grid>
                                                        <Grid item xs={8}>
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
                                                <p>Estimated Salary: {item.minJdSalary == null ? 0 : item.minJdSalary} - {item.maxJdSalary} LPA<span aria-label="Offered salary range"> ✅</span><br /></p>
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                <p>About Company:</p>
                                            </Typography>
                                            <Typography color="text.secondary">
                                                <div>
                                                    <p>About us:</p>
                                                    <ExpandableParagraph
                                                        text={item.jobDetailsFromCompany}
                                                        maxLength={125}
                                                    />
                                                </div>
                                            </Typography>
                                            <Typography variant="body2">
                                                <div>
                                                    <h3>Minimum experience</h3>
                                                    <h4>{item.minExp == null ? 0 : item.minExp} Years</h4>
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
