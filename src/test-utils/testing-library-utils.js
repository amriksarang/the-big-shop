
import { render } from "@testing-library/react";
import { AppProvider } from "../AppProvider";
import { UserProvider } from "../components/user/UserProvider";
import { CartProvider } from "../components/products/cart/CartProvider";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const APP_ID = "the-big-shop-poikl";

const AllTheProviders = ({children}) => {
    return (
    <AppProvider appId={APP_ID}>
        <UserProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </UserProvider>
    </AppProvider>
    )
  }



const renderWithContext = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
