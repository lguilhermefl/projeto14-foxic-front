import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles.js";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";
import Checkout from "./Checkout.js";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </BrowserRouter>
    );
};

export const API_URL = "http://localhost:5000";