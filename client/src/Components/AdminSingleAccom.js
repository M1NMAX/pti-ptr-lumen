import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

 
function SingleAccommodation({accom, remove}) {
    const [id] = useState(accom.id);    

      async function handleRemove(event){
        event.preventDefault();
        await remove(id);
       
      }
    
   
    return (
        <Container fluid>
            <Card className="mb-2" style={{padding: '2%'}}>
                <Card.Header as="h5">{accom.id}- {accom.name}</Card.Header>
                <Row> 
                    <Col xm={12} sm={6}>
                    <AnimationWrapper>
                        <a href={"/profileAccommodation/"+id}>
                            <Card.Img   style={{ width: '65%'}} onclick={"/profileAccommodation/"+id} className="img" src={alojamento}></Card.Img>
                        </a>
                    </AnimationWrapper>
                    </Col>
                    <Col xm={12} sm={6}>
                   
                    <Card.Text className="mt-1">
                        <h5 style={{textAlign:"center"}}><b>Morada:</b> {accom.address} </h5>
                        <h5 style={{textAlign:"center"}}><b>Preco:</b> {accom.price}&euro;</h5>
                        <h5 style={{textAlign:"center"}}><b>Rating: </b>{accom.rating} <FontAwesomeIcon icon={faStar} style={{color:'rgb(243, 243, 78)'}}/></h5>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                        <Button style={{margin:"0 auto", display:"block", width:"300px"}} className="m-1" variant="info" href={ "/profileAccommodation/"+id}>Ver página do alojamento</Button><br/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button style={{margin:"0 auto", display:"block", width: "300px"}} className="m-1" variant="danger" onClick={handleRemove}><FontAwesomeIcon icon={faTrashAlt}/> Remover</Button>
                    </div>
                    </Col>
                </Row>
            </Card> 
        </Container>
    )
}

export default SingleAccommodation