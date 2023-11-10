import {useState, useEffect} from 'react';
import './NavComms.css'
import axios from "axios";

const NavComms = (props) => {
    const {channels, setChannels, user, API_URL, setMessageTarget, setMessageAreaName, handleDisplayConversation, directMessageUsers, setDirectMessageUsers, setShowSearchUserInput} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");
    const [newChannelMembers, setNewChannelMembers] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        if (user) {
            getChannels();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getUsers();
            // getExistingUsersDM();
        }
    }, [user]);

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

    const createNewChannel = async () => {
        try {
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
    console.log("Server response:", data);
    console.log("Server response:", response); // for debugging

        if (status === 200 && data.data && data.data.id) {
           alert("Channel creation successful");
           console.log("Channel creation successful");
           setNewChannelName("");
           setNewChannelMembers("");
            closeModal(); 
        } else {
            alert("Failed to create the channel");
            console.log("Failed to create the channel, data:", data); //for debugging
            console.log("Failed to create the channel, status:", status); 
            closeModal();
            setNewChannelName("");
            setNewChannelMembers("");
        }
        } catch (error) {
        console.error("Error creating the channel", error); //for debugging
        alert("Failed to create the channel");
        closeModal();
        setNewChannelName("");
        setNewChannelMembers("");
        }
    };
    
 
    
    // const {usersDM, setUsersDM} = useState([]) 

    // // //function to loop over all accounts id's to retrieve accounts that has sent message to user
    // async function getExistingUsersDM(){
    //     for(const user of directMessageUsers){
    //     try {
    //         const response = await axios.get(`${API_URL}/messages?receiver_id=${user.id}&receiver_class=User`, {
    //             headers: {
    //                 "access-token": user.accessToken,
    //                 client: user.client,
    //                 expiry: user.expiry,
    //                 uid: user.uid
    //             }
    //         });
    //         const users = response.data.data;
    //         // if(users.length !== 0){
    //         //     continue; //skip to the next user if there are no messages
    //         // }
    //         //     setUsersDM(users)
    //         //     console.log(usersDM)
    //         console.log(users)
    //     } catch (error) {
    //         if(error){
    //             return alert("problem retreiving users with direct dm");
    //         }
    //     }
    //     }
    // }
    // getExistingUsersDM()

    //function updates message target info, rerenders the conversationDisplay 
    function handleMessageTargetChannel(channel){
        setShowSearchUserInput(false)
        setMessageTarget({
            'receiver_id': channel.id,
            'receiver_class':'Channel',
        })
        setMessageAreaName(channel.name)
        // handleDisplayConversation() removed for causing render flickering
    }

    function handleMessageTargetDM(user){
        setShowSearchUserInput(false)
        setMessageTarget({
            'receiver_id': user.id,
            'receiver_class':'User',
        })
        setMessageAreaName(user.email)
        // handleDisplayConversation() removed for causing render flickering
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
                        {channels && channels.map((channel) => {
                                const {id, name} = channel;
                                return (
                                    <div className='channels' key={id}
                                        // onClick={() => handleMessageTarget(channel)}
                                        onDoubleClick={() => handleMessageTargetChannel(channel)}
                                        >
                                        <p>{name}</p>
                                    </div>
                                    )
                                })
                            }
                            {/* if account has no channels this will display */}
                            { !channels && <div className='channels'>No channels yet</div> }

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
                </div>

                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Direct message</span>
                        <i className="direct-msg-icon fa-solid fa-plus"
                            onClick={() => { 
                                setMessageAreaName("New message")
                                setShowSearchUserInput(true)
                            }}
                        ></i>
                    </div>
                    <div className='users-container'>
                        {directMessageUsers && directMessageUsers.map((user) => {
                            const{id, email} = user;
                                return (
                                    <div 
                                        className="user" 
                                        key={id}
                                        onDoubleClick={() => handleMessageTargetDM(user)}
                                        >
                                            <p>{email}</p>
                                            <p>{id}</p>
                                    </div>
                                )
                        })}
                        {/* {usersDM && usersDM.map((user) => {
                            const{id, email} = user;
                                return (
                                    <div className="user" key={id}><p>{email}</p><p>{id}</p></div>
                                )
                        })} */}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default NavComms;