import "./Login.css"
import { useState, useEffect } from 'react';
import Homepage from "./Homepage";
import { API_URL } from '../constants/Constants';
import axios from 'axios';

function Login(props){
    const { user, setUser } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regPasswordConfirmation, setRegPasswordConfirmation] = useState("");

    const [showSignUpForm, setShowSignUpForm] = useState(false)

    useEffect(() => {
        if(user){
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    async function handleSubmit(event){
      event.preventDefault();

      if(!loginEmail || !loginPassword){
          return alert("Invalid credentials");
      }

      try {
          const loginCredentials = {
              email: loginEmail,
              password: loginPassword
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
              setLoginEmail("");
              setLoginPassword("");
          }
      } catch (error){
          if(error.response.data.errors) {
              return alert("Invalid credentials");
          }
      }
  }

  async function handleRegistrationSubmit(event) {
    event.preventDefault();

    if (!regEmail || !regPassword || !regPasswordConfirmation) {
        return alert("Please fill in all required fields.");
    }

    if (regPassword !== regPasswordConfirmation) {
        return alert("Password and password confirmation do not match.");
    }

    try {
        const registrationCredentials = {
            email: regEmail,
            password: regPassword,
            password_confirmation: regPasswordConfirmation,
        };
        const response = await axios.post(`${API_URL}/auth/`, registrationCredentials);

        console.log("Registration successful!", response.data);

        setRegEmail("");
        setRegPassword("");
        setRegPasswordConfirmation("");
    } catch (error) {
        if (error.response.data.errors) {
            alert("Registration failed. Please check your input.");
        }
    }
}

    return (
        <div className="login-page-main-container">
             
            <div className="login-container">
            {!isLoggedIn && <h1>Slack</h1>}    

        { !isLoggedIn && !showSignUpForm &&
                <form className="login-form" onSubmit={handleSubmit}>
                  {/* <h2>Login</h2> */}
                    {/* <label>Email:</label> */}
                    <input
                        className="input-login"
                        type="email"
                        placeholder="Email"
                        onChange={(event) => setLoginEmail(event.target.value)}
                        value={loginEmail}
                    >
                    </input>
                    {/* <label>Password:</label> */}
                    <input
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setLoginPassword(event.target.value)}
                        value={loginPassword}
                    >
                    </input>
                    <button className="login-form-btn" type="submit">Login</button>

                    <span className="form-divider"></span>

                    <div className="swap-modal-btn"
                        onClick={() => setShowSignUpForm(true)}
                    >
                        Create new account
                    </div>
                </form>
            }

            {!isLoggedIn && showSignUpForm &&
                <form className="signup-form" onSubmit={handleRegistrationSubmit}>
                      <h2>Sign Up</h2>
                      <span>It's quick and easy</span>
                    {/* <label>Email:</label> */}
                    <input
                        className="input-signup"
                        type="email"
                        placeholder="Email"
                        onChange={(event) => setRegEmail(event.target.value)}
                        value={regEmail}
                    ></input>
                    {/* <label>Password:</label> */}
                    <input
                        className="input-signup"
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setRegPassword(event.target.value)}
                        value={regPassword}
                    ></input>
                    {/* <label>Password Confirmation:</label> */}
                    <input
                        className="input-signup"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(event) => setRegPasswordConfirmation(event.target.value)}
                        value={regPasswordConfirmation}
                    ></input>
                    <button className="signup-form-btn" type="submit">Sign Up</button>

                    <span className="form-divider"></span>

                    <div 
                        className="swap-modal-btn"
                        onClick={() => setShowSignUpForm(false)}    
                    >
                        Back to login page
                    </div>
                    </form>
                }

        {isLoggedIn && <Homepage setIsLoggedIn={setIsLoggedIn} user={user}></Homepage>}
      </div>
    </div>
  );
}


export default Login;