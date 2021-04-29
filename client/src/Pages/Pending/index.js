import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarHome from '../../Components/NavBarHome';
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import PendingAc from '../../Components/PendingAc';
import Footer from '../../Components/Footer';
import { Container,Row,Col, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function Pending() {
    const[token] = useState(localStorage.getItem('token'));
    const[userId]= useState(localStorage.getItem('userID'));
    const[allPending, setAllPending] = useState([]);
    
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
        await api.post('api/accommodations/rentalpending/accept/'+pendingId,{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(!response.data.status){
                localStorage.clear();
                history.push('/login');
            }
        }).catch(err => {
            alert(err);
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
            if(!response.data.status){
                localStorage.clear();
                history.push('/login');
            }
        }).catch(err => {
            alert(err);
        })

        setAllPending(allPending.filter((pending)=> pending.id != pendingId))

    } 

    return(
        <div>
            <NavBarHome/>
            <Container>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Pedidos pendentes</h2> </Col>                 
                </Row> 
            
                {allPending.length>0?
                allPending.map((singlePending)=>(
                <PendingAc pending={singlePending} acceptPending={acceptPending} rejectPending={rejectPending}/>)):
                <p>Não tens assuntos pendentes</p>}
            </Container>   
            <Footer/>
       </div>

    )
}
export default Pending
