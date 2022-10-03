import React , {useEffect, useState} from 'react';
import { AppContext } from '../../AppProvider';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const app = React.useContext(AppContext).app;

    useEffect(() => {
        console.log(app);
        console.log(app.currentUser);
        if(app?.currentUser?.providerType === "local-userpass"){
            setIsUserLoggedIn(true);
        }else{
            setIsUserLoggedIn(false);
        }
    }, [app]);

    return (
        <UserContext.Provider value={ {user, setUser, isUserLoggedIn, setIsUserLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
}
