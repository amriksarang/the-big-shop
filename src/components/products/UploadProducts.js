import React, { useState } from 'react';
import * as Realm from "realm-web";

import productData from './ProductData.json';
import { app } from '../../utils/mongodb';

const UploadProducts = () => {

    const handleClick = async () => {
        let mongoDB = app.currentUser.mongoClient("mongodb-atlas");
        let productsCollection = mongoDB.db("the-big-shop").collection("products");


        let productList = productData.map(product => {
            return {
                ...product,
                owner_id: app.currentUser.id
            };
        });
        //await productsCollection.insertMany(productList);
		
    }

    return (
        <> 
            <h2>Upload Products</h2>
            <hr />
            <button onClick={handleClick}>Upload Products</button>
        </>
    );
}

const Logout = ({ user, setUser }) => {

    const logout = async () => {
        await app.currentUser.logOut();
        setUser(app.currentUser);
    };

    return (
        <div>
            <h1>Logged in with email: {app.currentUser._profile.data.email}</h1>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    );
}

const Login = ({setUser}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        //const user = await app.logIn(Realm.Credentials.anonymous());
        //const user = await app.emailPasswordAuth.registerUser(email, password);

        const credentials = Realm.Credentials.emailPassword(email, password);
        const user = await app.logIn(credentials);
        
        setUser(user);
    };

    return (
      <>
        <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Log In</button>
      </>
    );
}

const LoginAndUploadProducts = () => {
    const [user, setUser] = useState("");

    return (app.currentUser && app.currentUser.providerType !== "anon-user") ? 
    <>
        <hr />
        <UploadProducts /> 
        <hr />
        <Logout user={user} setUser={setUser} />
    </>                     : 
        <Login setUser={setUser} />;
}

export default LoginAndUploadProducts;
