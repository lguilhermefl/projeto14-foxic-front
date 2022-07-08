import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import redirectsToHomeIfIsSignedIn from './shared/functions/redirectsToHomeIfIsSignedIn';
import { API_URL } from './App';

import Container from './shared/styles/Container';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn';
import Menu from './shared/Menu';

export default function SignUp() {

    const navigate = useNavigate();

    useEffect(() => {
        redirectsToHomeIfIsSignedIn(navigate);
    }, []);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        repeat_password: ""
    });
    const [loading, setLoading] = useState(false);

    const createSignUpForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="text"
                    placeholder="Nome"
                    maxLength="40"
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="email"
                    maxLength="40"
                    placeholder="E-mail"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Senha"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Confirme a senha"
                    value={newUser.repeat_password}
                    onChange={e => setNewUser({ ...newUser, repeat_password: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? "Cadastrar" : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const signInSuccess = data => {
        setNewUser({
            name: "",
            email: "",
            password: "",
            repeat_password: ""
        });
        localStorage.setItem("token", data);
        setLoading(false);
        navigate("/");
    };

    const signIn = () => {
        const URL = `${API_URL}/sign-in`;
        const user = {
            email: newUser.email,
            password: newUser.password
        };

        axios
            .post(URL, user)
            .then(({ data }) => {
                signInSuccess(data);
            })
            .catch(() => {
                alert("Houve um erro em seu login automático, você será redirecionado para o login!");
                setLoading(false);
                navigate("/sign-in");
            })

    };

    const signUp = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/sign-up`;
        const user = { ...newUser };

        axios
            .post(URL, user)
            .then(() => {
                signIn();
            })
            .catch(() => {
                alert("Houve um erro em seu cadastro, tente novamente por favor!");
                setLoading(false);
            });
    };

    const signUpForm = createSignUpForm();

    return (
        <Container justifyContent="center">
            <Menu></Menu>
            <Column>
                <Title>Cadastrar</Title>
                <Form onSubmit={signUp}>{signUpForm}</Form>
                <Link to="/sign-in">
                    <SignUpOrSignIn>Já tem uma conta? Entre agora!</SignUpOrSignIn>
                </Link>
            </Column>
        </Container>
    );
};

const Column = styled.div`
    margin-top: 130px;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    font-size: 1.5em;
    font-weight: 700;
    color: #282828;
    margin-bottom: 30px;
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