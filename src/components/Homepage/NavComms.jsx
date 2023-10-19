import React from 'react';
import './NavComms.css'

const NavComms = () => {
    return (
        <div className='nav-communications'>
            <div className='workspace-header-section'>
                <span className='workspace-header'>Workspace <i class="arrow-down fa-solid fa-angle-down"></i></span>
                <div className='header-btns-container'>
                    <i class="header-btn fa-solid fa-bars"></i>
                    <i class="header-btn fa-regular fa-pen-to-square"></i>
                </div>
            </div>
            
            <div className='nav-comms-content'>    
                <div className='comms-links'><i className="fa-regular fa-comment-dots"></i>Threads</div>
                <div className='comms-links'><i class="fa-regular fa-paper-plane"></i>Drafts & sent</div>

                {/* Contains channels and create channel */}
                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Channels</span>
                    </div>
                    <div className='channels-container'>
                        {/* added channels here */}
                        <div className='channels'>
                            <i className="comms-logo fa-solid fa-plus"></i>
                            Add channels
                        </div>
                    </div>
                </div>

                <div className='channel-section'>
                    <div className='comms-header'>
                        <i className="comms-header-logo fa-solid fa-caret-down"></i>
                        <span className='comms-title'>Direct message</span>
                        <i class="direct-msg-icon fa-solid fa-plus"></i>
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