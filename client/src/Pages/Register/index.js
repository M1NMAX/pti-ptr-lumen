import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarHome from '../../Components/NavBarHome'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import DefaultUserPic from "../../img/standartUser3.png";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConf] = useState('');
    const [type, setType] = useState('');
    const [college, setCollege] = useState('');
    const [gender, setGender] = useState('');
    const [smoker, setSmoker] = useState('');
    const [age, setAge] = useState('');
    const [pet, setPet] = useState('');
    

    console.log(type);

    const [errors, setErrors] = useState([]);

    const history = useHistory();
    console.log(birthdate)

    async function handleRegister(e) {
        e.preventDefault();

        let data = {
            'username': username,
            'name': name,
            'email': email,
            'birthdate':  birthdate,
            'password': password,
            'password_confirmation': password_confirmation,
            'type': type,
            'college': college,
            'gender': gender, 
            'smokers': smoker, 
            'pets': pet,
            'age': age,
        };

        try {
        await api.post('api/register', data
         ).then(async (response) =>{
            if(response.data.status){
                const responseLogin = await api.post('api/login', { email, password });
                localStorage.setItem('token', responseLogin.data.token);
                history.push('/dashboard');
            }
        });
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    }
    return (
        <div>
            <NavBarHome/>
            {/* @someone please handle the way errors are diplay  */}
            {/*{errors.map((error)=>(<span>{error}</span>))} */}
            {/* @someone please handle the way errors are diplay  */}
            <Container>
                <h1 className='text-center'>Registo</h1>
                <Row>
                    <Col sm={12} md={6}>
                        <img src={DefaultUserPic} alt="profiles pic" style={{maxWidth: '90%'}}/>
                        <Button className="changeImage" variant="info" style={{margin: '4%'}}>Adicionar imagem</Button>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form  onSubmit={handleRegister}>
                            <Form.Group controlId="formBasicName" >
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control required width="sm" name="name" type="textarea" value={name} onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicEmail" onSubmit={handleRegister}>
                                <Form.Label>  Email address</Form.Label>
                                <Form.Control required width="sm" name="email" type="email" placeholder="exemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                O seu e-mail não será partilhado com nenhuma entidade interna ou externa
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername" onSubmit={handleRegister}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control  required width="sm" name="username" type="textarea" value={username} onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername" onSubmit={handleRegister}>
                                <Form.Label>Data de nascimento</Form.Label>
                                <Form.Control width="sm" name="birthdate" type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                <Form.Label>Confirmar Password</Form.Label>
                                <Form.Control required type="password" name="password_confirmation" placeholder="PasswordConf" value={password_confirmation} onChange={e => setPasswordConf(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicType">
                                <Form.Label>Tenho como objetivo</Form.Label>
                                <Form.Control required as="select" type="type" value={type} onChange={e => setType(e.target.value)}>
                                <option value="one" >selecione uma opção</option>
                                <option value="guest" >Alugar um alojamento</option>
                                <option value="landlord" >Colocar alojamentos para alugar</option>
                                </Form.Control>
                            </Form.Group>

                            {type=='guest'&& <>
                                <Form.Group controlId="formBasicCollege" onSubmit={handleRegister}>
                                    <Form.Label> Nome da Instituição</Form.Label>
                                    <Form.Control width="sm" type="textarea" value={college} onChange={e => setCollege(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicRoom">
                                    <Form.Label> Idade:</Form.Label>
                                    <Form.Control width="sm" type="number" value={age} onChange={e => setAge(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicGender">
                                    <Form.Label>Género:</Form.Label>
                                    <Form.Control required as="select" type="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>
                                    <option  value="Masculino"> Masculino </option>
                                    <option  value="Feminino"> Feminino </option>
                                    <option  value="Outro"> Outro </option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicSmoker">
                                    <Form.Label> É fumador/a?</Form.Label>
                                    <Form.Control as="select" type="type" value={smoker} onChange={e => setSmoker(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>  
                                    <option  value="1">Sim</option>
                                    <option  value="0">Não</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicPet">
                                    <Form.Label>Tem animais de estimações</Form.Label>
                                    <Form.Control as="select" type="type" value={pet} onChange={e => setPet(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>
                                    <option  value="1">Sim</option>
                                    <option  value="0">Não</option>
                                    </Form.Control>
                                </Form.Group>
                                </>
                            }
                            

                            <Button variant="info" type="submit">
                                Submeter
                            </Button>
                            <Link className="back-link" to="/login">
                                <p size={16} color="#3498db" />
                                Já tenho Conta!
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default Register
