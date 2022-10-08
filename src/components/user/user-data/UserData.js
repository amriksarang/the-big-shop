import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { AppContext } from '../../../AppProvider';
import './UserData.css';

const UserData = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [alternatePhone, setAlternatePhone] = useState([]);
    const [isEditPersonalDetails, setIsEditPersonalDetails] = useState(false);
    const [isEditPersonalDetailsPending, setIsEditPersonalDetailsPending] = useState(false);

    const [editableAddress, setEditableAddress] = useState(null);
    const [addressNumberInArray, setAddressNumberInArray] = useState();
    const [isEditAddress, setIsEditAddress] = useState(false);
    const [isAddAddress, setIsAddAddress] = useState(false);

    
    const [mongoDB, setMongoDB] = useState(null);
    const [useDataCollection, setUseDataCollection] = useState(null);

    const app = React.useContext(AppContext).app;

    let navigate = useNavigate();

    let customData = app.currentUser.customData;
    let addresses = app.currentUser.customData.addresses;

    useEffect(() => {
        setMongoDB(app.currentUser.mongoClient("mongodb-atlas"));        
    }, [app]);


    useEffect(() => {
        if(mongoDB)
            setUseDataCollection(mongoDB.db("the-big-shop").collection("user-data"));
    }, [mongoDB]);

    useEffect(() => {      

        if(app.currentUser && app.currentUser.providerType === "anon-user"){         
            
            navigate("/login");
        }

        if(!addresses)
            addresses = [];

    }, []);


    const goToCart = () => {
        navigate("/cart");
    }
    



    useEffect(() => {
        if(customData){
            setFirstName(customData.firstname ? customData.firstname : "");
            setLastName(customData.lastname ? customData.lastname : "");
            setPrimaryPhone(customData["primary-phone"] ? customData["primary-phone"] : "" );
            setAlternatePhone(customData["secondary-phone"] ? customData["secondary-phone"] : "");
        }
    }, []); 
    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        setIsEditPersonalDetailsPending(true);
        
        const func = async () => {
            console.log("calling realm");
            await useDataCollection.updateOne(
                { userId: app.currentUser.id }, 
                { $set: { 
                    firstname: firstName,
                    lastname: lastName,
                    "primary-phone": primaryPhone,
                    "secondary-phone": alternatePhone,
                    email: app.currentUser._profile.data.email
                    
                } } , {upsert: true}
            );
            
            await app.currentUser.refreshCustomData();
            customData = app.currentUser.customData;
            setIsEditPersonalDetails(false);
            setIsEditPersonalDetailsPending(false);
        }
        func();
        
    }

    const editPersonalDetails = () => {
        setIsEditPersonalDetails(true);
    }

    const cancelEditPersonalDetails = () => {
        setIsEditPersonalDetails(false);
    }

    


    useEffect( () => {
        
        const id = uuid();
        
        const func = async () => {

            if(!editableAddress) return;
            
            if(addressNumberInArray || addressNumberInArray === 0){
                addresses[addressNumberInArray] = editableAddress;
                
            }else{                
                
                editableAddress["_id"] = id;
                if(addresses)
                    addresses.push(editableAddress);
                else{
                    addresses = [];
                    addresses.push(editableAddress);
                }
            }

            await useDataCollection.updateOne(
                { userId: app.currentUser.id }, 
                { $set: { 
                    addresses: addresses
                } } 
            );
            await app.currentUser.refreshCustomData();
            cancelEditAddress();
            
        }
        (isAddAddress && isEditAddress) && func();

    }, [isAddAddress, isEditAddress]);


    const setUpAddressEdit = (index) => {
        setIsEditAddress(true);
        setAddressNumberInArray(index);            
        setEditableAddress(addresses[index]);        
    }


    const editAddress = (event) => {
        event.preventDefault();        
        setIsAddAddress(true);            
    }


    const addAddress = () => {
        setIsEditAddress(true);
    }


    const setAddressField = (e, k) => {
        setEditableAddress({...editableAddress, [k]: e.target.value});
    }    

    const cancelEditAddress = () => {
        setIsEditAddress(false);
        setIsAddAddress(false);
        setAddressNumberInArray(null);
        setEditableAddress(null);        
    }


    return <>
    <div className="user-address-container">
        <h4>User Personal Details</h4>
        {
            !isEditPersonalDetails && customData?.firstname && <>
                <div className="user-details">
                    <div className="user-addresses">
                        <p className="user-address-field">First Name: {firstName}</p>
                        <p className="user-address-field">Last Name: {lastName}</p>
                        <p className="user-address-field">Phone: {primaryPhone}</p>
                        <p className="user-address-field">Alternate Phone: {alternatePhone}</p>
                    </div>
                    <button className='product-detail-add-button' onClick={editPersonalDetails}>Edit Details</button>
                </div>
            </>
        }

        
        { (isEditPersonalDetails || !customData?.firstname) && 
            <form className="user-detail-form">
                <div className="form-item">
                    <label htmlFor="first-name">First Name</label>
                    <input id="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required pattern=".*\S.*"/>
                </div>
                <div className="form-item">
                    <label htmlFor="last-name">Last Name</label>
                    <input id="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required pattern=".*\S.*"/>
                </div>
                <div className="form-item">
                    <label htmlFor="primary-phone">Primary Phone</label>
                    <input id="primary-phone" type="text" value={primaryPhone} onChange={(e) => setPrimaryPhone(e.target.value)} required pattern=".*\S.*"/>
                </div>
                <div className="form-item">
                    <label htmlFor="alternate-phone">Alternate phone</label>
                    <input id="alternate-phone" type="text" value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} required pattern=".*\S.*"/>
                </div>
                <button className='product-detail-add-button' onClick={handleSubmit} disabled={isEditPersonalDetailsPending} style={isEditPersonalDetailsPending ? {backgroundColor: 'lightgray'} : {} }>Submit</button>        
                <button className='product-detail-add-button' onClick={cancelEditPersonalDetails} disabled={isEditPersonalDetailsPending} style={isEditPersonalDetailsPending ? {backgroundColor: 'lightgray'} : {} }>Cancel</button>        
            </form>
        }
        <h4>User Address Details</h4>
        
        {
            addresses?.map((element, index) => {
                            
                return element && addressNumberInArray !== index && 
                        <div key={element._id} className="user-details">
                            <div className='user-addresses'>
                                <p className="user-address-field">House No: {element.houseno}</p>
                                <p className="user-address-field">Street: {element.street1}</p>
                                {element.street2 ? <p className="user-address-field">Street2: {element.street2}</p> : ""}
                                <p className="user-address-field">City: {element.city}</p>
                                <p className="user-address-field">State: {element.state}</p>
                                <p className="user-address-field">Zipcode: {element.zipcode}</p>
                            </div>
                            <button className='product-detail-add-button' onClick={() => setUpAddressEdit(index)}>Edit Address</button>
                        </div>
            })
        }
        
        {
            (isEditAddress || isAddAddress) && 
                <form className="user-detail-form">
                    <div className='form-item'>
                        <label htmlFor="houseno" >House No </label>
                        <input id="houseno" type="text" value={editableAddress?.houseno} onChange={(e) => setAddressField(e, "houseno")} required pattern=".*\S.*"/>
                    </div>
                    <div className='form-item'>
                        <label htmlFor="street1">Street 1 </label>
                        <input id="street1" type="text" value={editableAddress?.street1} onChange={(e) => setAddressField(e, "street1")} required pattern=".*\S.*"/>
                    </div>
                    <div className='form-item'>
                        <label htmlFor="street2">Street 2</label>
                        <input id="street2" type="text" value={editableAddress?.street2} onChange={(e) => setAddressField(e, "street2")} required pattern=".*\S.*"/>
                    </div>
                    <div className='form-item'>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text"  value={editableAddress?.city} onChange={(e) => setAddressField(e, "city")} required pattern=".*\S.*"/>
                    </div>
                    <div className='form-item'>
                        <label htmlFor="state">State </label>
                        <input id="state" type="text"  value={editableAddress?.state} onChange={(e) => setAddressField(e, "state")} required pattern=".*\S.*"/>                                
                    </div>                
                    <button className='product-detail-add-button' onClick={editAddress} > Save Address </button>
                    <button className='product-detail-add-button' onClick={cancelEditAddress}>Cancel</button>
                </form>
        }
        

        <button className='product-detail-add-button' onClick={addAddress}>Add New Address</button>
        <button className='product-detail-add-button go-to-cart-button' onClick={goToCart}>Go To Cart</button>

    </div>
    </>
}

export default UserData;

