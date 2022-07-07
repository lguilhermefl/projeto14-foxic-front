import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import redirectsToHomeIfIsSignedIn from './shared/functions/redirectsToHomeIfIsSignedIn';
import { API_URL } from './App';

import Container from './shared/styles/Container.js';
import Form from './shared/styles/Form.js';
import Button from './shared/styles/Button.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';

export default function SignIn() {

    const navigate = useNavigate();

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
        navigate("/home");
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
        <Container justifyContent="center">
            <Form onSubmit={signIn}>{signInForm}</Form>
            <Link to="/sign-up">
                <SignUpOrSignIn>Primeira vez? Cadastre-se!</SignUpOrSignIn>
            </Link>
        </Container>
    );
};