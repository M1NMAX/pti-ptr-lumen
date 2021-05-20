import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarHome from '../../Components/NavBarHome';
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import PendingAc from '../../Components/PendingAc';
import Footer from '../../Components/Footer';
import { Container,Row,Col, Button,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function Pending() {
    const[token] = useState(localStorage.getItem('token'));
    const[userId]= useState(localStorage.getItem('userID'));
    const[allPending, setAllPending] = useState([]);
    //feedback
    const [showWarning, setShowWarning] = useState(false);
    const [warningType, setWarningType] = useState();
    const [guestName, setGuestName] = useState();
    const [accommodationName, setAccommotionName] = useState();
    const [accommodationId, setAccommotionId] = useState();
    //after the decision
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');



    
    const history = useHistory();

    useEffect(() => {
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/accommodations/rentalpending/'+userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setAllPending(response.data.pending);
                    console.log(response.data);
                }else{
                    localStorage.clear();
                    history.push('/login')
                }
            }).catch(err => {
            alert(err)
            })
        }
    }, [token]);

    

    async function acceptPending(pendingId){
        await api.post('api/accommodations/rentalpending/acceptLandlord/'+pendingId,{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(response.data.status){
                setShowWarning(false);
                setShowResult(true);
                setResult(<Alert variant="success">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>{guestName} será informado da sua decisão</p>
                </Alert>);
            }else{
                // localStorage.clear();
                // history.push('/login');
                setShowResult(true);
                setResult(<Alert variant="danger">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>Ocorreu um erro durante o processo de aceitação, por favor tente mais tarde</p>
                </Alert>);
            }
        }).catch(err => {
            console.log(err);
            setShowWarning(false);
            setShowResult(true);
            setResult(<Alert variant="danger">
            <Alert.Heading>Messagem</Alert.Heading>
            <p>Ocorreu um erro durante o processo de aceitação, por favor tente mais tarde</p>
            </Alert>);
        });

        setAllPending(allPending.filter((pending)=> pending.id != pendingId))

    }

    async function rejectPending(pendingId){
        await api.delete('api/accommodations/rentalpending/'+pendingId,{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(response.data.status){
                setShowWarning(false);
                setShowResult(true);
                setResult(<Alert variant="success">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>{guestName} será informado da sua decisão</p>
                </Alert>);
            }else{
                // localStorage.clear();
                // history.push('/login');
                setShowResult(true);
                setResult(<Alert variant="danger">
                <Alert.Heading>Messagem</Alert.Heading>
                <p>Ocorreu um erro durante o processo de aceitação, por favor tente mais tarde</p>
                </Alert>);
            }
        }).catch(err => {
            console.log(err);
            setShowWarning(false);
            setShowResult(true);
            setResult(<Alert variant="danger">
            <Alert.Heading>Messagem</Alert.Heading>
            <p>Ocorreu um erro durante o processo de rejeição, por favor tente mais tarde</p>
            </Alert>);
        })

        setAllPending(allPending.filter((pending)=> pending.id != pendingId))

    } 
    async function show(type, nameOfGuest, nameOfAccommodation, id){ 
        console.log(id+'some');
        window.scrollTo(0,0);
        setShowWarning(true);
        setWarningType(type);
        setGuestName(nameOfGuest);
        setAccommotionName(nameOfAccommodation);
        setAccommotionId(id);
        console.log(id)
      } 

    async function handleRejectOrAcceptPeding(){
        console.log(warningType === 'accept');
        warningType === 'accept'? acceptPending(accommodationId): rejectPending(accommodationId); 
    }

    return(
        <div>
            <NavBarHome/>
            <Container>
            {showResult && result}
            <>
                        <Alert show={showWarning} variant="danger">
                          <Alert.Heading>Aviso</Alert.Heading>
                          <p>Tem a certeza que quer {warningType === 'accept'? <u>aceitar</u>: <u>rejeitar</u>} o interesse <u>{guestName}</u> em alugar o alojamento <u>{accommodationName}</u>?</p>
                          <hr />
                          <div className="d-flex justify-content-center">
                            <Button onClick={handleRejectOrAcceptPeding} variant="danger">Sim</Button>
                            <Button onClick={() =>{window.scrollTo(0,0); setShowWarning(false)}} className="ml-5" variant="success">Não</Button>
                          </div>
                        </Alert>
                      </>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Pedidos pendentes</h2> </Col>                 
                </Row> 
            
                {allPending.length>0? allPending.map((singlePending)=>(
                <PendingAc pending={singlePending} acceptPending={acceptPending} rejectPending={rejectPending} showWarning={show}/>)):
                 <Alert variant="info" className="text-center mt-4"> 
                    Não tens pedidos pendentes
                </Alert>}

            </Container>   
            <Footer/>
       </div>

    )
}
export default Pending
