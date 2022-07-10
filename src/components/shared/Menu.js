import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import CartModal from './CartModal';
import UserContext from './contexts/UserContext';
import axios from 'axios';

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
    
        nav {
            display: none;
        }
    
    }

`;

export default function Menu(){

    const { userCart, setUserCart, user } = useContext(UserContext);
    const [openedCartModal, setOpenedCartModal] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setOpenedCartModal(true);
    const closeModal = () => setOpenedCartModal(false);

    useEffect(()=>{

        if(!user.token) return;

        (async ()=>{

            try {
                
                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }

                const response = await axios.get('http://localhost:5000/cart', requestConfig);
                setUserCart(response.data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar o seu carrinho.');
            }

        })();

    }, []);

    function goToCheckout(e){

        if(!user.token) {
            e.preventDefault();
            alert('Você precisa estar logado para concluir seu pedido. Estamos te redirecionando para a página de login.');
            navigate('/sign-in');
        }

    };

    return(
        <>
            <Header>
                <img src="https://big-skins.com/frontend/foxic-html-demo/images/skins/fashion/logo.webp" alt="Logomarca da loja" />
                <nav>
                    <Link to="/">
                        Início
                    </Link>
                    <Link to="/checkout" onClick={goToCheckout}>
                        Checkout
                    </Link>
                </nav>
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