import React, { useState } from 'react';

function MultiFilterData({ data, setCurrentData }) {

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

    //Different conditions based on filter
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

  // Call filterData whenever a filter changes to render again
  React.useEffect(() => {
    filterData();
  }, [filters]); 

  return (
    <div>

      <select className='abc' name="location" value={filters.location} onChange={handleFilterChange}>
        <option value="">All locations</option>
        <option value="delhi ncr">delhi ncr</option>
        <option value="mumbai">mumbai</option>
        <option value="remote">remote</option>
        <option value="chennai">chennai</option>
        <option value="bangalore">bangalore</option>
      </select>

      <select className='abc' name="jobRole" value={filters.jobRole} onChange={handleFilterChange}>
        <option value="">All roles</option>
        <option value="frontend">frontend</option>
        <option value="ios">ios</option>
        <option value="android">android</option>
        <option value="backend">backend</option>
        <option value="tech lead">tech lead</option>
      </select>

      <select className='abc' name="minExp" value={filters.minExp} onChange={handleFilterChange} aria-placeholder='abcdef'>
        <option value="">Minimum years of experience</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <select className='abc' name="minJdSalary" value={filters.minJdSalary} onChange={handleFilterChange}>
        <option value="">Min Base Pay</option>
        <option value="3">3</option>
        <option value="15">15</option>
        <option value="23">23</option>
        <option value="26">26</option>
        <option value="35">35</option>
        <option value="61">61</option>
        <option value="64">64</option>
        <option value="100">100</option>
      </select>

    </div>
  );
}

export default MultiFilterData;
