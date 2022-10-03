import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
//import './index.css';

import { AppProvider } from './AppProvider';
import { CartProvider } from './components/products/cart/CartProvider';
import {UserProvider} from './components/user/UserProvider';

const APP_ID = "the-big-shop-poikl";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider appId={APP_ID}>
            <UserProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </UserProvider>
        </AppProvider>
    </React.StrictMode>,
  document.getElementById('root')
);
