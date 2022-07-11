import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import CartModal from './CartModal';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import { API_URL } from '../App';

const Header = styled.div`
    
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 15px;
    z-index: 1;
    

    img {
        cursor: pointer;
    }

    nav a {
        margin: 0 10px;
        font-weight: bold;
        color: #222;
        text-decoration: none;
        font-size: 18px;
        cursor: pointer;
    }

    nav a:hover {
        color: #00d8be;
    }

    .header-icons {
        position: relative;
    }

    .header-icons ion-icon {
        font-size: 34px;
        cursor: pointer;
    }

    .header-icons span {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        background-color: #222;
        color: #fff;
        padding: 3px;
        width: 8px;
        height: 8px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
    }

    @media(max-width: 410px) {
    
        justify-content: space-between;
        width: 100%;
    }

`;

export default function Menu() {

    const { userCart, setUserCart } = useContext(UserContext);
    const [openedCartModal, setOpenedCartModal] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const openModal = () => setOpenedCartModal(true);
    const closeModal = () => setOpenedCartModal(false);

    useEffect(() => {
        if (!token) return;

        (async () => {

            try {

                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const response = await axios.get(`${API_URL}/cart`, requestConfig);
                setUserCart(response.data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar o seu carrinho.');
            }

        })();

    }, []);

    const userLogout = () => {

        if (window.confirm("Você realmente quer sair?")) {
            localStorage.removeItem("token");
            navigate("/");
        };
    };

    const createNavMenu = () => {

        const signInAndSignUp = (
            <>
                <Link to="/sign-in">
                    Entrar
                </Link>
                <Link to="/sign-up">
                    Cadastrar
                </Link>
            </>
        );
        const logout = (
            <>
                <a onClick={userLogout}>
                    Sair
                </a>
            </>
        );
        return (
            <nav>
                {
                    !token ? signInAndSignUp : logout
                }
            </nav>
        );
    };

    const navMenu = createNavMenu();

    return (
        <>
            <Header>
                <Link to="/">
                    <img src="https://big-skins.com/frontend/foxic-html-demo/images/skins/fashion/logo.webp" alt="Logomarca da loja" />
                </Link>
                {navMenu}
                <div className="header-icons">
                    <div className="cart" onClick={openModal}>
                        <ion-icon name="bag-handle-outline"></ion-icon>
                        <span>{userCart.length}</span>
                    </div>
                </div>
            </Header>
            {
                openedCartModal ?
                    <CartModal closeModal={closeModal} /> :
                    null
            }
        </>
    );

};