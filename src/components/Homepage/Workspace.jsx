import React from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';

const Workspace = (props) => {
    return (
        <div className='workspace-section'>
            <Textbox></Textbox>
            <MessageArea></MessageArea>
            <NavComms channels={props.channels}></NavComms>
        </div>
    );
};

export default Workspace;