
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card,Row,Col,Container} from 'react-bootstrap'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import chatImg from '../../img/chatImg.png'
import profile from '../../img/profile.png'
import favourite from '../../img/favourite.png'
import pending from '../../img/pending.png'
import search from '../../img/search.png'
import manage from '../../img/manage.png'
import create from '../../img/add.png'
import edit from '../../img/create.png'
import home from '../../img/home.png'
import './index.css'
import api from '../../services/api';

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
          <Card className="text-center">
              <Card.Header>Dashboard</Card.Header>
              <Card.Body>
                  <Card.Title>Bem-vindo, {user.username}</Card.Title>
                  <Card.Text>
                  Tens 3 Notificacoes | messagens
                  landlord - criar, editar Alojamento, aceitar renda 
                  guest -  pagar a renda, pesquisar 
                  </Card.Text>
                  <Search/>
              </Card.Body>
          </Card>
              <Container fluid>
                <Row className="mb-5 mt-5">
                  <Col>
                    <a href="/listChat">
                      <Card className="text-center">
                        <Card.Img className="imgDashboard" src={chatImg}></Card.Img>
                        <Card.Body>
                          <Card.Title>Veja as suas mensagens!</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                  
                  <Col>
                    <a href="/registerAccommodation">
                      <Card className="text-center">
                        <Card.Img className="imgDashboard" src={create}></Card.Img>
                        <Card.Body>
                          <Card.Title>Adicione um alojamento!</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                  
                  <Col>
                    <a href="/pending">
                      <Card className="text-center">
                        <Card.Img className="imgDashboard" src={pending}></Card.Img>
                        <Card.Body>
                          <Card.Title>Verifique os seus pedidos pendentes!</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                </Row>

                <Row className="mb-5 mt-5">
                  <Col>
                    <a href="/profile">
                      <Card className="text-center">
                        <Card.Img className="imgDashboard" src={profile}></Card.Img>
                        <Card.Body>
                          <Card.Title>Aceda ao seu perfil!</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                  
                  <Col>
                    <a href="/registerAccommodation">
                      <Card className="text-center">
                        <Card.Img className="imgDashboard" src={edit}></Card.Img>
                        <Card.Body>
                          <Card.Title>Edite um alojamento!</Card.Title>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                  
                  <Col>
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
        </div>
      )
  }
  else {
    return (
      <div>
      <NavBarHome/>
      <Card className="text-center">
          <Card.Header>Dashboard</Card.Header>
          <Card.Body>
              <Card.Title>Bem-vindo, {user.username}</Card.Title>
              <Card.Text>
              Tens 3 Notificacoes | messagens
              landlord - criar, editar Alojamento, aceitar renda 
              guest -  pagar a renda, pesquisar 
              </Card.Text>
              <Search/>
          </Card.Body>
      </Card>
          <Container fluid>
            <Row className="mb-5 mt-5">
              <Col>
                <a href="/listChat">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={chatImg}></Card.Img>
                    <Card.Body>
                      <Card.Title>Veja as suas mensagens!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col>
                <a href="/registerAccommodation">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={search}></Card.Img>
                    <Card.Body>
                      <Card.Title>Procure um alojamento!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col>
                <a href="/favourites">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={favourite}></Card.Img>
                    <Card.Body>
                      <Card.Title>Verifique os seus alojamentos favoritos!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            </Row>

            <Row className="mb-5 mt-5">
              <Col>
                <a href="/profile">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={profile}></Card.Img>
                    <Card.Body>
                      <Card.Title>Aceda ao seu perfil!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col>
                <a href="/registerAccommodation">
                  <Card className="text-center">
                    <Card.Img className="imgDashboard" src={manage}></Card.Img>
                    <Card.Body>
                      <Card.Title>Gerir alojamentos!</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
              
              <Col>
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
    </div>
    )
  }
}

export default Dashboard
