import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles.js";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";
import Checkout from "./Checkout.js";
import ProductPage from './ProductPage.js';
import OrderSuccess from "./OrderSuccess.js";
import UserContext from "./shared/contexts/UserContext.js";
import { useState } from "react";
import dotenv from 'dotenv';
dotenv.config();

export default function App() {

    const [userCart, setUserCart] = useState([]);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={{ userCart, setUserCart }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/produtos/:productName" element={<ProductPage />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export const API_URL = process.env.REACT_APP_API_BASE_URL;