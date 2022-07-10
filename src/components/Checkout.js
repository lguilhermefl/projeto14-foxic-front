import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from './App';
import UserContext from "./shared/contexts/UserContext";

import CartItem from "./shared/CartItem";
import Container from './shared/styles/Container.js';
import Menu from './shared/Menu';
import Advantages from './shared/Advantages';
import Footer from './shared/Footer';

export default function Checkout() {

    const navigate = useNavigate();

    const { userCart, user } = useContext(UserContext);
    const cartTotal = userCart.reduce((prev, current) => prev + (current.value * current.qty), 0);

    const cartItemsList = userCart.map(cartItem => <CartItem image={cartItem.image} name={cartItem.name} qty={cartItem.qty} value={cartItem.value} />);

    const [shippingAddress, setShippingAddress] = useState({
        name: "",
        country: "Brasil",
        state: "",
        zipCode: "",
        street: "",
        numberAndExtraInfo: ""
    });
    const [paymentInfo, setPaymentInfo] = useState({
        creditCardNumber: "",
        cpf: "",
        validThru: "",
        cvvCode: ""
    });
    const [loading, setLoading] = useState(false);

    const createShippingAddressFields = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="40"
                    placeholder="Nome completo"
                    value={shippingAddress.name}
                    onChange={e => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                />
                <input
                    disabled={true}
                    required
                    type="text"
                    value="Brasil"
                />
                <BoxSmallInputs>
                    <Row>
                        <input
                            disabled={loading}
                            required
                            type="text"
                            maxLength="19"
                            placeholder="Estado"
                            value={shippingAddress.state}
                            onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        />
                    </Row>
                    <Row>
                        <input
                            disabled={loading}
                            required
                            type="text"
                            maxLength="9"
                            placeholder="CEP"
                            value={shippingAddress.zipCode}
                            onChange={e => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        />
                    </Row>
                </BoxSmallInputs>
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="40"
                    placeholder="Rua ou Avenida"
                    value={shippingAddress.street}
                    onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="20"
                    placeholder="Número e complemento"
                    value={shippingAddress.numberAndExtraInfo}
                    onChange={e => setShippingAddress({ ...shippingAddress, numberAndExtraInfo: e.target.value })}
                />
            </>
        );
    };

    const createPaymentInfoFields = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="number"
                    maxLength="16"
                    placeholder="Número do cartão"
                    value={paymentInfo.creditCardNumber}
                    onChange={e => setPaymentInfo({ ...paymentInfo, creditCardNumber: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="14"
                    placeholder="CPF"
                    value={paymentInfo.cpf}
                    onChange={e => setPaymentInfo({ ...paymentInfo, cpf: e.target.value })}
                />
                <BoxSmallInputs>
                    <Row>
                        <input
                            disabled={loading}
                            required
                            type="text"
                            maxLength="5"
                            placeholder="Validade MM/YY"
                            value={paymentInfo.validThru}
                            onChange={e => setPaymentInfo({ ...paymentInfo, validThru: e.target.value })}
                        />
                    </Row>
                    <Row>
                        <input
                            disabled={loading}
                            required
                            type="number"
                            maxLength="3"
                            placeholder="Código de segurança"
                            value={shippingAddress.cvvCode}
                            onChange={e => setShippingAddress({ ...shippingAddress, cvvCode: e.target.value })}
                        />
                    </Row>
                </BoxSmallInputs>
            </>
        );
    };

    const orderSuccess = () => {
        setShippingAddress({
            name: "",
            country: "Brasil",
            state: "",
            zipCode: "",
            street: "",
            numberAndExtraInfo: ""
        });
        setPaymentInfo({
            creditCardNumber: "",
            cpf: "",
            validThru: "",
            cvvCode: ""
        });
        setLoading(false);
        window.scrollTo(0, 0);
        navigate("/order-success");
    };

    const sendOrder = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/orders`;
        const token = localStorage.getItem("token");

        const orderInfo = {
            shippingAdress: {
                name: shippingAddress.name,
                country: "Brasil",
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode,
                street: shippingAddress.street,
                numberAndExtraInfo: shippingAddress.numberAndExtraInfo
            },
            paymentInfo: {
                creditCardNumber: paymentInfo.creditCardNumber.toString(),
                cpf: paymentInfo.cpf,
                validThru: paymentInfo.validThru,
                cvvCode: paymentInfo.cvvCode.toString()
            },
            orderSummary: userCart,
            totalValue: cartTotal
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .post(URL, orderInfo, config)
            .then(() => {
                orderSuccess();
            })
            .catch(() => {
                alert("Preencha as informações corretamente por favor!");
                setLoading(false);
            });
    };

    const shippingAddressFields = createShippingAddressFields();
    const paymentInfoFields = createPaymentInfoFields();

    console.log(userCart);

    return (
        <>
            <Menu />
            <Container>
                <Title>Fazer Pedido</Title>
                <Form onSubmit={sendOrder}>
                    <Wrapper>
                        <Card>
                            <TitleForm>Endereço de Entrega</TitleForm>
                            <InputsBox>{shippingAddressFields}</InputsBox>
                        </Card>
                    </Wrapper>
                    <Wrapper>
                        <Card>
                            <TitleForm>Informações de Pagamento</TitleForm>
                            <InputsBox>{paymentInfoFields}</InputsBox>
                        </Card>
                    </Wrapper>
                    <ColumnOrderDetais>
                        <OrderDetails>Detalhes do Pedido</OrderDetails>
                        <div className="items-list">
                            {
                                userCart.length > 0 ?
                                    cartItemsList :
                                    <h4>Você não possui itens adicionados ao carrinho :(</h4>
                            }
                        </div>
                    </ColumnOrderDetais>
                    <ColumnPlaceOrder>
                        <RowPlaceOrder>
                            <TotalOrderBox>
                                <Total>Total</Total>
                                <TotalOrderValue>R$ {cartTotal}</TotalOrderValue>
                            </TotalOrderBox>
                            <ButtonPlaceOrder>Fazer Pedido</ButtonPlaceOrder>
                        </RowPlaceOrder>
                    </ColumnPlaceOrder>
                </Form>
            </Container>
            <Advantages />
            <Footer />
        </>
    );
}

const Title = styled.h1`
    font-size: 1.5em;
    font-weight: 600;
    color: #282828;
    margin-bottom: 30px;
    margin-top: 120px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 13px;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0;
    }
`

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    
    @media (min-width: 768px) {
        padding: 0 15px;
        width: 50%;
    }
`

const ColumnOrderDetais = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 768px) {
        padding: 0 15px;
        width: calc((100%/3)*2);
    }
