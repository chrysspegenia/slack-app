import React, { useState } from 'react';
import './ProfileModal.css'

const ProfileModal = (props) => {

    const {setIsLoggedIn, user, showProfileModal} = props
    
    function logout(){
        localStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        showProfileModal && <div className='profile-modal'>
            <div className='profile-info-section'>
                <i className="user-icon fa-regular fa-user"></i>
                <p className='profile-info profile-email'>{user.uid}</p>
                <p className='profile-info profile-id'>{user.id}</p>
            </div>

            <div className='profile-btns'>Set yourself as active</div>
            <div className='profile-btns'>Pause notification</div>
            <div className='profile-btns'>Profile</div>
            <div className='profile-btns'>Preferences</div>
            <button className="logout-btn" onClick={logout}>Sign out of Slack</button>
        </div>
    );
};

export default ProfileModal;