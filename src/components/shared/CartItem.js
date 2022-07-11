import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from './contexts/UserContext';
import { API_URL } from '../App';

const Div = styled.div`
    
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 50px;

    ion-icon {
        cursor: pointer;
    }

    img {
        height: 100px;
        width: 70px;
    }

    .info h4 {
        font-weight: bold;
        margin-bottom: 15px;
    }

    .info h4:hover {
        cursor: pointer;
    }

    .info input {
        width: 25px;
        margin-top: 5px;
    }

    .info h5 {
        margin-top: 50px;
        font-weight: bold;
    }
`;

export default function CartItem({ image, name, qty, value }) {

    const { userCart, setUserCart } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    function updateItemQty(itemName, e) {

        const newQty = parseInt(e.target.value);

        if (newQty < 0) return;

        const itemFound = userCart.find(item => item.name === itemName);

        if (itemFound) {

            itemFound.qty = newQty;
            const newCart = [...userCart];
            setUserCart(newCart);

            (async () => {

                try {

                    const bodyData = {
                        cart: newCart
                    };

                    const requestConfig = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    await axios.post(`${API_URL}/cart`, bodyData, requestConfig);

                } catch (err) {
                    console.log(err);
                    alert('Ocorreu um erro ao atualizar seu carrinho. Tente novamente.');
                }

            })();

        }

    }

    function removeItem(itemName) {

        const itemFoundIndex = userCart.findIndex(item => item.name === itemName);

        if (itemFoundIndex > -1) {

            const newCart = [...userCart];
            newCart.splice(itemFoundIndex, 1);
            setUserCart(newCart);

            (async () => {

                try {

                    const bodyData = {
                        cart: newCart
                    };

                    const requestConfig = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    await axios.post(`${API_URL}/cart`, bodyData, requestConfig);

                } catch (err) {
                    console.log(err);
                    alert('Ocorreu um erro ao atualizar seu carrinho. Tente novamente.');
                }

            })();

        }

    }

    function goToProductPage(productName) {
        navigate(`/produtos/${encodeURI(productName)}`);
    }

    return (
        <Div>
            <img src={image} alt="" />
            <div className="info">
                <h4 onClick={() => goToProductPage(name)}>{name}</h4>
                <h6>Quantidade: </h6>
                <input type="number" value={qty} onChange={(e) => updateItemQty(name, e)} />
                <h5>R$ {value}</h5>
            </div>
            <ion-icon name="trash-outline" onClick={() => removeItem(name)}></ion-icon>
        </Div>
    );

};