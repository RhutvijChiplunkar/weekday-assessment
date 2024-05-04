import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

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
        <div>
            <h2>data</h2>
            <>
                <Grid container spacing={2}>  {/* Add spacing between grid items */}
                    {data["jdList"].map((item, id) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={id}>
                                <Paper variant="elevation">
                                    {item.jobRole}
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
