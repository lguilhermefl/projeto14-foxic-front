import CartItem from "./CartItem";
import styled from "styled-components";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "./contexts/UserContext";

const Div = styled.div`
    
    position: fixed;
    z-index: 1;
    top: 0;
    transition: 1s;
    flex-direction: column;
    width: 35%;
    height: 100%;
    background-color: #ffffff;
    align-items: center;
    right: 0;
    display: flex;

    .modal-header {
        display: flex;
        justify-content: flex-end;
        height: 110px;
        flex-direction: column;
        width: 100%;
        padding-right: 50px;
        align-items: end;
        font-size: 40px;
    }

    .modal-header ion-icon:hover {
        cursor: pointer;
    }

    .items-list {
        overflow-y: scroll;
        height: 360px;
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-top: 280px;
    }

    .items-list h4 {
        text-align: center;
    }

    .modal-footer {
        margin-top: 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .modal-footer .subtotal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        box-sizing: border-box;
        font-weight: bold;
    }

    .modal-footer a {
        margin: 0 50px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
    }

    .closed {
        right: -500px;
        display: none;
    }

    .opened {
        right: 0;
        display: flex;
    }

    @media(max-width: 410px) {
    
        width: 100%;
        
        .modal-header {
            height: 50px;
        }
    
    }
`;

export default function CartModal({ closeModal }) {

    const navigate = useNavigate();
    const { userCart } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const cartTotal = userCart.reduce((prev, current) => prev + (current.value * current.qty), 0);

    const cartItemsList = userCart.map(cartItem => <CartItem image={cartItem.image} name={cartItem.name} qty={cartItem.qty} value={cartItem.value} />);

    function goToCheckout(e) {

        if (!token) {
            e.preventDefault();
            alert('Você precisa estar logado para concluir seu pedido. Estamos te redirecionando para a página de login.');
            window.scrollTo(0, 0);
            navigate('/sign-in');
        }

    };

    return (
        <Div className="closed">

            <div className="modal-header">
                <ion-icon name="close-circle-outline" onClick={closeModal}></ion-icon>
            </div>

            <div className="items-list">

                {
                    userCart.length > 0 ?
                        cartItemsList :
                        <h4>Você não possui itens adicionados ao carrinho :(</h4>
                }

            </div>

            <div className="modal-footer">

                <div className="subtotal">
                    <span>SubTotal</span>
                    <span>R$ {cartTotal}</span>
                </div>

                <Link to="/checkout" onClick={goToCheckout} className="btn-primary">
                    Checkout
                </Link>

            </div>

        </Div>
    );

};