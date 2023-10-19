import React from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';

const Workspace = () => {
    return (
        <div className='workspace-section'>
            <Textbox></Textbox>
            <NavComms></NavComms>
        </div>
    );
};

export default Workspace;