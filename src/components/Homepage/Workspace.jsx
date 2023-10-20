import React from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';

const Workspace = () => {
    return (
        <div className='workspace-section'>
            <Textbox></Textbox>
            <MessageArea></MessageArea>
            <NavComms></NavComms>
        </div>
    );
};

export default Workspace;