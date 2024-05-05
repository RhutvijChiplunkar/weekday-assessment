import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

function MultiFilterData({ data, /* currentData, */setCurrentData }) {


  const options = ['', 'Remote', 'hybrid', 'In-office'];

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [filters, setFilters] = useState({
    minExp: 0,
    location: '',
    jobRole: '',
    minJdSalary: 0
  });

  const [filteredData, setFilteredData] = useState(data);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    var exp;
    if (name === 'minExp') {
      exp = parseInt(value)
      console.log(name, value);
      setFilters({
        ...filters,
        [name]: exp,
      });
    }
    else if (name === 'minJdSalary') {
      exp = parseInt(value)
      console.log(name, value);
      setFilters({
        ...filters,
        [name]: exp,
      });
    }
    else {
      console.log(name, value);
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  // Function to filter the data based on all selected filters
  const filterData = () => {
    console.log(filters)
    let filtered = [...data];
    for (const filter in filters) {
      if (filters[filter]) {
        filtered = filtered.filter(item => item[filter] === filters[filter]);
      }
    }
    console.log(filtered)
    setFilteredData(filtered);
    setCurrentData(filtered);
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
        <option value="3">3</option>
        <option value="15">15</option>
        <option value="35">35</option>
      </select>

      <Select value={value} onChange={handleChange} placeholder='Select mode'>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <Select
        native
        value={filters.minJdSalary} onChange={handleFilterChange} placeholder='abcd'
      >
        <MenuItem value="" disabled>
          {/* Placeholder text */}
          Select an option
        </MenuItem>
        {/* <option aria-label="None" value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option> */}
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <ul>
        {filteredData.map((item, id) => (
          <li key={item.id}>{item.companyName}</li>
        ))}
      </ul>

    </div>
  );
}

export default MultiFilterData;
