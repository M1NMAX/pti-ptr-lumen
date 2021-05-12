
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card,Row,Col,Container,Form} from 'react-bootstrap';
import { AnimationWrapper } from 'react-hover-animation'
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
import alojamento from '../../img/basicRoom.png'
import './index.css'
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendar, faCalendarMinus, faEdit, faHeart, faHome, faPlusCircle, faSearch, faSms, faTasks, faUser} from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [myAccommodations, setMyAccommodations] = useState([]);

    const history = useHistory();
    
    const [imgC, setImgC] = useState();

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
                console.log(response.data.userable_type)
                let ownOrNot = response.data.userable_type == "App\\Models\\Landlord"? 'rentedOwnAccommodation': 'rentedAccommodation';
                console.log(ownOrNot);
                api.get('api/accommodations/'+ownOrNot+'/'+response.data.id).then(
                  ownResponse => {
                    setMyAccommodations(ownResponse.data);
                    console.log(ownResponse.data);

                  })

                api.get('api/chat/chatNotifications/' + response.data.id).then(responseChatNotification => {
                  console.log(responseChatNotification.data);
                  if(responseChatNotification.data.length == 0){
                    setImgC(chatImg);
                  }else{
                    setImgC(chatImgNew);
                  }
                })

          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

    if (user.userable_type == "App\\Models\\Landlord") {
      
      return (
        <div className="App">
          <NavBarHome/>
          <Container fluid>
            <Row>
              <Col sm={12} lg={2} className="sidebar">
                <Row>
                  <a href="/listChat">
                    {/* <img className = "imgDashboard" src={imgC}></img> */}
                    <FontAwesomeIcon icon={faSms} size="2x"/> Mensagens
                  </a>
                </Row>
                <Row>
                  <a href="/registerAccommodation">
                    {/* <img className = "imgDashboard" src={create}></img> */}
                    <FontAwesomeIcon icon={faPlusCircle} size="2x"/> Adicionar Alojamento
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    {/* <img className = "imgDashboard" src={pending}></img> */}
                    <FontAwesomeIcon icon={faCalendarMinus} size="2x"/> Pendentes
                  </a>
                </Row>
                <Row>
                  <a href="/me">
                    {/* <img className = "imgDashboard" src={profile}></img>  */}
                    <FontAwesomeIcon icon={faUser} size="2x"/> Perfil
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    {/* <img className = "imgDashboard" src={edit}></img>  */}
                    <FontAwesomeIcon icon={faEdit} size="2x"/> Editar Alojamento
                  </a>
                </Row>
                
              </Col>
              <Col sm={10} lg={10}>
                <Card className="text-center content">
                    <Card.Body>
                        <Card.Title>Bem-vindo, {user.username}</Card.Title>

                        {myAccommodations.map((accommodation)=>(
                          <Container fluid>
                            <Card className="mb-2" style={{padding: '2%'}}>
                                <Card.Header>{accommodation.name}</Card.Header>
                                <Row> 
                                    <Col xm={12} sm={6}>
                                    <AnimationWrapper>
                                        <a href={"/profileAccommodation/"+accommodation.id}>
                                            <Card.Img   style={{ width: '50%'}} onclick={"/profileAccommodation/"+accommodation.id} className="img" src={alojamento}></Card.Img>
                                        </a>
                                    </AnimationWrapper>
                                    </Col>
                                    <Col xm={12} sm={6}>
                                    <Card.Text >
                                        <h5 style={{textAlign:"center"}}>Morada: {accommodation.address} </h5>
                                        <h5 style={{textAlign:"center"}}>Preco: {accommodation.price}&euro;</h5>
                                        <h5 style={{textAlign:"center"}}>Rating: {accommodation.rating} &#42;</h5>
                                    </Card.Text>
                                    <Button style={{margin:"0 auto", display:"block", width:"100%"}} className="m-2" variant="info" href={ "/profileAccommodation/"+accommodation.id}>Ver página do alojamento</Button>
                                    <Button style={{margin:"0 auto", display:"block", width: "100%"}} className="m-2" variant="info" >Remover dos favoritos</Button>

                                    </Col>
                                </Row>
                            </Card> 
                        </Container>))}
                        {/* <Form inline className="searchDashboard">
                          <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" />
                          <Button variant="primary" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                        </Form> */}
                    </Card.Body>
                </Card>   
              </Col>
            </Row>
          </Container>
          <Footer></Footer>
        </div>
            

      )
  } else {
    return (
    <div className="App">
      <NavBarHome/>
      <Container fluid>
        <Row>
          <Col sm={12} lg={2} className="sidebar">
            <Row>
              <a href="/listChat">
              <FontAwesomeIcon icon={faSms} size="2x"/> Mensagens
              </a>
            </Row>
            <Row>
              <a href="/registerAccommodation">
              <FontAwesomeIcon icon={faSearch} size="2x"/> Procurar Alojamento
              </a>
            </Row>
            <Row>
              <a href="/pending">
              <FontAwesomeIcon icon={faHeart} size="2x"/> Alojamentos Favoritos
              </a>
            </Row>
            <Row>
              <a href="/me">
              <FontAwesomeIcon icon={faUser} size="2x"/> Perfil
              </a>
            </Row>
            <Row>
              <a href="/pending">
              <FontAwesomeIcon icon={faTasks} size="2x"/> Gerir Alojamento/os
              </a>
            </Row>
            
          </Col>
          <Col sm={10} lg={10}>
            <Card className="text-center content">
                <Card.Body>
                    <Card.Title>Bem-vindo, {user.username}</Card.Title>
                    {/* <Form inline className="searchDashboard">
                      <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" />
                      <Button variant="primary" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form> */}
                </Card.Body>
            </Card>   
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
    )
  }
}

export default Dashboard


/*
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
                    <Card.Img className="imgDashboard" src={imgC}></Card.Img>
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
    </div> */