import React from 'react';
import './Homepage.css'
import SearchBox from '../components/Homepage/SearchBox';
import Navbar from '../components/Homepage/Navbar'
import Workspace from '../components/Homepage/Workspace';

const Homepage = () => {
    return (
        <div className='homepage'>
            <SearchBox></SearchBox>
            <Navbar></Navbar>
            <Workspace></Workspace>
        </div>
    );
};

export default Homepage;