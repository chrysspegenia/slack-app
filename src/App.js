import './App.css';
// import Textbox from './components/Textbox';
import React from 'react';
import { useState } from "react";
import Homepage from './pages/Homepage';
import Login from './pages/login';

function App() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user") || null)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Homepage user={user} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
