import React from 'react';
import './ProfileModal.css'

const ProfileModal = (props) => {

    const {setIsLoggedIn, user} = props
    
    function logout(){
        localStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        <div className='profile-modal'>
            <div className='profile-info-section'>
                <i className="user-icon fa-regular fa-user"></i>
                <p className='profile-info profile-email'>{user.uid}</p>
                <p className='profile-info profile-id'>{user.id}</p>
            </div>

            <p className='profile-btns'>Set yourself as active</p>
            <p className='profile-btns'>Pause notification</p>
            <p className='profile-btns'>Profile</p>
            <p className='profile-btns'>Preferences</p>
            <button className="logout-btn" onClick={logout}>Sign out of Slack</button>
        </div>
    );
};

export default ProfileModal;