import React from 'react';
import './Textbox.css'

const Textbox = () => {
    return (
        <div className="textbox-section">
            <div className='buttons-area'>
                <button className='textbtn bold-btn'><i class="fa-solid fa-bold"></i></button>
                <button className='textbtn italic-btn'><i class="fa-solid fa-italic"></i></button>
                <button className='textbtn strikethrough-btn'><i class="fa-solid fa-strikethrough"></i></button>
                <button className='textbtn link-btn'><i class="fa-solid fa-link"></i></button>
                <button className='textbtn ol-btn'><i class="fa-solid fa-list-ol"></i></button>
                <button className='textbtn li-btn'><i class="fa-solid fa-list"></i></button>
                <button className='textbtn blockquote-btn'><i class="fa-solid fa-bars-staggered"></i></button>
                <button className='textbtn code-btn'><i class="fa-solid fa-code"></i></button>
                <button className='textbtn codeblock-btn'><i class="fa-solid fa-laptop-code"></i></button>
            </div>
            <input className="input-text" type="text" placeholder='Message'></input>
            <div className='textbox-lower-section'>
                <div className='attachments-btn'><i class="fa-solid fa-plus"></i></div>
                <div className='buttons-area'>
                    <button className='textbtn formatting-btn'>Aa</button>
                    <button className='textbtn emoji-btn'><i class="fa-regular fa-face-smile"></i></button>
                    <button className='textbtn at-btn'><i class="fa-solid fa-at"></i></button>
                    <button className='textbtn video-btn'><i class="fa-solid fa-video"></i></button>
                    <button className='textbtn microphone-btn'><i class="fa-solid fa-microphone"></i></button>
                    <button className='textbtn shortcut-btn'><i class="fa-regular fa-square"></i></button>
                </div>
                <div className='confirm-btns'>
                    <div className='send-btn'><i class="fa-solid fa-paper-plane"></i></div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
        </div>
    );
};

export default Textbox;