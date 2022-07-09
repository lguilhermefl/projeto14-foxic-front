import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from './App';

import Container from './shared/styles/Container.js';
import Menu from './shared/Menu';
import Advantages from './shared/Advantages';
import Footer from './shared/Footer';

export default function Checkout() {

    const navigate = useNavigate();

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
                            maxLength="40"
                            placeholder="Estado"
                            value={shippingAddress.state}
                            onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        />
                    </Row>
                    <Row>
                        <input
                            disabled={loading}
                            required
                            type="number"
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
                    maxLength="50"
                    placeholder="Rua ou Avenida"
                    value={shippingAddress.street}
                    onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="30"
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
                    type="number"
                    maxLength="11"
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

    const signInSuccess = (data) => {
        // setUser({
        //     name: "",
        //     password: ""
        // });
        localStorage.setItem("token", data);
        setLoading(false);
        navigate("/");
    };

    const signIn = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/sign-in`;
        const userInfo = { ...shippingAddress };

        axios
            .post(URL, userInfo)
            .then(({ data }) => {
                signInSuccess(data);
            })
            .catch(() => {
                alert("Houve um erro em seu login, tente novamente por favor!");
                setLoading(false);
            });
    };

    const shippingAddressFields = createShippingAddressFields();
    const paymentInfoFields = createPaymentInfoFields();

    return (
        <>
            <Menu />
            <Container>
                <Title>Fazer Pedido</Title>
                <Form>
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
        padding: 15px;
        width: 50%;
    }
`

const Card = styled.div`
    box-sizing: border-box;
    border: 1px solid #f4f4f4;
    box-sizing: border-box;
    padding: 15px;
`

const TitleForm = styled.h2`
    font-weight: 500;
    font-size: 1.4em;
    color: #282828;
    margin-bottom: 20px;
`

const InputsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
    width: 100%;

    input {
        background: #f7f7f8;
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