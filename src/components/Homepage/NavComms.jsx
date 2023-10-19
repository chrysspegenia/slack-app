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
        </div>
    );
};

export default NavComms;