
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card,Row,Col,Container,Alert} from 'react-bootstrap';
import NavBarHome from '../../Components/NavBarHome';
import Search from '../../Components/Search'
import chatImg from '../../img/chatImg.png';
import chatImgNew from '../../img/chatImgNew.png';
import Footer from '../../Components/Footer';
import DashboardAccoLandlord from '../../Components/DashboardAccoLandlord';
import DashboardAccoGuest from '../../Components/DashboardAccoGuest';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarMinus, faEdit, faHeart, faPlusCircle, faSearch, faSms, faTasks, faUser} from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [myAccommodations, setMyAccommodations] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');
    const [accommodationName, setAccommotionName] = useState();
    const [accommodationId, setAccommotionId] = useState();


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


      async function show(name, id){ 
        window.scrollTo(0,0);
        setAccommotionId(id);
        setAccommotionName(name)
        setShowWarning(true)
      } 

      async function deleteAccommodation(){
        api.delete('api/accommodations/'+accommodationId).then(
          response => {
            if(response.data.status){
              setShowWarning(false);
              setShowResult(true);
              setResult(<Alert variant="success">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>Alojamento apagado com sucesso</p>
                </Alert>)
              setMyAccommodations(myAccommodations.filter((accomm)=>accomm.accommodation_id != accommodationId));
            }else{
              setShowWarning(false);
              setShowResult(true);
              setResult(<Alert variant="danger">
              <Alert.Heading>Messagem</Alert.Heading>
              <p>Ocorreu erro durante a eliminação do alojamento</p>
              </Alert>)
            }

          }).catch(err => {
              console.log(err);
              setShowWarning(false);
              setShowResult(true);
              setResult(<Alert variant="danger">
              <Alert.Heading>Messagem</Alert.Heading>
              <p>Ocorreu erro durante a eliminação do alojamento</p>
            </Alert>)

          })
      }

    if (user.userable_type == "App\\Models\\Landlord") {
      
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
                    <FontAwesomeIcon icon={faPlusCircle} size="2x"/> Adicionar Alojamento
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    <FontAwesomeIcon icon={faCalendarMinus} size="2x"/> Pendentes
                  </a>
                </Row>
                <Row>
                  <a href="/me">
                    <FontAwesomeIcon icon={faUser} size="2x"/> Perfil
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    <FontAwesomeIcon icon={faEdit} size="2x"/> Editar Alojamento
                  </a>
                </Row>
                
              </Col>
              <Col sm={10} lg={10}>
                <Card className="text-center content">
                    <Card.Body>
                        <Card.Title>Bem-vindo, {user.username}</Card.Title>
                        {showResult && result}
                        <>
                        <Alert show={showWarning} variant="danger">
                          <Alert.Heading>Aviso</Alert.Heading>
                          <p>Tem certeza que quer apagar o alojamento {accommodationName}</p>
                          <hr />
                          <div className="d-flex justify-content-center">
                            <Button onClick={deleteAccommodation}  variant="danger">Sim</Button>
                            <Button onClick={() =>{window.scrollTo(0,0); setShowWarning(false)}} className="ml-5" variant="success">Não</Button>
                          </div>
                        </Alert>
                      </>

                        {myAccommodations.length>0? myAccommodations.map((accommodation)=>(
                          <DashboardAccoLandlord accommodation={accommodation} showWarning={show}/>
                          )):
                           //MAIS BONITO
                           <Alert variant="info">
                            Não tem alojamentos alugados
                          </Alert>
                           }
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
                    {myAccommodations.length>0? myAccommodations.map((accommodation)=>(
                          <DashboardAccoGuest accommodation={accommodation}/>
                          )):<Alert variant="info">
                          Não esta a alugar alojamento
                        </Alert> }
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