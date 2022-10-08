import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../AppProvider';
import {handleAuthenticationError} from '../../utils/utils';


const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [isLoginError, setIsLoginError] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const app = React.useContext(AppContext).app;
    let navigate = useNavigate();

    const invalidForm = () => {
        let regex = /^[\w\d\._]+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
        let isError = false;

        if(!regex.test(email)){
            setEmailError(true);
            isError = true;
        }else{
            setEmailError(false);
        }

        if(password.trim().length === 0){
            setPasswordError(true);
            isError = true;
        }else{
            setPasswordError(false);
        }

        return isError;
    }

    const handleClick = async (event) => {

        if(invalidForm())
            return;

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
        {emailError && <p className='error-field'>Incorrect email pattern</p>}
        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className='error-field'>Required Field</p>}
        <button className='product-detail-add-button' onClick={handleClick}>Register</button>
        {
            isLoginError && <p className='error-field'>{errorMessage}</p>
        }
    </div>
    
    </>
}

export default RegisterUser;
