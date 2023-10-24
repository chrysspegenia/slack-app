import {useState} from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';

const Workspace = (props) => {
    const {user, API_URL} = props
    const [channels, setChannels] = useState([]);
    const [messageAreaName, setMessageAreaName] = useState("Welcome to Slack")
    const [sendMessage, setSendMessage] = useState("");
    const [messageTarget, setMessageTarget] = useState({'receiver_id':'', 
                                                        'receiver_class':''})
    
    return (
        <div className='workspace-section'>
            <Textbox
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                messageTarget={messageTarget}
                user={user}
                API_URL={API_URL}
            ></Textbox>
            <MessageArea
                user={user}
                API_URL={API_URL}
                messageAreaName={messageAreaName}
            ></MessageArea>
            <NavComms 
                messageTarget={messageTarget}
                setMessageTarget={setMessageTarget}
                channels={channels}
                setChannels={setChannels}
                setMessageAreaName={setMessageAreaName}
                user={user}
                API_URL={API_URL}
            ></NavComms>
        </div>
    );
};

export default Workspace;