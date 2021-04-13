import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
//import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button} from 'react-bootstrap'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
        const response = await api.post('api/login', { email, password });
        localStorage.setItem('token', response.data.token);

        history.push('/lists');
        } catch (err) {
        alert('Falha no login, tente novamente.');
        }
    }
    return (
        <div>
            <NavBarHome/>
            <Form className="login page">
                <Form.Group controlId="formBasicEmail" onSubmit={handleLogin}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control width="sm" type="email" placeholder="Insira o seu E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    O seu e-mail não será partilhado com nenhuma entidade interna ou externa
                    </Form.Text>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
                <Link className="back-link" to="/register">
                    <p size={16} color="#3498db" />
                    Não tenho Conta!
                </Link>
            </Form>
        </div>
    )
}

export default Login
