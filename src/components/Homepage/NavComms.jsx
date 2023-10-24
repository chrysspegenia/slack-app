import {useState, useEffect} from 'react';
import './NavComms.css'
import axios from "axios";

const NavComms = (props) => {
    const {channels, setChannels, user, API_URL, messageTarget, setMessageTarget} = props

    useEffect(() => {
        if (user) {
            getChannels();
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
            if(error.response.data.errors){
                return alert("Invalid credentials");
            }
        }
    }

    //function updates message target info 
    function handleMessageTarget(channel){    
        setMessageTarget({
            'receiver_id': channel.id, 
            'receiver_class':'Channel',
        })
    }

    //Delete after completing functionalities
    useEffect(() => {
        console.log(messageTarget);
    }, [messageTarget]);

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
                                const {id, name, owner_id} = channel;
                                return (
                                    <div className='channels' key={id}
                                        onDoubleClick={() => handleMessageTarget(channel)}>
                                        {/* <p>Channel ID: {id}</p> */}
                                        <p>{name}</p>
                                        {/* <p>Owner ID: {owner_id}</p> */}
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
                    <div className='channels-container'>
                        {/* added direct messages here */}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default NavComms;