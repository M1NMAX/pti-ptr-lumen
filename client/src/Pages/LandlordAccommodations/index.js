import NavBarHome from '../../Components/NavBarHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import DashboardAllLandlordAcco from '../../Components/DashboardAllLandlordAcco';
import { Alert, Row, Col, Button} from 'react-bootstrap';
import Footer from '../../Components/Footer';


function Favourites() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [id] = useState(localStorage.getItem('userID'));
    const [showWarning, setShowWarning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');
    const [accommodationName, setAccommotionName] = useState();
    const [accommodationId, setAccommotionId] = useState();  
    

    const history = useHistory();

    
   
    useEffect(() => {
        api.get('api/accommodations/landlord/'+id,  {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
              if(response.data.status){
                setAccommodations(response.data.accommodations);
              }else{
                history.push("/login")
              }
        }).catch(err => {
            alert(err)
        })
    }, [token]);

    async function show(name, accoId){ 
        window.scrollTo(0,0);
        setAccommotionId(accoId);
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
              setAccommodations(Accommodations.filter((accomm)=>accomm.accommodation_id != accommodationId));
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
    
    return(
        <div>
        <NavBarHome/>
          <Row  className= "mt-3 mb-3">
              
            <Col  xs={{ span: 4, offset: 1 }} md={{ span: 3, offset: 1 }}>
              <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
            </Col>
            
            <Col xs={7} md={4} className='text-center'><h3> Meus alojamentos</h3> </Col>                 
          </Row>
          <Row className= "d-flex justify-content-center">
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
          </Row>
           <div class="center mb-1">
             <Button  href="/registerAccommodation" variant="info"><FontAwesomeIcon icon={faPlusCircle}/>Disponibilizar  alojamento</Button>
            </div>
          
          {Accommodations.length>0? Accommodations.map((anotherAccommodation)=>(
                            <DashboardAllLandlordAcco accommodation={anotherAccommodation} showWarning={show}/>
                          )):<Alert className="d-flex justify-content-center" variant="info">
                            Não tem disponíveis para alugar 
                          </Alert> }
                         
        <Footer/>
       </div>

    )
}
export default Favourites
