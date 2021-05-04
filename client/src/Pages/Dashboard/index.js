
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card,Row,Col,Container,Form} from 'react-bootstrap'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import chatImg from '../../img/chatImg.png'
import chatImgNew from '../../img/chatImgNew.png'
import profile from '../../img/profile.png'
import favourite from '../../img/favourite.png'
import pending from '../../img/pending.png'
import search from '../../img/search.png'
import manage from '../../img/manage.png'
import create from '../../img/add.png'
import edit from '../../img/create.png'
import home from '../../img/home.png'
import Footer from '../../Components/Footer'
import './index.css'
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [token] = useState(localStorage.getItem('token'));
    
    const [user, setUser] = useState('');

    const history = useHistory();

    useEffect(() => {
        
       
          api.get('api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
                history.push('/login');
            }else{
                setUser(response.data);
                console.log(response.data)
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

    if (user.userable_type == "App\\Models\\Landlord") {
      
      return (
        <div>
          <NavBarHome/>
          <Container fluid>
            <Row>
              <Col sm={12} lg={2} className="sidebar">
                <Row>
                  <a href="/listChat">
                    <img className = "imgDashboard" src={chatImg}></img> Mensagens
                  </a>
                </Row>
                <Row>
                  <a href="/registerAccommodation">
                    <img className = "imgDashboard" src={create}></img> Adicionar Alojamento
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    <img className = "imgDashboard" src={pending}></img> Pendentes
                  </a>
                </Row>
                <Row>
                  <a href="/profile">
                    <img className = "imgDashboard" src={profile}></img> Perfil
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    <img className = "imgDashboard" src={edit}></img> Editar Alojamento
                  </a>
                </Row>
                <Row>
                  <a href="/">
                    <img className = "imgDashboard" src={home}></img> Página Inicial
                  </a>
                </Row>
              </Col>
              
              <Col sm={10} lg={10}>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Bem-vindo, {user.username}</Card.Title>
                        <Form inline className="searchDashboard">
                          <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" />
                          <Button variant="primary" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                        </Form>
                    </Card.Body>
                </Card>   
              </Col>
            </Row>
          </Container>
        </div>
            

      )
  } else {
    return (
      <div>
      <NavBarHome/>
      <Card className="text-center">
          <Card.Header>Dashboard</Card.Header>
          <Card.Body>
              <Card.Title>Bem-vindo, {user.username}</Card.Title>
              <Form inline className="searchDashboard">
                <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" />
                <Button variant="primary" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
              </Form>
          </Card.Body>
      </Card>
          <Container fluid>
            <Row className="mb-5 mt-5" xs={6} sm={4}>
              <Col xs={6} sm={4}>
                <a href="/listChat">
                  <Card className="text-center">                   
                    <Card.Img className="imgDashboard" src={chatImg}></Card.Img>
                    <Card.Body>
                      <Card.Title>Veja as suas mensagens!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col xs={6} sm={4}>
                <a href="/registerAccommodation">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={search}></Card.Img>
                    <Card.Body>
                      <Card.Title>Procure um alojamento!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col xs={6} sm={4}>
                <a href="/favourites">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={favourite}></Card.Img>
                    <Card.Body>
                      <Card.Title>Verifique os seus alojamentos favoritos!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>

              <Col xs={6} sm={4}>
                <a href="/profile">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={profile}></Card.Img>
                    <Card.Body>
                      <Card.Title>Aceda ao seu perfil!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col xs={6} sm={4}>
                <a href="/registerAccommodation">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={manage}></Card.Img>
                    <Card.Body>
                      <Card.Title>Gerir alojamentos!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col xs={6} sm={4}>
                <a href="/">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={home}></Card.Img>
                    <Card.Body>
                      <Card.Title>Página inicial</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            </Row>
          </Container>
          <Footer></Footer>
    </div>
    )
  }
}

export default Dashboard



/* <Container fluid>
                  <Row className="mb-5 mt-5" xs={6} sm={4}>
                    <Col xs={6} sm={4}>
                      <a href="/listChat">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={chatImg}></Card.Img>
                          <Card.Body>
                            <Card.Title>Veja as suas mensagens!</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                    
                    <Col xs={6} sm={4}>
                      <a href="/registerAccommodation">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={create}></Card.Img>
                          <Card.Body>
                            <Card.Title>Adicione um alojamento!</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                    
                    <Col xs={6} sm={4}>
                      <a href="/pending">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={pending}></Card.Img>
                          <Card.Body>
                            <Card.Title>Verifique os seus pedidos pendentes!</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>

                    <Col xs={6} sm={4}>
                      <a href="/profile">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={profile}></Card.Img>
                          <Card.Body>
                            <Card.Title>Aceda ao seu perfil!</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                    
                    <Col xs={6} sm={4}>
                      <a href="/registerAccommodation">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={edit}></Card.Img>
                          <Card.Body>
                            <Card.Title>Edite um alojamento!</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                    
                    <Col xs={6} sm={4}>
                      <a href="/">
                        <Card className="text-center">
                          <Card.Img className="imgDashboard" src={home}></Card.Img>
                          <Card.Body>
                            <Card.Title>Página inicial</Card.Title>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                  </Row>
                </Container>
                <Footer></Footer>
                */