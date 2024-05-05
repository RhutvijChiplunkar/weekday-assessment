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
import { Select, MenuItem } from '@mui/material';
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

function MultiFilterData1({ data }) {
    const [filters, setFilters] = useState({
        minExp: 0,
        location: '',
        jobRole: '',
        minJdSalary: 0
    });

    const [filteredData, setFilteredData] = useState(data);
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Function to filter the data based on all selected filters
    const filterData = () => {
        let filtered = [...data];
        for (const filter in filters) {
            if (filters[filter]) {
                filtered = filtered.filter(item => item[filter] === filters[filter]);
            }
        }
        setFilteredData(filtered);
    };

    // Call filterData whenever a filter changes
    React.useEffect(() => {
        filterData();
    }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>

            <select name="location" value={filters.location} onChange={handleFilterChange}>
                <option value="">All locations</option>
                <option value="delhi ncr">delhi ncr</option>
                <option value="mumbai">mumbai</option>
                <option value="remote">remote</option>
                <option value="chennai">chennai</option>
            </select>

            <select name="jobRole" value={filters.jobRole} onChange={handleFilterChange}>
                <option value="">All roles</option>
                <option value="frontend">frontend</option>
                <option value="ios">ios</option>
                <option value="android">android</option>
            </select>

            <select name="minExp" value={filters.minExp} onChange={handleFilterChange}>
                <option value="">Years of experience</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>

            <select name="minJdSalary" value={filters.minJdSalary} onChange={handleFilterChange}>
                <option value="">Min Salary</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>


            {/* <ul>
        {filteredData.map((item, id) => (
          <li key={item.id}>{item.companyName}</li>
        ))}
      </ul> */}

        </div>
    );
}

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

    const options = ['Remote', 'hybrid', 'In-office'];

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // This state is used to store fetched data from API
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');

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
            <MultiFilterData1 data={data["jdList"]} />
            <TextField label="Search company name" variant="standard" onChange={(e) => setSearch(e.target.value)} />
            {/* <div className='filters-all'>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>

                    <Select value={value} onChange={handleChange} placeholder='Select mode'>
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField label="Search company name" variant="standard" onChange={(e) => setSearch(e.target.value)} />
                    <MultiFilterData data={data["jdList"]} />
                </Box>
            </div> */}
            <>
                <Grid container spacing={2}>  {/* Add spacing between grid items */}
                    {data["jdList"].filter((item) => {
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
