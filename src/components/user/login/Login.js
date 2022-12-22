import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../../AppProvider';
import * as Realm from "realm-web";
import { UserContext } from '../UserProvider';
import {handleAuthenticationError, testEmail} from '../../../utils/utils';
import {Link} from 'react-router-dom';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [isLoginError, setIsLoginError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let navigate = useNavigate();
    const app = React.useContext(AppContext).app;
    const userContext = React.useContext(UserContext);

    useEffect(() => {
        console.log(app.currentUser.providerType);
        if( app.currentUser.providerType === "local-userpass") 
            navigate(-1) ;
    }, [app]);

    const invalidForm = () => {
        let isError = false;

        if(!testEmail(email)){
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

    const login = () => {

        if(invalidForm())
            return;
        
        console.log("calling realm");
        try{
            const credentials = Realm.Credentials.emailPassword(email, password);
            app.logIn(credentials)
                        .then( result => {
                            userContext.setIsUserLoggedIn(true);
                            navigate(-1);
                        })
                        .catch(error => {                            
                            let errorMsg = handleAuthenticationError(error);                            
                            setErrorMessage(errorMsg);
                            setIsLoginError(true);
                        });        
            
        }catch(e){            
            console.log(e);
        }
        
    };

    return (
      <><div className='login-container'>
        <label htmlFor="username" >Username</label>
        <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className='error-field'>Please provide valid email</p>}

        <label htmlFor="password">Password</label>        
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className='error-field'>Required Field</p>}
        <button className='product-detail-add-button' onClick={login}>Log In</button>
        {
            isLoginError && <p>{errorMessage}</p>
        }
        <p className="register-user">New User? Register <span className='register-here'><Link to="/register">here</Link></span></p>
        </div>
      </>
    );
}

export default Login;