`

const OrderDetails = styled.span`
    font-weight: 500;
    font-size: 1.4em;
    color: #17c6aa;
`

const ColumnPlaceOrder = styled.div`
    width: 100%;
    box-sizing: border-box;
    @media (min-width: 768px) {
        padding: 0 15px;
        width: calc((100%/3)*1);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

const RowPlaceOrder = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const TotalOrderBox = styled.div`
    display: flex;
    justify-content: space-between;
`

const Total = styled.span`
    font-size: 20px;
`

const TotalOrderValue = styled.span`
    font-size: 2em;
    color: #282828;
    font-weight: 500;
`

const Card = styled.div`
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 15px;
`

const TitleForm = styled.h2`
    font-weight: 500;
    font-size: 1.4em;
    color: #282828;
    margin-bottom: 20px;
`

const ButtonPlaceOrder = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    background: #17c6aa;
    border-radius: 5px;
    height: 45px;
    padding: 15px 20px;
    border: none;
    margin-top: 15px;
    width: 100%;
    &:hover {
        background: #212529;
    }

    @media (min-width: 1000px) {
        padding: 15px 30px;
    }
`

const InputsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
    width: 100%;

    input {
        background: #ececed;
        border-radius: 5px;
        height: 58px;
        box-sizing: border-box;
        font-size: 20px;
        padding: 0 15px;
        color: #282828;
        border: none;
        outline: none;
        width: 100%;
    }

    /* Remove input number arrows */ 

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
`

const BoxSmallInputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 13px;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2%;
    }
`

const Row = styled.div`
    width: 100%;
    @media (min-width: 768px) {
        box-sizing: border-box;
        width: 49%;
    }
`