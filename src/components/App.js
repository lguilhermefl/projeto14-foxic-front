import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles.js";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp.js";
import UserContext from "./shared/contexts/UserContext.js";
import { useState } from "react";

export default function App() {

    const [user, setUser] = useState({});
    const [userCart, setUserCart] = useState([]);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={{user, setUser, userCart, setUserCart}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export const API_URL = "http://localhost:5000";