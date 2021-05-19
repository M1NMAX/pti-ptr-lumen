import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
//import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarAdmin from '../../Components/NavBarAdmin'
import {Container, Card, Form, Button} from 'react-bootstrap'
import Footer from '../../Components/Footer'


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const [wrongPass, setWrongPass] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        try {
        const response = await api.post('api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user.id);
        history.push('/admin');
        } catch (err) {
            setErrors(err.response.data.errors);
            setWrongPass(!wrongPass);
        }
    }
    return (
        <div>
            <NavBarAdmin/>

            {/* @someone please handle the way errors are diplay  */}
            {/*{errors.map((error)=>(<span>{error}</span>))} */}
            {/* @someone please handle the way errors are diplay  */}
            <Container>
                <h1 className="h1">Admin Login</h1>
                <Form className="login"  onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="label" as="h6">Email address</Form.Label>
                        <Form.Control required width="sm" type="email" placeholder="Insira o seu E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
        
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="label" as="h6">Password</Form.Label>
                        <Form.Control required type="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    {wrongPass && <p style={{color: 'red'}}>E-mail ou password incorretos</p>}
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
                
            </Container>
            <Footer/>
        </div>
    )
}

export default AdminLogin
