import axios from 'axios'
import React, { useState, useEffect } from 'react';

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
    var x;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON',requestOptions); // Replace with your API URL
            setData(response.data);
        };

        fetchData();

    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h2>data</h2>
            {data["jdList"].map((item,id)=>{
                return (<h1 key={id}>{item.jdUid}</h1>)
            })}

        </div>
    )
}

export default Home
