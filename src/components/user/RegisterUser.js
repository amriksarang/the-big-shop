import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../AppProvider';
import {handleAuthenticationError} from '../../utils/utils';


const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [isLoginError, setIsLoginError] = useState(false);

    const app = React.useContext(AppContext).app;
    let navigate = useNavigate();

    const handleClick = async (event) => {
        console.log("calling realm");
        
        app.emailPasswordAuth.registerUser(email, password )
            .then(() => {
                navigate("/user");
            })
            .catch(error => {
                let errorMsg = handleAuthenticationError(error);                
                setErrorMessage(errorMsg);
                setIsLoginError(true);
            })
        
    };

    return <>
    <div className='login-container'>
        <label htmlFor="username" >Username</label>
        <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button className='product-detail-add-button' onClick={handleClick}>Register</button>
        {
            isLoginError && <p>{errorMessage}</p>
        }
    </div>
    
    </>
}

export default RegisterUser;
