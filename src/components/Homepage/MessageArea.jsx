import React from 'react';
import './MessageArea.css'

const MessageArea = () => {
    return (
        <div className='messages-section'>
            <div className='messages-header-section'>
                <span className='messages-header'>Channel name / message receiver <i class="arrow-down fa-solid fa-angle-down"></i></span>
            </div>

            <div className='messages-content'>
                {/* where messages would be rendered */}
                <div className='message'>Sender: Hello</div>
            </div>
        </div>
    );
};

export default MessageArea;