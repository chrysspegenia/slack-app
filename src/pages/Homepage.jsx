import React from 'react';
import './Homepage.css'
import Textbox from '../components/Homepage/Textbox';
import SearchBox from '../components/Homepage/SearchBox';
import Navbar from '../components/Homepage/Navbar'

const Homepage = () => {
    return (
        <div className='homepage'>
            <SearchBox></SearchBox>
            <Textbox></Textbox>
            <Navbar></Navbar>
        </div>
    );
};

export default Homepage;