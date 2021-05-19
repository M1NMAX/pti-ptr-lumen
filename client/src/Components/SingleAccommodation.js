import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';
import Spinner from './Spinner';

 
function SingleAccommodation({accom, removeFavourite}) {
    const [id] = useState(accom.accommodation_id);
    const [token] = useState(localStorage.getItem('token'));
    const [accommodation, setAccommodation] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
          api.get( 'api/accommodations/'+id,{
              headers:{
                  Authentication:`Bearer ${token}`,
              }
          }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
               
            }else{
               setAccommodation(response.data.aboutAccommodation);
               setLoading(false);
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      async function handleRemove(event){
        event.preventDefault();
        await removeFavourite(id);
       
      }
    
   
    return (
        <Container fluid>
            {loading === false ? (
            <Card className="mb-2" style={{padding: '2%'}}>
                <Card.Header as="h5">{accommodation.name}</Card.Header>
                <Row> 
                    <Col xm={12} sm={6}>
                    <AnimationWrapper>
                        <a href={"/profileAccommodation/"+id}>
                            <Card.Img  style={{ width: '65%'}} onclick={"/profileAccommodation/"+id} className="img mt-1" src={alojamento}></Card.Img>
                        </a>
                    </AnimationWrapper>
                    </Col>
                    <Col xm={12} sm={6} >
                    <Card.Text className="mt-1">
                        <h5 style={{textAlign:"center"}}><b>Morada:</b> {accommodation.address} </h5>
                        <h5 style={{textAlign:"center"}}><b>Preco:</b> {accommodation.price}&euro;</h5>
                        <h5 style={{textAlign:"center"}}><b>Rating: </b>{accommodation.rating} <FontAwesomeIcon icon={faStar} style={{color:'rgb(243, 243, 78)'}}/></h5>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                        <Button style={{margin:"0 auto", display:"block", width:"300px"}} className="m-1" variant="info" href={ "/profileAccommodation/"+id}>Ver página do alojamento</Button><br/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button style={{margin:"0 auto", display:"block", width: "300px"}} className="m-1" variant="danger" onClick={handleRemove}>Remover dos favoritos</Button>
                    </div>
                    </Col>
                </Row>
            </Card> ) : (
            <Spinner />
          )}
        </Container>
    )
}

export default SingleAccommodation