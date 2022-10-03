import React , {useState, useEffect} from 'react';
import * as Realm from "realm-web";

export const AppContext = React.createContext();

export const AppProvider = ({appId, children}) => {
    const [app, setApp] = useState(new Realm.App(appId));


    useEffect(() => {
        
        const credentials = Realm.Credentials.anonymous();

        const anonymousLogin = async () => {            
            await app.logIn(credentials);
        }

        anonymousLogin();
        
    }, [app]);


    useEffect(() => {
      setApp(new Realm.App(appId));
    }, [appId]);

    return (
        <AppContext.Provider value={ {app}}>
            {children}
        </AppContext.Provider>
    );
}
