import {useState, useEffect} from 'react';
import './MessageArea.css'
import axios from "axios";

const MessageArea = (props) => {

    const {user, API_URL, messageAreaName} = props

    const[displayConversation, setDisplayConversation] = useState([])

    useEffect(() => {
        if (user) {
            handleDisplayConversation();
        }
    }, [user]);

    async function handleDisplayConversation(){
        try { //link is temporary and currently only shows contents from spicyChannel4 based on the receiver_id
            const response = await axios.get(`${API_URL}/messages?receiver_id=5084&receiver_class=Channel`, {
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
        <div className='messages-section'>
            <div className='messages-header-section'>
                <span className='messages-header'>{messageAreaName} <i className="arrow-down fa-solid fa-angle-down"></i></span>
            </div>

            <div className='messages-content'>
                {/* where messages would be rendered */}
                {displayConversation && displayConversation.map((message) => {

                    const {id, body, sender, created_at} = message;
                    return(
                        <div className="message-container" key={id}>
                            <i className="user-icon fa-regular fa-user"></i>
                            <div className='message-sender'>{sender.uid}</div>
                            <div className='message-timeline'>{created_at}</div>
                            <div className='message'>{body}</div>
                        </div>
                        )
                })
                    
                }
                {!displayConversation && <div className='message'>No Messages</div>}
            </div>
        </div>
    );
};

export default MessageArea;