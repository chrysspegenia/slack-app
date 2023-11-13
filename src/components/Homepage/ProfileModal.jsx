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
            <i className="user-icon fa-regular fa-user"></i>
            <p className='profile-email'>{user.uid}</p>
            <p className='profile-email'>{user.id}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default ProfileModal;