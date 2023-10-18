import React from 'react';
import './SearchBox.css';

const SearchBox = () => {
    return (
        <div className='searchbox-section'>
            <i className="searchbox-icons fa-solid fa-arrow-left"></i>
            <i className="searchbox-icons fa-solid fa-arrow-right"></i>
            <i className="searchbox-icons fa-regular fa-clock"></i>
            <div className='searchbox-input-container'>
                <input className='searchbox-input' type='text' placeholder='Search'></input>
                <i className="magnifying-glass fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
};

export default SearchBox;