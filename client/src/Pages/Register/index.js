import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button} from 'react-bootstrap'
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConf] = useState('');
    const [type, setType] = useState('');
    const [uni, setUni] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try {
        const response = await api.post('api/register', {name, email, username, password, password_confirmation}).then(async (res) =>{
            console.log(res.data);
            if(res.data.status){
                const responseLogin = await api.post('api/login', { email, password });
                localStorage.setItem('token', responseLogin.data.token);
                history.push('/');
            }
        });
        } catch (err) {
            // console.log(password);
            // console.log(password_confirmation);
            // console.log(err.response.data);
        alert('Falha no Registo, tente novamente.');
        }
    }
    return (
        <div>
            <NavBarHome/>
            <Form className="login page" onSubmit={handleRegister}>
                <Form.Group controlId="formBasicName" >
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control width="sm" name="name" type="textarea" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId="formBasicEmail" onSubmit={handleRegister}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control width="sm" name="email" type="email" placeholder="exemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    O seu e-mail não será partilhado com nenhuma entidade interna ou externa
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicUsername" onSubmit={handleRegister}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control width="sm" name="username" type="textarea" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Form.Label>Confirmar Password</Form.Label>
                    <Form.Control type="password" name="password_confirmation" placeholder="PasswordConf" value={password_confirmation} onChange={e => setPasswordConf(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicType">
                    <Form.Label>Selecione uma</Form.Label>
                    <Form.Control as="select" type="type" value={type} onChange={e => setType(e.target.value)}>
                    <option>Estou interessado em alugar um alojamento</option>
                    <option>Tenho alojamentos para alugar</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicUni" onSubmit={handleRegister}>
                    <Form.Label>Instituição</Form.Label>
                    <Form.Control width="sm" type="textarea" value={uni} onChange={e => setUni(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submeter
                </Button>
                <Link className="back-link" to="/login">
                    <p size={16} color="#3498db" />
                    Já tenho Conta!
                </Link>
            </Form>
        </div>
    )
}

export default Register
