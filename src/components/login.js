import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';


//composant qui gère le login
const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);

    const login = () => {
        props.login({ "email":email, "password":password});
        navigate('/taches');
    }

    return (
        <Container className="login-container">
            <Form className="login-form">
                <h2 className="text-center">Se connecter</h2>
                <Form.Group controlId="formEmail" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login} className="login-button">
                    Se connecter
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
