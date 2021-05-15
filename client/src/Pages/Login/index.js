import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
//import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button} from 'react-bootstrap'
import Footer from '../../Components/Footer'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const [wrongPass, setWrongPass] = useState(false);
    const [validated, setValidated] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        //Verificar se os campos estão preenchidos
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        try {
        const response = await api.post('api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user.id);
        history.push('/dashboard');
        } catch (err) {
            setErrors(err.response.data.errors);
            setWrongPass(!wrongPass);
        }
    }
    return (
        <div>
            <NavBarHome/>

            {/* @someone please handle the way errors are diplay  */}
            {/*{errors.map((error)=>(<span>{error}</span>))} */}
            {/* @someone please handle the way errors are diplay  */}
            <Container>
                <h1 className="h1">Login</h1>
                <Form className="login" noValidate validated={validated} onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="label" as="h6">Email address</Form.Label>
                        <Form.Control required width="sm" type="email" placeholder="Insira o seu E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Insira um e-mail!
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                        O seu e-mail não será partilhado com nenhuma entidade interna ou externa
                        </Form.Text>
                    </Form.Group>
        
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="label" as="h6">Password</Form.Label>
                        <Form.Control required type="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Insira uma password!
                        </Form.Control.Feedback>
                    </Form.Group>
                    {wrongPass && <p style={{color: 'red'}}>E-mail ou password incorretos</p>}
                    <Button variant="info" type="submit">
                        Entrar
                    </Button>
                    <Link className="back-link" to="/register">
                        <p size={16} color="#3498db" />
                        Não tenho Conta!
                    </Link>
                </Form>
                
            </Container>
            <Footer/>
        </div>
    )
}

export default Login
