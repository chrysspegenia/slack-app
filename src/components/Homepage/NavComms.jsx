import {useState, useEffect} from 'react';
import './NavComms.css'
import axios from "axios";
import Loading from './Loading';

const NavComms = (props) => {
    const {channels, setChannels, user, API_URL, setMessageTarget, setMessageAreaName, directMessageUsers, setDirectMessageUsers, setShowSearchUserInput, setShowConversationArea, handleMessageTargetDM, shouldUpdateDMList, setShouldUpdateDMList} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");
    const [newChannelMembers, setNewChannelMembers] = useState("");
    const [loading, setLoading] = useState(true);

    const [usersDM, setUsersDM] = useState([]) 

    
    useEffect( ()=> {
        getExistingUsersDM()
        setShouldUpdateDMList(false)
    }, [directMessageUsers, shouldUpdateDMList])

    useEffect(() => {
        if (user) {
            getChannels();
        }
    }, [user]);

    useEffect(() => {
            getUsers();
    }, [user]);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    async function getChannels(){
        try {
            const response = await axios.get(`${API_URL}/channels`, {
                headers: {
                    "access-token": user.accessToken,
                    client: user.client,
                    expiry: user.expiry,
                    uid: user.uid
                }
            });
            const { data } = response;
            if(data){
                setChannels(data.data);
            }
        } catch (error) {
            if(error){
                return alert("Invalid credentials");
            }
        }
    }

    async function getUsers(){
        try{
            const response = await axios.get(`${API_URL}/users`, {
                headers: {
                    "access-token": user.accessToken,
                    client: user.client,
                    expiry: user.expiry,
                    uid: user.uid
                }
            });
            const users = response.data.data;
            setDirectMessageUsers(users.filter((user) => {
                return user.id >= 4000
            }))
        } catch (error) {
            if(error){
                // include proper error
                return alert("cant get users");
            }
        }
    }

    // //function to loop over all accounts id's to retrieve accounts that has sent message to user
    // async function getExistingUsersDM() {
    //     let uniqueReceiverID = [];
    
    //     try {

    //         setLoading(true);

    //         await Promise.all(
    //             directMessageUsers.map(async (account) => {
    //                 const response = await axios.get(`${API_URL}/messages?receiver_id=${account.id}&receiver_class=User`, {
    //                     headers: {
    //                         "access-token": user.accessToken,
    //                         client: user.client,
    //                         expiry: user.expiry,
    //                         uid: user.uid
    //                     }
    //                 });
                    
    //                 const users = response.data.data;
    //                 if (users.length >= 0) {
    //                     const receiverInfo = Array.from(new Set(users.flatMap(messageInfo => messageInfo.receiver)));
    //                         uniqueReceiverID.push(...receiverInfo);
    //                 }
    //             })
    //         );

    //         let uniqueReceiversMap = new Map();

    //         uniqueReceiverID.forEach(obj => {
    //             uniqueReceiversMap.set(obj.uid, obj);
    //           });
    
    //         let uniqueArrayOfObjects = Array.from(uniqueReceiversMap.values());

    //         setUsersDM(uniqueArrayOfObjects);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //                 setLoading(false)
    //             }
    // }

    async function getExistingUsersDM() {
        try {
            setLoading(true);

            const uniqueReceiverID = await Promise.all(
                directMessageUsers.map(async (account) => {
                    const response = await axios.get(`${API_URL}/messages?receiver_id=${account.id}&receiver_class=User`,
                        {
                            headers: {
                                "access-token": user.accessToken,
                                client: user.client,
                                expiry: user.expiry,
                                uid: user.uid,
                            },
                        }
                    );
    
                    const users = response.data.data;
                    if (users.length >= 0) {
                        const receiverInfo = Array.from(
                            new Set(users.flatMap((messageInfo) => messageInfo.receiver))
                        );
                        const senderInfo = Array.from(
                            new Set(users.flatMap((messageInfo) => messageInfo.sender))
                        );
                        return receiverInfo.concat(senderInfo);
                    } else {
                        return [];
                    }
                })
            );
    
            const uniqueReceiverIDs = uniqueReceiverID.flat();
            const uniqueReceiversMap = new Map();
    
            uniqueReceiverIDs.forEach((obj) => {
                uniqueReceiversMap.set(obj.uid, obj);
            });
    
            const uniqueArrayOfObjects = Array.from(uniqueReceiversMap.values());
            setUsersDM(uniqueArrayOfObjects);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const createNewChannel = async () => {
        try {
            setLoading(true);

          const response = await axios.post(`${API_URL}/channels`, {
            name: newChannelName,                                               //interpret in base 10
            user_ids: newChannelMembers.split(',').map(id => parseInt(id.trim(), 10)), //cleanup and convert string to interger
          }, {                                                                         // if "1,2,3" convert to "[1, 2, 3]"
            headers: {
              "access-token": user.accessToken,
              client: user.client,
              expiry: user.expiry,
              uid: user.uid,
            },
          });

    const { data,status } = response;
    // console.log("Server response:", data);
    // console.log("Server response:", response); // for debugging

        if (status === 200 && data.data && data.data.id) {
           alert("Channel creation successful");
        //    console.log("Channel creation successful");

           setChannels((prevChannels) => {
            const newChannels = data.data;
          //check if prevChannels is an array
            if (Array.isArray(prevChannels)) {
              return [...prevChannels, newChannels]; //if true add new channels
            } else {

              // if not an array return a new array with new channels
              return [newChannels];
            }
          });

           setNewChannelName("");
           setNewChannelMembers("");
            closeModal(); 
        } else {
            alert("Failed to create the channel");
            // console.log("Failed to create the channel, data:", data); //for debugging
            // console.log("Failed to create the channel, status:", status); 
            closeModal();
            setNewChannelName("");
            setNewChannelMembers("");
        }
        } catch (error) {
        // console.error("Error creating the channel", error); //for debugging
        alert("Failed to create the channel");
        closeModal();
        setNewChannelName("");
        setNewChannelMembers("");
        } finally {
            setLoading(false)
        }
    };

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
    
          const { data } = response;
    
          if (data && data.data && data.data.channel_members) {
            const members = data.data.channel_members;
          } else {
            console.error('Invalid response structure. Please check the API response.');
          }
        } catch (error) {
          console.error('Error fetching channel members', error);
        }
      };

    //function updates message target info, rerenders the conversationDisplay 
    function handleMessageTargetChannel(channel){
        setShowSearchUserInput(false)
        setMessageTarget({
            'receiver_id': channel.id,
            'receiver_class':'Channel',
        })
        setMessageAreaName(channel.name)
        setShowConversationArea(true)
        fetchChannelMembers(channel.id);
    }

    return (
        <div className='nav-communications'>
            <div className='workspace-header-section'>
                <span className='workspace-header'>Workspace <i className="arrow-down fa-solid fa-angle-down"></i></span>
                <div className='header-btns-container'>
                    <i className="header-btn fa-solid fa-bars"></i>
                    <i className="header-btn fa-regular fa-pen-to-square"></i>
                </div>
            </div>
            
            <div className='nav-comms-content'>    
                <div className='comms-links'><i className="fa-regular fa-comment-dots"></i>Threads</div>
                <div className='comms-links'><i className="fa-regular fa-paper-plane"></i>Drafts & sent</div>

                {/* Contains channels and create channel */}
                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Channels</span>
                    </div>
                    <div className='channels-container'>
                        {/* added channels here */}
                        {loading && <Loading />}
                            {channels && channels.map((channel) => {
                            const { id, name } = channel;
                            return (
                             <div className='channels' key={id} onClick={() => handleMessageTargetChannel(channel)}>
                            <p>{name}</p>
                    </div>
                            );
                            })}
                            {/* if account has no channels this will display */}
                            { !channels && <div className='channels'>No channels yet</div> }  
                    </div>
                    <div className='add-channels'>
                        <i className="comms-logo fa-solid fa-plus"></i>
                        <button className= "add-channels-button" onClick={openModal}>                       
                            Add channels
                        </button>  

                        {isModalOpen && (
                        <div className="add-channels-modal">
                            <div className="add-channels-modal-content">
                                <h2>Create a new channel</h2>
                                <input
                                    type="text"
                                    placeholder="Channel name"
                                    value={newChannelName}
                                    onChange={(e) => setNewChannelName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Member ID ie. 4001,4002"
                                    value={newChannelMembers}
                                    onChange={(e) => setNewChannelMembers(e.target.value)}
                                />
                                <div className='create-channel-button'>
                                    <button onClick={closeModal}>Cancel</button>
                                    <button onClick={createNewChannel}>Create</button>
                                </div>
                            </div>
                        </div>
                        )}
                </div>

                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Direct message</span>
                        <i className="direct-msg-icon fa-solid fa-plus"
                            onClick={() => { 
                                setMessageAreaName("New message")
                                setShowSearchUserInput(true)
                                setShowConversationArea(false)
                            }}
                        ></i>
                    </div>
                    {/* <div className='users-container'>
                        {directMessageUsers && directMessageUsers.map((user) => {
                            const{id, email} = user;
                                return (
                                    <div 
                                        className="user" 
                                        key={id}
                                        onClick={() => handleMessageTargetDM(user)}
                                        >
                                            <p>{email}</p>
                                            <p>{id}</p>
                                    </div>
                                )
                        })}
                    </div> */}
                    <div className='users-container'>
                    {loading && <Loading />}
                                {usersDM && usersDM.map((receiver) => {
                                    const{id, email} = receiver;
                                        return (
                                            <div 
                                                className="user" 
                                                key={id}
                                                onClick={() => handleMessageTargetDM(receiver)}
                                                >
                                                    <p>{email}</p>
                                                    <p>{id}</p>
                                            </div>
                                          );
                                        })}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default NavComms;