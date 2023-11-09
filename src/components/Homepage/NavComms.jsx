import {useState, useEffect} from 'react';
import './NavComms.css'
import axios from "axios";

const NavComms = (props) => {
    const {channels, setChannels, user, API_URL, setMessageTarget, setMessageAreaName, handleDisplayConversation, directMessageUsers, setDirectMessageUsers} = props

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
    function handleMessageTarget(channel){
        setMessageTarget({
            'receiver_id': channel.id,
            'receiver_class':'Channel',
        })
        setMessageAreaName(channel.name)
        handleDisplayConversation()
    }

    function handleMessageTargetDM(user){
        setMessageTarget({
            'receiver_id': user.id,
            'receiver_class':'User',
        })
        setMessageAreaName(user.email)
        handleDisplayConversation()
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
                                        onDoubleClick={() => handleMessageTarget(channel)}
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
                            Add channels
                        </div>
                    </div>
                </div>

                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Direct message</span>
                        <i className="direct-msg-icon fa-solid fa-plus"></i>
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
    );
};

export default NavComms;