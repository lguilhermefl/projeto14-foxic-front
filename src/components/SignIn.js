import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';
import redirectsToHomeIfIsSignedIn from './shared/functions/redirectsToHomeIfIsSignedIn';
import { API_URL } from './App';

import Container from './shared/styles/Container.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';
import Menu from './shared/Menu';
import Advantages from './shared/Advantages';
import Footer from './shared/Footer';
import UserContext from './shared/contexts/UserContext';

export default function SignIn() {

    const navigate = useNavigate();
    const { setUser: setUserToken } = useContext(UserContext);

    useEffect(() => {
        redirectsToHomeIfIsSignedIn(navigate);
    }, []);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const createSignInForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="email"
                    maxLength="40"
                    placeholder="E-mail"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Senha"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? "Entrar" : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const signInSuccess = (data) => {
        setUser({
            name: "",
            password: ""
        });
        localStorage.setItem("token", data);
        setLoading(false);
        setUserToken({ token: data });
        navigate("/");
    };

    const signIn = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/sign-in`;
        const userInfo = { ...user };

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

    const signInForm = createSignInForm();

    return (
        <>
            <Menu />
            <Container>
                <Column>
                    <Title>Entrar</Title>
                    <Form onSubmit={signIn}>{signInForm}</Form>
                    <Link to="/sign-up">
                        <SignUpOrSignIn>Primeira vez? Cadastre-se!</SignUpOrSignIn>
                    </Link>
                </Column>
            </Container>
            <Advantages />
            <Footer />
        </>
    );
};

const Column = styled.div`
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

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
    align-items: center;
    gap: 13px;
    width: 100%;
    max-width: 400px;

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

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    background: #17c6aa;
    border-radius: 5px;
    height: 45px;
    padding: 15px 20px;
    border: none;
    min-width: 185px;
    max-width: 205px;
    margin-top: 15px;
    &:hover {
        background: #212529;
    }

    @media (min-width: 1000px) {
        padding: 15px 30px;
    }
`