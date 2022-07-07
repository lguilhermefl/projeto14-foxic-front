import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./shared/styles/globalStyles.js";

import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </GlobalStyle>
        </BrowserRouter>
    );
};

export const API_URL = "http://localhost:5000";