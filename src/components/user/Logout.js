import React, { useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../AppProvider';
import {UserContext} from '../user/UserProvider';

const Logout = () => {

    let navigate = useNavigate();
    const app = React.useContext(AppContext).app;
    const userContext = React.useContext(UserContext);

    useEffect(() => {
        
        const logout = async () => {
            console.log("calling realm");

            await app.currentUser.logOut();

            userContext.setUser({...app.currentUser});
            userContext.setIsUserLoggedIn(false);
            
            navigate("/login", { replace: true });
        }

        logout();

    }, [app]);

    return null;
}

export default Logout;
