import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import Spinner from './Spinner';



function DashboardAllLandlordAcco({accommodation, showWarning}) {
    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState('')


    useEffect(() => {
        setLoading(false);
        accommodation.available ? setAvailable('disponível') : setAvailable('ocupado');
    }, []);

    const handleShowWarning = async (event) =>{
        event.preventDefault();
        showWarning(accommodation.name, accommodation.id);
    };


    return (
        <Container>
            {loading === false ? (
        <Card className="mb-2 border" style={{padding: '2%'}}>
            <Card.Header><b>{accommodation.name}</b></Card.Header>

            <Row className="d-flex justify-content-center">
                <Col> <p>Nome: {accommodation.name} &euro;</p></Col>
                <Col> <p>Preço: {accommodation.price}</p></Col>
                <Col> <p>Estado: {available}</p></Col>
                
            </Row>
            <Row className="d-flex justify-content-center">
                <p>Morada: {accommodation.address} &euro;</p>
                
            </Row>
            <Row className="d-flex justify-content-center">
                <Button variant="primary" className="m-1 "  size="m" href={ "/profileAccommodation/"+accommodation.accommodation_id}>Ver alojamento</Button>
                <Button variant="success"  className="m-1 "  size="m" href={ "/profileAccommodationEditable/"+accommodation.accommodation_id}>Editar Alojamento</Button>
                <Button variant="danger" className="m-1 "   size="m" onClick={handleShowWarning} >Apagar Alojamento</Button>
            </Row>
            
        </Card> 
        ) : (
            <Spinner />
          )}
        </Container>
    )
}

export default DashboardAllLandlordAcco