import React from 'react';
import { useState } from 'react';
import './Navbar.css'
import workspaceLogo from '../../assets/images/slack-logo.png'
import ProfileModal from './ProfileModal';

const Navbar = (props) => {

    const {setIsLoggedIn, user} = props

    const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        <div className='navbar-section'>
            <div className='navbar-icons-container'>
                <img className='navbar-icon workspace-logo' src={workspaceLogo} alt='workspace logo'></img>
                
                <div className='individual-icon-container'>
                    <i className="navbar-icon fa-solid fa-house"></i>
                    <span className='icon-text'>Home</span>
                </div>
                <div className='individual-icon-container'>
                    <i className="navbar-icon fa-regular fa-comments"></i>
                    <span className='icon-text'>DMs</span>
                </div>
                <div className='individual-icon-container'>
                    <i className="navbar-icon fa-regular fa-bell"></i>
                    <span className='icon-text'>Activity</span>
                </div>
                <div className='individual-icon-container'>
                    <i className="navbar-icon fa-regular fa-bookmark"></i>
                    <span className='icon-text'>Later</span>
                </div>
                <div className='individual-icon-container'>
                    <i className="navbar-icon fa-solid fa-ellipsis"></i>
                    <span className='icon-text'>More</span>
                </div>
            </div>

            <ProfileModal setIsLoggedIn={setIsLoggedIn} user={user} setShowProfileModal={setShowProfileModal} showProfileModal={showProfileModal}></ProfileModal>

            <div className='user-profile-section' onClick={() => showProfileModal? setShowProfileModal(false) : setShowProfileModal(true)}>
                <i className="create-new-icon fa-solid fa-plus"></i>
                <i className="user-icon fa-regular fa-user"></i>
            </div>
        </div>
    );
};

export default Navbar;