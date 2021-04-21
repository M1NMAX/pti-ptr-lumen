import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

function SingleAccommodation({accom}) {
    const [id] = useState(accom.accommodation_id);
    const [token] = useState(localStorage.getItem('token'));
    const [accommodation, setAccommodation] = useState([]);

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
               setAccommodation(response.data)

          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      async function handleRemove(){
        api.delete('/api/favourites/'+id, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
          if(response.data.status){
            window.location.reload();
          }else{
              alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
          }

        }).catch(err => {
          alert(err)
        })
      }
    
   
    return (
        <>
            <Card style={{ width: '80rem' }} className="mb-2">
                <Card.Header>{accommodation.name}</Card.Header>
                <Row> 
                    <Col>
                    <AnimationWrapper>
                        <a href="/profileAlojamento">
                            <Card.Img   style={{ width: '20rem', margin:'1rem' }} onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                        </a>
                    </AnimationWrapper>
                    </Col>
                    <Col>
                
                    <Card.Title className="center"></Card.Title>

                    <Card.Text>
                        <p>Morada: {accommodation.address} </p>
                        <p>Preco: {accommodation.price}&euro;</p>
                        <p>Rating: {accommodation.rating} &#42;</p>
                    </Card.Text>
                    <Button className="m-2" variant="primary"href={ "/profileAccommodation/"+id}>Ver página do alojamento</Button>
                    <Button className="m-2" variant="primary" onClick={handleRemove}>Remover dos favoritos</Button>

                    </Col>
                </Row>
            </Card> 
        </>
    )
}

export default SingleAccommodation