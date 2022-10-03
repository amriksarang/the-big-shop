import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../../AppProvider';
import { CartContext } from '../cart/CartProvider';
import {UserContext} from '../../user/UserProvider';
import './Order.css';

const Order = () => {

    const [address, setAddress] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [ccv, setCcv] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [products, setProducts] = useState("");
    const [houseIndex, setHouseIndex] = useState(0);


    const app = React.useContext(AppContext).app;
    const cart = React.useContext(CartContext);
    const user = React.useContext(UserContext);
    let navigate = useNavigate();

    let addresses = app.currentUser.customData.addresses;
    let customData = app.currentUser.customData;    

    let mongoDB = app.currentUser.mongoClient("mongodb-atlas");
    let database = mongoDB.db("the-big-shop");
    let orderCollection = database.collection("orders");


    useEffect( () => {
        if( app.currentUser.providerType !== "local-userpass"){
            navigate("/login");
            console.log("redirecting user");
        }
        try{
            setProducts(JSON.parse(localStorage.getItem("products")));
        }catch(e){

        }

        if(!addresses){
            navigate("/user");
        }
        
    }, [user]);


    const placeOrder = (e) => {
        e.preventDefault();
        
        const func = async () => {
            console.log("calling realm");
            await orderCollection.insertOne( 
                {
                    userId: customData.userId,
                    address: address,
                    "credit-card": creditCard,
                    "primary-phone": customData["primary-phone"],
                    "secondary-phone": customData["secondary-phone"],
                    "expiry-date": expiryDate,
                    "name-on-card": nameOnCard,
                    "products": products
                }
            );
            
            await app.currentUser.refreshCustomData();
            
            localStorage.setItem("products", "");
            cart.emptyCart();
            navigate('/thankyou');
        }
        func();
    }

    const handleAddress = (item, index) => {
        setAddress(item);
        setHouseIndex(index);
    };

    return <>
    <div className="order-container">
        <h4>Select Addresses</h4>
        <div className='address-container'>
        
            <ul>
            {
                addresses && addresses.map((item, index) => {
                    
                    return  item && <li key={item._id} style={{border: houseIndex === index ? "2px solid brown " : "1px solid lightgrey"}}>
                        <input type="radio" checked={index === houseIndex} disabled/>
                        <div className='house-details'>
                            <p>{item.houseno}</p>
                            <p>{item.street1}</p>
                            {item.street2 && <p>{item.street2}</p>}
                            <p>{item.city}</p>
                            <p>{item.state}</p>
                            <p>{item.zipcode}</p>
                        </div>
                        <button className='product-detail-add-button' onClick={() => handleAddress(item, index)} disabled={houseIndex === index ? true : false}>Select</button>
                    </li>
                })
            }
            </ul>

            
            <h4>Total Price = {products["total"]}</h4>
        </div>

        <h4>Payment Details</h4>
        <form className='credit-card-form'>
            <div className="payment-item ">
                <label htmlFor="credit-card" >Card No</label>
                <input  id="credit-card" type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)}/>
            </div>
            
            <div className='payment-item '>
                <label htmlFor="expiry-date" >Expiry Date</label>
                <input id="expiry-date" type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/>
            </div>
            
            <div className='payment-item '>
                <label htmlFor="ccv" >CCV</label>
                <input id="ccv" type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} />
            </div>
            
            <div className='payment-item '>
                <label  htmlFor="name-on-card" >Name on Card</label>
                <input id="name-on-card" type="text"  value={nameOnCard} onChange={(e) =>setNameOnCard(e.target.value)}/>
            </div>

            <button className='product-detail-add-button' onClick={placeOrder} > Place Order </button>
        </form>
    
        </div>
    </>;
}

export default Order;
