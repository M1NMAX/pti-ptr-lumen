import NavBarAdmin from '../../Components/NavBarAdmin'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AdminSingleAccommodation from '../../Components/AdminSingleAccom'
import {Container, Card,Row,Col, Form, Button, FormControl, Alert} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function AdminPage() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/accommodations').then(response => {
                console.log(response.data)
                setAccommodations(response.data);
                console.log(response.data.length);
            }).catch(err => {
                alert(err)
            })
        }, []);


    async function remove(accommodationId){
       await api.delete('api/accommodations/'+accommodationId, {
            headers: {
                Authentication: `Bearer ${token}`,
            }
          }).then(response => {
            setShowResult(true);
            setResult(<Alert  variant="danger">
                        <hr></hr>
                        <p>Alojamento removido com sucesso!</p>
                    </Alert>)
             window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }).catch(err => {
          alert(err)
        })
        setAccommodations(Accommodations.filter((accommodation) => accommodation.id != accommodationId ));
    }
    
    return(
        <div>
            <NavBarAdmin/>
            <Container>
                <Row  className= "mt-3 mb-3">
                    <Col  xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={7} md={4} className='text-center'><h3>Gerir Alojamentos</h3> </Col>                 
                </Row>
                {showResult && result}
                <div inline> 
                    <Button variant="info" className="button mr-sm-2">Filtrar</Button>
                    <Button variant="info" className="button">Imprimir resultados</Button>
                    
                </div>
                {Accommodations.map((accommodation)=>(<AdminSingleAccommodation accom={accommodation} remove={remove} />)) }
            </Container>
            <Footer/>
       </div>

    )
}
export default AdminPage
