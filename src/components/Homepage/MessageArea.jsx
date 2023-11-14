import {useState, useEffect, useRef} from 'react';
import './MessageArea.css'
import SearchUserInput from './SearchUserInput';
import axios from "axios";

const MessageArea = (props) => {

    const {user, API_URL, messageTarget, messageAreaName, handleDisplayConversation, displayConversation, showSearchUserInput, showConversationArea, directMessageUsers, handleMessageTargetDM, messageContent} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [channelMembers, setChannelMembers] = useState([]);
    const [channelId, setChannelId] = useState();
    const [inputUserId, setInputUserId] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    useEffect(() => {
        if (user && messageTarget && messageTarget.receiver_id) {
            console.log("Channel ID:", messageTarget.receiver_id);
          fetchChannelMembers(messageTarget.receiver_id);
        }
      }, [user, messageTarget]);
    

      const fetchChannelMembers = async (channelId) => {
        try {
          if (!channelId) {
            console.error('Channel ID is not defined.');
            return;
          }
      
          const response = await axios.get(`${API_URL}/channels/${channelId}`, {
            headers: {
              'access-token': user.accessToken,
              client: user.client,
              expiry: user.expiry,
              uid: user.uid,
            },
          });
          console.log('Complete API Response:', response);
      
          const { data } = response;
          console.log('API Response Data:', data);
      
          const channelMembers = data && data.data && data.data.channel_members;
      
          if (channelMembers) {
            setChannelMembers(channelMembers);
            setChannelId(channelId);
          } else {
            console.error('Invalid response structure. Please check the API response.');
          }
        } catch (error) {
          console.error('Error fetching channel members', error);
        }
      };
   
      const addMemberToChannel = async (userId) => {
        try {
          // Add the member to the channel
          await axios.post(
            `${API_URL}/channel/add_member`,
            {
              id: channelId,
              member_id: userId,
            },
            {
              headers: {
                'access-token': user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid,
              },
            }
          );
      
          // Fetch the updated list of channel members
          await fetchChannelMembers(channelId);
      
          setInputUserId("");
      
          console.log('Member added successfully');
        } catch (error) {
          console.error('Error adding member to the channel', error);
        }
      };
      
      
    return (
        <div className='messages-section'>
            <div className='messages-header-section'>
                <span className='messages-header'>{messageAreaName} <i className="arrow-down fa-solid fa-angle-down"></i></span>
                <button className='channel-members-section' onClick={openModal}>Members</button>

                {isModalOpen && (
                    <div className='channel-members-modal'>
                        <div className='channel-members-modal-headers'>
                            <h2>Members</h2>
                            <button className='members-close-button' onClick={closeModal}>X</button>
                        </div>
                    <div className='channel-members-modal-content'>
                    <input
                      type="text"
                      placeholder="UserID"
                      value={inputUserId}
                      onChange={(e) => setInputUserId(e.target.value)}
                      />
                      <button onClick={() => addMemberToChannel(inputUserId)}>Add</button>
                        <ul>
                            {channelMembers.map((member) => (
                                <li key={member.id}>
                                 {member.user_id} - {directMessageUsers.find(user => user.id === member.user_id)?.email || 'Email Not Found'}
                                  {/* Uses find method to find user with a specific ID in the array of directMessageUsers ? is used to access email prop if email is not found "email not found will be displayed" */}
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                )}
            </div>

            {showSearchUserInput && 
            <SearchUserInput 
                directMessageUsers={directMessageUsers}
                handleMessageTargetDM={handleMessageTargetDM}
            />}

            {showConversationArea && 
              <div className='messages-content'
                    ref={messageContent}
              >

                {/* where messages would be rendered */}
                {displayConversation && displayConversation.map((message) => {

                    const {id, body, sender, created_at} = message;

                    const date = created_at.slice(0, 10);
                    const time = created_at.slice(12, 16);
                    
                    return(
                        <div className="message-container" key={id}>
                            <i className="user-icon fa-regular fa-user"></i>
                            <div className='message-info'>
                                <div className='message-sender'>{sender.uid}</div>
                                <div className='message-timestamp'>
                                  <div>{time}</div>
                                  <div>{date}</div>
                                </div>
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