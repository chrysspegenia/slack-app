import {useEffect, useState, useRef} from 'react';
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
    const[displayConversation, setDisplayConversation] = useState([]);
    const [showSearchUserInput, setShowSearchUserInput] = useState(false);
    const [showConversationArea, setShowConversationArea] = useState(false);

    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    const [shouldUpdateDMList, setShouldUpdateDMList] = useState(false);

    const messageContent = useRef(null);

    useEffect(() => {
        if(shouldScrollToBottom){
            scrollToBottom()
            setShouldScrollToBottom(false)
          }
    }, [shouldScrollToBottom])
    
    useEffect(() => {
        handleDisplayConversation()
        console.log(shouldScrollToBottom)
    }, [receiver_id, shouldUpdateDMList])
    //receiver_id changes when clicking a new channel or DM target
    //sendMessage changes when sending a message

    const scrollToBottom = () => {
        if (messageContent.current) {
            //sets the scroll position of the chat container to its total height, effectively scrolling it to the bottom and revealing the latest messages
            messageContent.current.scrollTop = messageContent.current.scrollHeight;
        }
      };

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
        finally {
            timeScrollBottom()
        }
    }

    function timeScrollBottom(){
        const delayedScroll = setInterval(() =>{
                setShouldScrollToBottom(true)
            },100);

        setTimeout(() => clearInterval(delayedScroll), 1000)
    }

    function handleMessageTargetDM(user){
        setShowSearchUserInput(false)
        setMessageTarget({
            'receiver_id': user.id,
            'receiver_class':'User',
        })
        setMessageAreaName(user.email)
        setShowConversationArea(true)
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
                showConversationArea={showConversationArea}
                setShouldScrollToBottom={setShouldScrollToBottom}
                setShouldUpdateDMList={setShouldUpdateDMList}
            ></Textbox>
            <MessageArea
                user={user}
                API_URL={API_URL}
                messageAreaName={messageAreaName}
                messageTarget={messageTarget}
                displayConversation={displayConversation}
                showSearchUserInput={showSearchUserInput}
                showConversationArea={showConversationArea}
                directMessageUsers={directMessageUsers}
                handleMessageTargetDM={handleMessageTargetDM}
                messageContent={messageContent}
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
                setShowSearchUserInput={setShowSearchUserInput}
                setShowConversationArea={setShowConversationArea}
                handleMessageTargetDM={handleMessageTargetDM}
                shouldUpdateDMList={shouldUpdateDMList}
                setShouldUpdateDMList={setShouldUpdateDMList}
            ></NavComms>
        </div>
    );
};

export default Workspace;