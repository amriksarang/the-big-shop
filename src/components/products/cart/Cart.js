import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartProvider';
import { AppContext } from '../../../AppProvider';
import './Cart.css';

const Cart = () => {

    const [ products, setProducts] = useState();

    const cart = React.useContext(CartContext);

    const app = React.useContext(AppContext).app;

    window.addEventListener('storage', () => {
        let items;
        try{
            
            items = JSON.parse(localStorage.getItem("products"));
            setProducts(items);
        }catch(e){

        }        
        
      });


    useEffect( () => { 
        let items;
        try{
            
            items = JSON.parse(localStorage.getItem("products"));
            setProducts(items);
        }catch(e){

        }
        
    }, [cart]);


    const handleProducts = (item, quantity, varient) => {
       
        if(quantity === 0){
           cart.removeItem(item, varient);
        }else{
            cart.setItem(item["product"], quantity, varient);    
        }    
    }

    const deleteItem = (item, varient) => {
        cart.removeItem(item, varient);
    }

    return <>
        <h2 className='shopping-cart-title'>Shopping Cart</h2>
        <div className='shopping-cart-container'>
        
        <ul>
        {   
            products && products["products"] && products["products"].map((item, index) => 
            <li className="cart-product-item" key={item["product"]["product-title"] + index}>
                <img  className='cart-product-image' src={item["product"]["images"]["small"]} alt=""/>
                <div className="cart-product-details">
                    <h4>{item["product"]["product-title"]}</h4>
                    <ul>
                    {item["varient"].map( varient => {     
                        
                        return  <li className='cart-product-varient' key={varient.type}>{varient.type}: {varient.value} : Price Rs.{ !varient.price ? 0 : varient.price}</li>;
                    })}
                    </ul>
                    <p className='cart-item-price'>MRP - Rs. {item["product"].mrp}</p>
                    <button className='product-detail-decrease-button' onClick={() => handleProducts(item, item["quantity"] - 1, item["varient"])}> - </button> {item["quantity"]} 
                    <button className='product-detail-increase-button' onClick={() => handleProducts(item, item["quantity"] + 1, item["varient"])}> + </button>
                    <button className='product-detail-add-button' onClick={() => deleteItem(item, item["varient"])}>Delete</button>
                </div>
            </li>
            )
        }

        </ul>
        {   products && products["products"] && products["products"].length > 0 && <>
            <h4 className='cart-product-total'>Total Price = {products?.total}</h4>
            <p className='cart-payment-details'><Link to="/order"><button className='product-detail-add-button' >Payment Details</button></Link></p>
            </>
        }

        
        {
            (!products || !products["products"] || products["products"].length === 0) && <p>Your cart is empty</p>
        }
        </div>
        
    </>;

}

export default Cart;
