import React , {useEffect, useState} from 'react';
import { AppContext } from '../../AppProvider';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const context = React.useContext(AppContext);
	const app = context.app;
	const contextUser = context.user;

    useEffect(() => {
		setUser(contextUser);
        if(app?.currentUser?.providerType === "local-userpass"){
            setIsUserLoggedIn(true);
        }else{
            setIsUserLoggedIn(false);
        }
    }, [contextUser]);
	

    return (
        <UserContext.Provider value={ {user, setUser, isUserLoggedIn, setIsUserLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
}
