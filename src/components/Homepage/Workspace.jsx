import {useState} from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';

const Workspace = (props) => {
    const [channels, setChannels] = useState([]);
    
    return (
        <div className='workspace-section'>
            <Textbox></Textbox>
            <MessageArea></MessageArea>
            <NavComms 
                channels={channels}
                setChannels={setChannels}
                user={props.user}
                API_URL={props.API_URL}
            ></NavComms>
        </div>
    );
};

export default Workspace;