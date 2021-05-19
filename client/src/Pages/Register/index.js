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


    const [errors, setErrors] = useState({});
    const [msgPass, setMsgPass] = useState(''); //Mensagem de erro das password
    const history = useHistory();

    const findFormErrors = () => {
        let newErrors = {}
        let incomplete = false;
        // name errors
        if ( !name || name === '' ) {newErrors.name = true}
        if ( !email || email === '' ) {newErrors.email = true}
        if ( !username || username === '' ) {newErrors.username = true}
        if ( !birthdate || birthdate === '' ) {newErrors.birthdate = true}
        if ( !type || type === '' ) {newErrors.type = true}
        if ( !password || password === '' ) {newErrors.password = true; setMsgPass("Insira uma password!")}
        if ( !password_confirmation || password_confirmation === '' ) {newErrors.password_confirmation = true; setMsgPass("Insira uma password!") }
        if ( password_confirmation.length < 7 || password.length < 7  ) {newErrors.passwordDif = true; setMsgPass("As passwords tem que ter pelo menos 6 caracteres!")}
        if ( !(password_confirmation === password)  ) {newErrors.passwordDif = true; setMsgPass("As passwords tem que ser iguais!")}

        if ( type === 'guest' ) {
            if ( !college || college === '' ) {newErrors.college = true}
            if ( !gender || gender === '' ) {newErrors.gender = true}
            if ( !smoker || smoker === '' ) {newErrors.smoker = true}
            if ( !age || age === '' ) {newErrors.age = true}
            if ( !pet || pet === '' ) {newErrors.pet = true}
        }

        if(Object.keys(newErrors).length > 0) {incomplete=true} else{incomplete=false}
        return [newErrors, incomplete]
    }

    const uploadImage = () => {
        let photo = document.getElementById("ProfileImg").files[0];
        let formData = new FormData();

        formData.append("photo", photo);
        fetch('../../img', {method: "POST", body: formData});
    }

    async function handleRegister(e) {
        e.preventDefault();
        //Verificar se os campos estão preenchidos
        const newErrors = findFormErrors()[0];
        const incomplete = findFormErrors()[1];

        if (incomplete) {
            setErrors(newErrors);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }else{

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
                'smoker': smoker,
                'pets': pet,
            };

            console.log(data);
            await api.post('api/register', data
            ).then(async (response) =>{
                if(response.data.status){
                    const responseLogin = await api.post('api/login', { email, password });
                    console.log(response.data);
                    localStorage.setItem('token', responseLogin.data.token);
                    localStorage.setItem('userID', responseLogin.data.user.id);
                    history.push('/dashboard');
                }
            }).catch (err => {
                console.log(err);
            })
            uploadImage();
        }
    }
    return (
        <div>
            <NavBarHome/>
            <Container>
                <h1 className='text-center'>Registo</h1>
                <Row>
                    <Col className="pt-3" sm={{ span: 7, offset: 1 }} md={{ span: 3, offset: 1 }}>
                        <img src={DefaultUserPic} alt="profiles pic" style={{maxWidth: '70%'}}/>
                        <Button className="changeImage" variant="info" style={{margin: '4%'}}>Adicionar imagem</Button>
                        <input id="ProfileImg" type="file"/>
                    </Col>
                    <Col className="pt-3" sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 1 }}>
                        <Form  noValidate onSubmit={handleRegister}>
                            <Form.Group controlId="formBasicName" >
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control required isInvalid={errors.name} width="sm" name="name" type="textarea" value={name} onChange={e => setName(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira o seu nome!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" onSubmit={handleRegister}>
                                <Form.Label>  Email address</Form.Label>
                                <Form.Control required isInvalid={errors.email} width="sm" name="email" type="email" placeholder="exemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira um e-mail!
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                O seu e-mail não será partilhado com nenhuma entidade interna ou externa
                                </Form.Text>

                            </Form.Group>

                            <Form.Group controlId="formBasicUsername" onSubmit={handleRegister}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control  required isInvalid={errors.username} width="sm" name="username" type="textarea" value={username} onChange={e => setUsername(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira um username!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername" onSubmit={handleRegister}>
                                <Form.Label>Data de nascimento</Form.Label>
                                <Form.Control width="sm" isInvalid={errors.birthdate } name="birthdate" min="1950-12-31" max="2002-12-31" type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira uma data de nascimento!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required isInvalid={errors.password || errors.passwordDif} type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                <Form.Label>Confirmar Password</Form.Label>
                                <Form.Control required isInvalid={errors.password_confirmation || errors.passwordDif} type="password" name="password_confirmation" placeholder="PasswordConf" value={password_confirmation} onChange={e => setPasswordConf(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    {msgPass}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicType">
                                <Form.Label>Tenho como objetivo</Form.Label>
                                <Form.Control required isInvalid={errors.type} as="select" type="type" value={type} onChange={e => setType(e.target.value)}>
                                    <option value="one" >Selecione uma opção</option>
                                    <option value="guest" >Alugar um alojamento</option>
                                    <option value="landlord" >Colocar alojamentos para alugar</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Escolha uma opção!
                                </Form.Control.Feedback>
                            </Form.Group>

                            {type=='guest'&& <>
                                <Form.Group controlId="formBasicCollege" onSubmit={handleRegister}>
                                    <Form.Label> Nome da Instituição:</Form.Label>
                                    <Form.Control width="sm" isInvalid={errors.college} type="textarea" value={college} onChange={e => setCollege(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        Insira o nome de uma Instituição!
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicRoom">
                                    <Form.Label> Idade:</Form.Label>
                                    <Form.Control width="sm" isInvalid={errors.age} type="number" value={age} onChange={e => setAge(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        Insira a sua idade!
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicGender">
                                    <Form.Label>Género:</Form.Label>
                                    <Form.Control required as="select" isInvalid={errors.gender} type="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>
                                    <option  value="Masculino"> Masculino </option>
                                    <option  value="Feminino"> Feminino </option>
                                    <option  value="Outro"> Outro </option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Escolha uma opção!
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicSmoker">
                                    <Form.Label> É fumador/a?</Form.Label>
                                    <Form.Control as="select" type="type" isInvalid={errors.smoker} value={smoker} onChange={e => setSmoker(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>
                                    <option  value="1">Sim</option>
                                    <option  value="0">Não</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Escolha uma opção!
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPet">
                                    <Form.Label>Tem animais de estimações</Form.Label>
                                    <Form.Control as="select" type="type" isInvalid={errors.pet} value={pet} onChange={e => setPet(e.target.value)}>
                                    <option  value="one"> Selecione uma opção</option>
                                    <option  value="1">Sim</option>
                                    <option  value="0">Não</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Escolha uma opção!
                                    </Form.Control.Feedback>
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
