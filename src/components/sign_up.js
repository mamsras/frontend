import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Signup = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    }
    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    }

    const signup = () => {
        props.signup({username: username, password: password, email:email});
        navigate('/taches');
    }
    return(
        <Container className="login-container">
        <Form className="login-form">
            <h2 className="text-center">S'inscrire</h2>
            <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={onChangeUsername}
                />
            </Form.Group>
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
            <Button variant="primary" onClick={signup} className="login-button">
                Se connecter
            </Button>
        </Form>
    </Container>
    
    )
}
export default Signup;