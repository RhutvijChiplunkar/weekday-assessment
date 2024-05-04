import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './App.css';

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

    const [data, setData] = useState(null); // State to store fetched data

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions); // Replace with your API URL
            setData(response.data);
        };

        fetchData();

    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className='grids'>
            <h2>data</h2>
            <>
                <Grid container spacing={2}>  {/* Add spacing between grid items */}
                    {data["jdList"].map((item, id) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={id}>
                                <Paper variant="elevation">
                                    {/* {item.jobRole} */}
                                    <CardContent className='card'>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            <p>Estimated Salary: {item.minJdSalary} - {item.maxJdSalary} LPA<span aria-label="Offered salary range" class=""> ✅</span><br /></p>
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            <p class="MuiTypography-root MuiTypography-body1 css-1hw7dw8">About Company:</p>
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            <div>
                                                <p>About us:</p>
                                                <p>{item.jobDetailsFromCompany}</p>
                                            </div>
                                        </Typography>
                                        <Typography variant="body2">
                                            <div>
                                                <h3>Minimum experience</h3>
                                                <h4>{item.minExp} Years</h4>
                                            </div>
                                        </Typography>
                                        <Typography>
                                            <div className='btn-div'>
                                                <Button className='btn'>⚡ Easy Apply</Button>
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
