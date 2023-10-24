import {useState} from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';

const Workspace = (props) => {
    const {user, API_URL} = props
    const [channels, setChannels] = useState([]);
    const [sendMessage, setSendMessage] = useState("");
    
    return (
        <div className='workspace-section'>
            <Textbox
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                user={user}
                API_URL={API_URL}
            ></Textbox>
            <MessageArea
                user={user}
                API_URL={API_URL}
            ></MessageArea>
            <NavComms 
                channels={channels}
                setChannels={setChannels}
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                user={user}
                API_URL={API_URL}
            ></NavComms>
        </div>
    );
};

export default Workspace;