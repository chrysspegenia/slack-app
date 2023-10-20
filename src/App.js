import './App.css';
// import Textbox from './components/Textbox';
import React from 'react';
import { useState } from "react";
import Homepage from './pages/Homepage';
import Login from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <Homepage /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
