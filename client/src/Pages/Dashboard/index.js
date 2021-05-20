
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button,Row,Col,Container,Alert} from 'react-bootstrap';
import NavBarHome from '../../Components/NavBarHome';
import Search from '../../Components/Search'
import chatImg from '../../img/chatImg.png';
import chatImgNew from '../../img/chatImgNew.png';
import Footer from '../../Components/Footer';
import DashboardAccoLandlord from '../../Components/DashboardAccoLandlord';
import DashboardAccoGuest from '../../Components/DashboardAccoGuest';
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faCalendarMinus, faCircle, faEdit, faHeart, faPlusCircle, faSearch, faSms, faTasks, faUser} from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [rentalAccommodations, setrentalAccommodations] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');
    const [accommodationName, setAccommotionName] = useState();
    const [accommodationId, setAccommotionId] = useState();  

    const [showAttempt, setAttempt] = useState(false);
    const [OtherAccommodationName, setOtherAccommotionName] = useState();
    const [OtherAccommodationId, setOtherAccommotionId] = useState();


   

    const history = useHistory();
    
    const [imgC, setImgC] = useState();
    const [imgP, setImgP] = useState();

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
                    setrentalAccommodations(ownResponse.data);
                    console.log(ownResponse.data);

                  })

                api.get('api/chat/chatNotifications/' + response.data.id).then(responseChatNotification => {
                  console.log(responseChatNotification.data);
                  if(responseChatNotification.data.length == 0){
                    setImgC();
                  }else{
                    setImgC(faBell);
                  }
                })

                api.get('api/accommodations/rentalNotification/' + response.data.id).then(responsePendGNotification => {
                  console.log(responsePendGNotification.data.data.notification);
                  if(responsePendGNotification.data.data.notification == false){
                    setImgP();
                  }else{
                    setImgP(faBell);
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
              setrentalAccommodations(rentalAccommodations.filter((accomm)=>accomm.accommodation_id != accommodationId));
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

      async function attemptToPay(name, id){
        setAttempt(true);
        setOtherAccommotionName(name)
        setOtherAccommotionId(id)
      }


      async function makePayment(){
        api.put('api/accommodations/payment/'+OtherAccommodationId).then(
          response => {
            if(response.data.status){
              setAttempt(false);
              setShowResult(true);
              setResult(<Alert variant="success">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>A renda foi paga com sucesso</p>
                </Alert>)
              setrentalAccommodations(rentalAccommodations.map((accomm)=>accomm.id === OtherAccommodationId? 
              {...accomm, paymentState: !accomm.paymentState}: accomm));
            }else{
              setAttempt(false);
              setShowResult(true);
              setResult(<Alert variant="danger">
              <Alert.Heading>Messagem</Alert.Heading>
              <p>Ocorreu erro durante o pagamento do alojamento, por favor tente mais tarde</p>
              </Alert>)
            }

          }).catch(err => {
              console.log(err);
              setAttempt(false);
              setShowResult(true);
              setResult(<Alert variant="danger">
              <Alert.Heading>Messagem</Alert.Heading>
              <p>Ocorreu erro durante o pagamento do alojamento, por favor tente mais tarde</p>
            </Alert>)
          })

      }

    if (user.userable_type == "App\\Models\\Landlord") {
      
      return (
        <div className="App">
          <NavBarHome/>
          
          <Container fluid>
          <h3 className="center">Bem-vindo, {user.username}</h3>
          <p className="center"> {rentalAccommodations.length>0 && 'Os seus alojamentos arrendados'} </p>

            
            <Row >
              <Col md={12} lg={2} className="sidebar ml-2 pl-2">
                <Row>
                  <a href="/listChat">
                    <FontAwesomeIcon icon={faSms} size="2x"/> Mensagens   <FontAwesomeIcon icon={imgC} color="red" />
                  </a>
                </Row>
                <Row>
                  <a href="/registerAccommodation">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x"/> Adicionar Alojamento
                  </a>
                </Row>
                <Row>
                  <a href="/pending">
                    <FontAwesomeIcon icon={faCalendarMinus} size="2x"/> Pendentes   <FontAwesomeIcon icon={imgP} color="red" />
                  </a>
                </Row>
                <Row>
                  <a href="/me">
                    <FontAwesomeIcon icon={faUser} size="2x"/> Perfil
                  </a>
                </Row>
                <Row>
                  <a href="/meusAlojamentos">
                    <FontAwesomeIcon icon={faEdit} size="2x"/> Os meus alojamentos
                  </a>
                </Row>
                
              </Col>
              <Col md={10} lg={10} style={{ width: '100%' }} className="text-center content" >
                        {showResult && result}
                        <>
                        <Alert show={showWarning} variant="danger">
                          <Alert.Heading>Aviso</Alert.Heading>
                          <p>Tem a certeza que quer apagar o alojamento {accommodationName}?</p>
                          <hr />
                          <div className="d-flex justify-content-center">
                            <Button onClick={deleteAccommodation}  variant="danger">Sim</Button>
                            <Button onClick={() =>{window.scrollTo(0,0); setShowWarning(false)}} className="ml-5" variant="success">Não</Button>
                          </div>
                        </Alert>
                      </>
                        
                        {rentalAccommodations.length>0? rentalAccommodations.map((accommodation)=>(
                          <DashboardAccoLandlord accommodation={accommodation} showWarning={show}/>
                          )):

                           <Alert variant="info" className="mt-4">
                            Não tem alojamentos alugados
                          </Alert>
                           }
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
      <h3 className="center mt-4">Bem-vindo, {user.username}</h3>
        <Row>
          <Col sm={12} lg={2} className="sidebar ml-2  pl-2">
            <Row>
              <a href="/listChat">
              <FontAwesomeIcon icon={faSms} size="2x"/> Mensagens   <FontAwesomeIcon icon={imgC} color="red"/>
              </a>
            </Row>
            <Row>
              <a href="/search">
              <FontAwesomeIcon icon={faSearch} size="2x"/> Procurar Alojamento
              </a>
            </Row>
            <Row>
              <a href="/favourites">
              <FontAwesomeIcon icon={faHeart} size="2x"/> Alojamentos Favoritos
              </a>
            </Row>
            <Row>
              <a href="/me">
              <FontAwesomeIcon icon={faUser} size="2x"/> Perfil
              </a>
            </Row>
            <Row>
              <a href="/pendingG">
              <FontAwesomeIcon icon={faCalendarMinus} size="2x"/> Pedidos Pendentes   <FontAwesomeIcon icon={imgP} color="red"/>
              </a>
            </Row>
            
          </Col>
          <Col sm={10} lg={10} className="text-center content" >
          {showResult && result}
                        <>
                        <Alert show={showAttempt} variant="danger">
                          <Alert.Heading>Aviso</Alert.Heading>
                          <p>Tem a certeza que quer pretende efetuar o pagamento do {OtherAccommodationName}?</p>
                          <p>Nota: Não há faturas disponíveis</p>
                          <hr />
                          <div className="d-flex justify-content-center">
                            <Button onClick={makePayment} variant="danger">Sim</Button>
                            <Button onClick={() =>{window.scrollTo(0,0); setAttempt(false)}} className="ml-5" variant="success">Não</Button>
                          </div>
                        </Alert>
                      </>
          <p className="center"> {rentalAccommodations.length>0 && 'O(s) alojamento(s) que estás a alugar'} </p>

                    {rentalAccommodations.length>0?  rentalAccommodations.map((accommodation)=>(
                          <DashboardAccoGuest accommodation={accommodation} attempt={attemptToPay}/>
                          )):<Alert variant="info" className="mt-4">
                          Não esta a alugar nenhum alojamento
                        </Alert> }
                    {/* <Form inline className="searchDashboard">
                      <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" />
                      <Button variant="primary" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form> */}
                    
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
    )
  }
}

export default Dashboard
