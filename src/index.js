import React from 'react';
import { createRoot } from 'react-dom/client';

import AppRoutes from './routes';
import { AppProvider } from './AppProvider';
import { CartProvider } from './components/products/cart/CartProvider';
import {UserProvider} from './components/user/UserProvider';

const APP_ID = "the-big-shop-poikl";

const root = createRoot( document.getElementById('root'));
root.render(
        <AppProvider appId={APP_ID}>
            <UserProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </UserProvider>
        </AppProvider>,
 
);


