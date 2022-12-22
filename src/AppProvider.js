import React , {useState, useEffect} from 'react';
import * as Realm from "realm-web";

export const AppContext = React.createContext();

export const AppProvider = ({appId, children}) => {
	
    const [app, setApp] = useState(new Realm.App(appId));
    const [user, setUser] = useState(null);

    useEffect(() => {
        setApp(new Realm.App(appId));
      }, [appId]);
  
	
    useEffect(() => {
	        
        const credentials = Realm.Credentials.anonymous();

        const anonymousLogin = async () => {           
            const currentUser = await app.logIn(credentials);
            setUser(currentUser);
        }

        anonymousLogin();
        
    }, [app]);


 
    return (
        <AppContext.Provider value={ {app, user}}>
            {children}
        </AppContext.Provider>
    );
}

