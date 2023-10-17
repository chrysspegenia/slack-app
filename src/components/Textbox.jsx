import React from 'react';
import './Textbox.css'

const Textbox = () => {
    return (
        <div className="textbox-section">
            <div className="textbox-container">
                <div className='buttons-area'>
                    <button className='textbtn textbtn-upper bold-btn'><i className="fa-solid fa-bold"></i></button>
                    <button className='textbtn textbtn-upper italic-btn'><i className="fa-solid fa-italic"></i></button>
                    <button className='textbtn textbtn-upper strikethrough-btn'><i className="fa-solid fa-strikethrough"></i></button>
                    <span className="line-divider"></span>
                    <button className='textbtn textbtn-upper link-btn'><i className="fa-solid fa-link"></i></button>
                    <span className="line-divider"></span>
                    <button className='textbtn textbtn-upper ol-btn'><i className="fa-solid fa-list-ol"></i></button>
                    <button className='textbtn textbtn-upper li-btn'><i className="fa-solid fa-list"></i></button>
                    <span className="line-divider"></span>
                    <button className='textbtn textbtn-upper blockquote-btn'><i className="fa-solid fa-bars-staggered"></i></button>
                    <span className="line-divider"></span>
                    <button className='textbtn textbtn-upper code-btn'><i className="fa-solid fa-code"></i></button>
                    <button className='textbtn textbtn-upper codeblock-btn'><i className="fa-solid fa-laptop-code"></i></button>
                </div>

                <textarea className="input-text" type="text" placeholder='Message'></textarea>

                <div className='textbox-lower-section'>
                    <div className='buttons-area'>
                        <div className='textbtn attachments-btn'><i className="fa-solid fa-plus"></i></div>
                        <button className='textbtn formatting-btn'>Aa</button>
                        <button className='textbtn emoji-btn'><i className="fa-regular fa-face-smile"></i></button>
                        <button className='textbtn at-btn'><i className="fa-solid fa-at"></i></button>
                        <span className="line-divider"></span>
                        <button className='textbtn video-btn'><i className="fa-solid fa-video"></i></button>
                        <button className='textbtn microphone-btn'><i className="fa-solid fa-microphone"></i></button>
                        <span className="line-divider"></span>
                        <button className='textbtn shortcut-btn'><i className="fa-regular fa-square"></i></button>
                    </div>
                    <div className='confirm-btns'>
                        <div className='textbtn send-btn'><i className="fa-solid fa-paper-plane"></i></div>
                        <span className="line-divider"></span>
                        <i className="textbtn fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Textbox;