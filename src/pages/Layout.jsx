import React from 'react';
import Textbox from '../components/Textbox';
import SearchBox from '../components/SearchBox';
import Navbar from '../components/Navbar'

const Layout = () => {
    return (
        <div>
            <SearchBox></SearchBox>
            <Textbox></Textbox>
            <Navbar></Navbar>
        </div>
    );
};

export default Layout;