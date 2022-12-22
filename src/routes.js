import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsList from './components/products/products-list/ProductsList';
import RegisterUser from './components/user/RegisterUser';
import UserData from './components/user/user-data/UserData';
import Login from './components/user/login/Login';
import Logout from './components/user/Logout';
import ProductDetail from './components/products/product-detail/ProductDetail';
import Order from './components/products/order/Order';
import Cart from './components/products/cart/Cart';
import App from './components/App';
import LandingPage from './components/landing-page/LandingPage';
import Footer from './components/footer/Footer';
import ThankYou from './components/products/thank-you/ThankYou';
import FormEditor from './components/user/user-data/FormEditor';


const AppRoutes = () => (
    <BrowserRouter>
            <App/>
            <Routes>
                
                <Route exact path="/" element={<LandingPage/>}/>
                {/*<Route exact path="/upload-products" element={<UploadProducts/>}/> */}
                
                {<Route exact path="/mobiles" element={<ProductsList/>}/>}
                <Route exact path="/register" element={<RegisterUser/>}/>
                <Route exact path="/user" element={<UserData/>}/>
                <Route exact path="/product" element={<ProductDetail/>}/>
                <Route exact path="/cart" element={<Cart/>}/>
                <Route exact path="/order" element={<Order/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/logout" element={<Logout/>}/>
                <Route exact path="/thankyou" element={<ThankYou/>}/>
                <Route exact path="/form" element={<FormEditor/>}/>
            </Routes>
            <Footer/>
    </BrowserRouter>
)

export default AppRoutes;
