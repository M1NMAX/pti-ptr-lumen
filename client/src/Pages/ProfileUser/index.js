import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';




function ProfileUser(){
    let { id } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState(null);
    const [userExtra, setUserExtra] = useState([]);

    
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
            setUserType(response.data.user.userable_type.includes('Guest'));
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
                <h1 className='text-center'>Meu dados</h1>
                <Row>
                    <Col>
                            <img src={DefaultUserPic} alt="profils pic" />
                    </Col>
                    <Col>
                        
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
                                <Form.Control type="text" value={user.email}/>
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
                            <Form.Group controlId="formCategory9">
                                <Form.Label>Estou interessado em:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={userType}
                                    type="radio"
                                    label="Alugar um alojamento"
                                    name="alugarAlojamento"
                                    id="alugarAlojamento"
                                    />
                                    <Form.Check
                                    checked={!userType}
                                    type="radio"
                                    label="Tenho um alojamento para alugar"
                                    name="tenhoAlojamento"
                                    id="tenhoAlojamento"
                                    />
                                </Col>
                            </Form.Group>
                            {userType &&
                                <Form.Group controlId="formCategory10">
                                    <Form.Label>Instituição:</Form.Label>
                                    <Form.Control type="text" defaultValue="UL-FCUL" value={userExtra.college}/>
                                </Form.Group>
                            }
                            
                            {/* Change profile picture  */}
                        {/* <Form.Group controlId="formCategory4">
                                <Form.Control type="file" name="profileImage"/>
                            </Form.Group> */}
                <Button variant="primary" >Salva as alterações</Button>
                        </Form>
                    </Col>

                </Row>
                </Container>
            </div>
        )
    }

  export default ProfileUser;