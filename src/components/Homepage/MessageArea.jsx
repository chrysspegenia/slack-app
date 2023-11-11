import {useState, useEffect} from 'react';
import './MessageArea.css'
import SearchUserInput from './SearchUserInput';

const MessageArea = (props) => {

    const {user, API_URL, messageTarget, messageAreaName, handleDisplayConversation, displayConversation, showSearchUserInput, showConversationArea, directMessageUsers, handleMessageTargetDM} = props
    // const{ receiver_id, receiver_class} = messageTarget
    // const[displayConversation, setDisplayConversation] = useState([])

    // useEffect(() => {
    //     if (user) {
    //         handleDisplayConversation();
    //     }
    // }, [user]);

    // async function handleDisplayConversation(){
    //     try {
    //         const response = await axios.get(`${API_URL}/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`, {
    //             headers: {
    //                 "access-token": user.accessToken,
    //                 client: user.client,
    //                 expiry: user.expiry,
    //                 uid: user.uid
    //             }
    //         });
    //         const { data } = response;
    //         if(data){
    //             setDisplayConversation(data.data);
    //         }
    //     } catch (error) {
    //         if(error){
    //             return alert(error);
    //         }
    //     }
    // }

    return (
        <div className='messages-section'>
            <div className='messages-header-section'>
                <span className='messages-header'>{messageAreaName} <i className="arrow-down fa-solid fa-angle-down"></i></span>
            </div>

            {showSearchUserInput && 
            <SearchUserInput 
                directMessageUsers={directMessageUsers}
                handleMessageTargetDM={handleMessageTargetDM}
            />}

            {showConversationArea && <div className='messages-content'>
                {/* where messages would be rendered */}
                {displayConversation && displayConversation.map((message) => {

                    const {id, body, sender, created_at} = message;
                    return(
                        <div className="message-container" key={id}>
                            <i className="user-icon fa-regular fa-user"></i>
                            <div className='message-info'>
                                <div className='message-sender'>{sender.uid}</div>
                                <div className='message-timestamp'>{created_at}</div>
                            </div>
                            <div className='message'>{body}</div>
                        </div>
                        )
                })
                    
                }
                {!displayConversation && <div className='message'>No Messages</div>}
            </div>}
        </div>
    );
};

export default MessageArea;