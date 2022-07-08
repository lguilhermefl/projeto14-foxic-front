import CartItem from "./CartItem";
import styled from "styled-components";

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
    right: -500px;
    display: none;

    .modal-header {
        display: flex;
        justify-content: flex-end;
        height: 110px;
        flex-direction: column;
        width: 100%;
        padding-right: 50px;
        align-items: end;
    }

    .items-list {
        overflow-y: scroll;
        height: 360px;
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
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

    .modal-footer button {
        margin: 0 50px;
    }

    .closed {
        right: -500px;
        display: none;
    }

    .opened {
        right: 0;
        display: flex;
    }
`;

export default function CartModal(){

    return(
        <Div className="closed">

            <div className="modal-header">
                Fechar
            </div>

            <div className="items-list">

                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />

            </div>

            <div className="modal-footer">

                <div className="subtotal">
                    <span>SubTotal</span>
                    <span>R$ 9.999,99</span>
                </div>

                <button className="btn-primary">
                    Checkout
                </button>

            </div>

        </Div>
    );

};