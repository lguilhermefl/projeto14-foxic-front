import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "./contexts/UserContext";

const Section = styled.section`

    display: flex;
    margin-top: 140px;
    margin-bottom: 50px;
    align-items: center;
    width: 100%;
    justify-content: space-around;

    .left-side {
        width: 40%;
    }

    .left-side .rating {
        color: #ffce00;
    }

    .left-side h1 {
        font-size: 28px;
        margin: 20px 0;
        font-weight: bold;
    }

    .left-side img {
        height: 550px;
        max-width: 100%;
    }

    .right-side {
        width: 45%;
    }

    .right-side h3 {
        font-weight: bold;
        margin-bottom: 30px;
        font-size: 20px;
    }

    .right-side p {
        line-height: 26px;
        font-style: italic;
        letter-spacing: 1px;
    }

    .right-side .actions {
        display: flex;
        margin-top: 25px;
    }

    .right-side .actions input {
        width: 10%;
        margin-right: 15px;
        border-radius: 5px;
        border: solid 0.5px;
        font-size: 24px;
        text-align: center;
        padding-left: 12px;
    }

    .right-side .actions button {
        width: 100%;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 3px;
    }

    @media(max-width: 410px) {
    
        flex-wrap: wrap;
    
        .left-side {
            width: 100%;
            text-align: center;
        }
    
        .right-side {
            width: 100%;
            text-align: center;
        }
    
        .left-side img {
            height: 350px;
        }
    
        .right-side .actions {
            justify-content: space-evenly;
        }
        
        .right-side .actions button {
            width: 70%;
            letter-spacing: 1px;
        }
    
    }

`;

export default function ProductDetailsSection({ productName }){

    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const { user, userCart, setUserCart } = useContext(UserContext);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }

                const response = await axios.get(`http://localhost:5000/products/${productName}`, requestConfig);

                setProduct(response.data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao buscar o produto informado');
            }

        })();

    }, []);

    function addToCart(){

        const newCart = [...userCart];
        const itemFound = newCart.find(item => item.name === product.name);

        if(itemFound){

            itemFound.qty = qty;

        } else {

            const cartItem = {
                name: product.name,
                image: product.images[0],
                qty,
                value: product.value
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
        <Section>

            <div className="left-side">

                <div className="rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                </div>

                <h1>{productName}</h1>

                <img src={product.images ? product.images[0] : null} alt="" />

            </div>

            <div className="right-side">

                <h3>R$ {product.value}</h3>
                <p>{product.description}</p>

                <div className="actions">
                    <input type="number" placeholder="1" value={qty} onChange={(e) => setQty(e.target.value)} />
                    <button className="btn-primary" onClick={addToCart}>Adicionar ao carrinho</button>
                </div>

            </div>

        </Section>
    );

};