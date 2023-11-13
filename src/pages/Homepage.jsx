import React from 'react';
import './Homepage.css'
import SearchBox from '../components/Homepage/SearchBox';
import Navbar from '../components/Homepage/Navbar'
import Workspace from '../components/Homepage/Workspace';
import { API_URL } from "../constants/Constants";


const Homepage = (props) => {
    const { setIsLoggedIn, user, setUser } = props;
    
        // function logout(){
        //     localStorage.clear();
        //     setIsLoggedIn(false);
        // }

    return (
        <div className='homepage'>
            {/* <button onClick={logout}>Logout</button> */}
            <SearchBox></SearchBox>
            <Navbar setIsLoggedIn={setIsLoggedIn} user={user}></Navbar>
            <Workspace
                user={user}
                setUser={setUser}
                API_URL={API_URL}
            ></Workspace>
        </div>
    );
};

export default Homepage;