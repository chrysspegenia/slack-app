import {useEffect, useState} from 'react';
import './Workspace.css'
import Textbox from './Textbox';
import NavComms from './NavComms';
import MessageArea from './MessageArea';
import axios from 'axios';

const Workspace = (props) => {
    const {user, API_URL} = props
    const [channels, setChannels] = useState([]);
    const [directMessageUsers, setDirectMessageUsers] = useState([]);
    const [messageAreaName, setMessageAreaName] = useState("Welcome to Slack")
    const [sendMessage, setSendMessage] = useState("");
    const [messageTarget, setMessageTarget] = useState({'receiver_id':"", 
                                                        'receiver_class':''})
    const{ receiver_id, receiver_class} = messageTarget
    const[displayConversation, setDisplayConversation] = useState([])

    //Need proper dependency to display conversation properly
    useEffect(() => {
        handleDisplayConversation()
    }, [receiver_id])

    async function handleDisplayConversation(){
        try {
            const response = await axios.get(`${API_URL}/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`, {
                headers: {
                    "access-token": user.accessToken,
                    client: user.client,
                    expiry: user.expiry,
                    uid: user.uid
                }
            });
            const { data } = response;
            if(data){
                setDisplayConversation(data.data);
            }
        } catch (error) {
            if(error){
                return alert(error);
            }
        }
    }

    return (
        <div className='workspace-section'>
            <Textbox
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                messageTarget={messageTarget}
                user={user}
                API_URL={API_URL}
                handleDisplayConversation={handleDisplayConversation}
            ></Textbox>
            <MessageArea
                user={user}
                API_URL={API_URL}
                messageAreaName={messageAreaName}
                messageTarget={messageTarget}
                handleDisplayConversation={handleDisplayConversation}
                displayConversation={displayConversation}
            ></MessageArea>
            <NavComms 
                setMessageTarget={setMessageTarget}
                channels={channels}
                setChannels={setChannels}
                directMessageUsers={directMessageUsers}
                setDirectMessageUsers={setDirectMessageUsers}
                setMessageAreaName={setMessageAreaName}
                user={user}
                API_URL={API_URL}
                handleDisplayConversation={handleDisplayConversation}
            ></NavComms>
        </div>
    );
};

export default Workspace;