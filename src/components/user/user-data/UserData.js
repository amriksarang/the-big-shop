import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../../AppProvider';
import FormEditor from './FormEditor';
import './UserData.css';

const addressKeys = {
    "houseno": "House No",
    "street1" : "Street 1",
    "street2" : "Street 2",
    "city" : "City",
    "state": "State"
}

const personalDetailsKeys = {
    "firstname": "First Name",
    "lastname" : "Last Name",
    "primary-phone" : "Primary Phone",
    "secondary-phone" : "Secondary Phone"
}

const UserData = () => {
    
    const [isAddAddress, setIsAddAddress] = useState(false);

    const [mongoDB, setMongoDB] = useState(null);
    const [useDataCollection, setUseDataCollection] = useState(null);
    const [personalDetails, setPersonalDetails] = useState(null);

    const app = React.useContext(AppContext).app;

    let navigate = useNavigate();

    let customData = app.currentUser.customData;
    let addresses = app.currentUser.customData.addresses;

    useEffect(() => {
        setMongoDB(app.currentUser.mongoClient("mongodb-atlas"));  
        
        if(customData){
            if(customData.firstname){
                let personalDetails = [];
                let data = {};
                data.firstname = customData.firstname;
                data.lastname = customData.lastname;
                data["primary-phone"] = customData["primary-phone"];
                data["secondary-phone"] = customData["secondary-phone"];
                personalDetails.push(data);
                setPersonalDetails(personalDetails);
            }
        }
    }, [app]);


    useEffect(() => {
        if(mongoDB)
            setUseDataCollection(mongoDB.db("the-big-shop").collection("user-data"));
    }, [mongoDB]);

    useEffect(() => {
        if(app.currentUser && app.currentUser.providerType === "anon-user"){   
            navigate("/login");
        }
    }, []);


    const goToCart = () => {
        navigate("/cart");
    }

    const handleUserData = (data) => {
        console.log(data);
        const func = async () => {
            console.log("calling realm for user data");
           
            await useDataCollection.updateOne(
                { userId: app.currentUser.id }, 
                { $set: { 
                    firstname: data[0].firstname,
                    lastname: data[0].lastname,
                    "primary-phone": data[0]["primary-phone"],
                    "secondary-phone": data[0]["secondary-phone"],
                    email: app.currentUser._profile.data.email
                    
                } } , {upsert: true}
            );
            
            await app.currentUser.refreshCustomData();
        }
        func();        
    }
    
    const handleAddressData = (data) => {
        console.log(data);
        const func = async () => {
            console.log("calling realm for address data");
            await useDataCollection.updateOne(
                { userId: app.currentUser.id }, 
                { $set: { 
                    addresses: data
                } } , {upsert: true}
            );
            await app.currentUser.refreshCustomData();
            setIsAddAddress(false);
        }
        func();
    }

    const handleAddAddress = () => {
        setIsAddAddress(true);
    }

    const handleCancelAddressData = () => {
        setIsAddAddress(false);
    }


    return <div className="user-address-container">
        <p style={{textAlign: "right", marginTop: "20px"}}><button className='product-detail-add-button' onClick={goToCart}>Go To Cart</button></p>
        <FormEditor keysAndLabels={personalDetailsKeys} skipFields={{"_id": "_id"}} data={personalDetails} handleSubmit={handleUserData}/>
        {<FormEditor keysAndLabels={addressKeys} skipFields={{"_id": "_id"}} data={addresses} handleSubmit={handleAddressData} deleteOption={true}/>}
        {isAddAddress && <FormEditor keysAndLabels={addressKeys} skipFields={{"_id": "_id"}}  handleSubmit={handleAddressData} handleCancel={handleCancelAddressData}/>}
        {!isAddAddress && <button className='product-detail-add-button' onClick={handleAddAddress}>Add Address</button>}
    </div>
}

export default UserData;

