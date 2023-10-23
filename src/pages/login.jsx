import "./Login.css"
import { useState, useEffect } from 'react';
import Homepage from "./Homepage";
import { API_URL } from '../constants/Constants';
import axios from 'axios';

function Login(props){
    const { user, setUser } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();


    useEffect(() => {
        if(user){
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    async function handleSubmit(event){
        event.preventDefault();

        if(!email || !password){
            return alert("Invalid credentials");
        }
        try {
            const loginCredentials = {
                email,
                password
            }
            const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
            const { data, headers } = response;
            if(data && headers){
                const accessToken = headers["access-token"];
                const expiry = headers["expiry"];
                const client = headers["client"];
                const uid = headers["uid"];

                setUser({
                    accessToken,
                    expiry,
                    client,
                    uid,
                    id: data.data.id
                })

                setIsLoggedIn(true);
            }
        } catch (error){
            if(error.response.data.errors) {
                return alert("Invalid credentials");
            }
        }
    }

  async function handleRegistrationSubmit(event) {
    event.preventDefault();

    if (!email || !password || !passwordConfirmation) {
      return alert("Please fill in all required fields.");
    }

    if (password !== passwordConfirmation) {
      return alert("Password and password confirmation do not match.");
    }

    try {
      const registrationCredentials = {
        email,
        password,
        password_confirmation: passwordConfirmation,
      };
      const response = await axios.post(`${API_URL}/auth/`, registrationCredentials);

      
      console.log("Registration successful!", response.data);

      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      if (error.response.data.errors) {
        alert("Registration failed. Please check your input.");
      }
    }
  }

    return (
        <div className="login-page-main-container">
             {!isLoggedIn && <h1>Slack</h1>}    
            <div className="login-container">
            { 
                !isLoggedIn &&
                (
                <div>
                <form className="login" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    >
                    </input>
                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    >
                    </input>
                    <button type="submit">Login</button>
                </form>
                    <form className="signup" onSubmit={handleRegistrationSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <label>Password Confirmation:</label>
                    <input
                        type="password"
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                    ></input>
                    <button type="submit">Sign Up</button>
                    </form>
                </div>
                )}
        {isLoggedIn && <Homepage setIsLoggedIn={setIsLoggedIn} user={user}></Homepage>}
      </div>
    </div>
  );
}


export default Login;