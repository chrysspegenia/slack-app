import React from 'react';
import './Homepage.css'
import SearchBox from '../components/Homepage/SearchBox';
import Navbar from '../components/Homepage/Navbar'
import Workspace from '../components/Homepage/Workspace';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";


const Homepage = (props) => {
    const { setIsLoggedIn, user } = props;
    const [channels, setChannels] = useState([]);
    
        useEffect(() => {
            if (user) {
                getChannels();
            }
        }, [user]);
    
        function logout(){
            localStorage.clear();
            setIsLoggedIn(false);
        }
    
        async function getChannels(){
            try {
                const response = await axios.get(`${API_URL}/channels`, {
                    headers: {
                        "access-token": user.accessToken,
                        client: user.client,
                        expiry: user.expiry,
                        uid: user.uid
                    }
                });
                const { data } = response;
                if(data){
                    setChannels(data.data);
                }
            } catch (error) {
                if(error.response.data.errors){
                    return alert("Invalid credentials");
                }
            }
    
    } ;
    return (
        <div className='homepage'>
            {/* <div className='channels'>
            {   channels && 
                channels.map((channel) => {
                    const {id, name, owner_id} = channel;
                    return (
                        <div key={id}>
                            <p>Channel ID: {id}</p>
                            <p>Channel Name: {name}</p>
                            <p>Owner ID: {owner_id}</p>
                        </div>
                    )
                })
            }
            { !channels && <div>No channels yet</div> }
            <button onClick={logout}>Logout</button>
            </div>                */}
            
            <button onClick={logout}>Logout</button>
    
            <SearchBox></SearchBox>
            <Navbar></Navbar>
            <Workspace channels={channels}></Workspace>
        </div>
    );
};

export default Homepage;