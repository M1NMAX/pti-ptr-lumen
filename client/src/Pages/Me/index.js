import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'


function ProfileUser(){
    const [id ] = useState(localStorage.getItem('userID'));
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState('');
    const [userExtra, setUserExtra] = useState([]);
    const [email, setemail] = useState();

    const history = useHistory();

    useEffect(() => {
        api.get('api/users/'+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            history.push('/login');
          }else{
            setUser(response.data.user);
            setemail(response.data.user.email);
            setUserType(response.data.user.userable_type.substring(11).toLowerCase());
            setUserExtra(response.data.extra)
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      

        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "ml-3 mr-3" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Os meus dados</h2></Col>                 
                </Row>
                
                <Row>
                    <Col sm={12} md={6}>
                            <img src={DefaultUserPic} alt="profiles pic" style={{maxWidth: '90%'}}/>
                            <Button className="changeImage" variant="info" style={{margin: '4%'}}>Alterar imagem</Button>
                    </Col>
                    <Col sm={12} md={6}>
                        
                        <Form className="form">     
                        { /* <p>{this.state.msg}</p> */}
                            <Form.Group controlId="formCategory1">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={user.username}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control type="email" value={user.name} />
                            </Form.Group>
                            <Form.Group controlId="formCategory3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" value={email} onChange={e => setemail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label>Data de Nascimento:</Form.Label>
                                <Form.Control type="text" defaultValue="N/A" value={user.birthdate}/>
                            </Form.Group>
                           
                            <Form.Group controlId="formCategory7">
                                <Form.Label>Características Pessoais:</Form.Label>
                                <Form.Control type="text" defaultValue="Organizado, vou para a cama cedo, gosto de limpar casas de banho" />
                            </Form.Group>
                            <Form.Group controlId="formCategory8">
                                <Form.Label>Preferências:</Form.Label>
                                <Form.Control type="text" defaultValue="Gostava de viver só com rapazes, de preferência da faculdade onde ando"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicType">
                                <Form.Label>Tenho como objetivo</Form.Label>
                                <Form.Control required as="select" type="type" value={userType} onChange={e => setUserType(e.target.value)} >
                                <option value="one" >selecione uma opção</option>
                                <option value="guest" >Alugar um alojamento</option>
                                <option value="landlord" >Colocar alojamentos para alugar</option>
                                </Form.Control>
                            </Form.Group>
                            
                            {userType === 'guest' && <>
                                <Form.Group controlId="formCategory10">
                                    <Form.Label>Instituição:</Form.Label>
                                    <Form.Control type="text" defaultValue="UL-FCUL" value={userExtra.college}/>
                                </Form.Group>

                                <Form.Group controlId="formCategory11" >
                                    <Form.Label>Genero</Form.Label>
                                    <Form.Control width="sm" name="gender" type="text" value={userExtra.gender} />
                                </Form.Group>

                                <Form.Group controlId="formCategory12" >
                                    <Form.Label>É fumador/a</Form.Label>
                                    <Form.Control width="sm" name="smokers" type="text" value={userExtra.smokers?'sim':'não'} />
                                </Form.Group>

                                <Form.Group controlId="formCategory13" >
                                    <Form.Label>Tem animais de estimação?</Form.Label>
                                    <Form.Control width="sm" name="pets" type="text" placeholder={userExtra.pets?'sim':'não'} />
                                </Form.Group> 
                            </>
                            }
                            
                            {/* Change profile picture  */}
                        {/* <Form.Group controlId="formCategory4">
                                <Form.Control type="file" name="profileImage"/>
                            </Form.Group> */}
                             <Button variant="info" style={{margin: '4%'}}>Guardar as alterações</Button>
                        </Form>
                    </Col>
                </Row>
                </Container>
                <Footer/>
            </div>
        )
    }

  export default ProfileUser;