import axios from 'axios';
import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from './contexts/UserContext';

const Div = styled.div`
    
    margin: 15px;
    width: 250px;

    img {
        height: 350px;
        max-width: 250px;
        cursor: pointer;
        object-fit: cover;
    }

    .info {
        text-align: center;
    }

    .info .rating {
        color: #ffce00;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .info p {
        opacity: 0.5;
        margin-bottom: 15px;
        font-size: 12px;
    }

    .info h4 {
        margin-bottom: 10px;
        font-weight: bold;
        cursor: pointer;
    }

    .info h6 {
        margin-bottom: 10px;
        font-size: 15px;
    }
`;

export default function Product({ images, name, category, value }){

    const { userCart, setUserCart } = useContext(UserContext);
    const { user } = useContext(UserContext);

    function addToCart(images, name, value){

        const newCart = [...userCart];
        const itemFound = newCart.find(item => item.name === name);

        if(itemFound){

            itemFound.qty++;

        } else {

            const cartItem = {
                name,
                image: images[0],
                qty: 1,
                value
            };
            
            newCart.push(cartItem);

        }

        setUserCart(newCart);

        (async ()=>{

            try {
                
                const bodyData = {
                    cart: newCart
                };

                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }

                await axios.post('http://localhost:5000/cart', bodyData, requestConfig);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao atualizar seu carrinho. Tente novamente.');
            }

        })();

    }

    return(
        <Div>
            <div className="img">
                <img src={images[0]} alt="" />
            </div>
            <div className="info">
                <div className="rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                </div>
                <p>{category}</p>
                <h4>{name}</h4>
                <h6>R$ {value}</h6>
                <button className="btn-primary" onClick={() => addToCart(images, name, value)}>Adicionar ao carrinho</button>
            </div>
        </Div>
    );

};