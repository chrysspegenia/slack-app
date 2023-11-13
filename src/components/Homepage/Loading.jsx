import React from 'react';
import './Loading.css'


const Loading = () => {
    return (
      <div className='loading-container'>
        <img className='loading-animation' src="/amogus.gif" alt="Loading" />
        <h2>Loading...</h2>
      </div>
    );
  };
  
  export default Loading;