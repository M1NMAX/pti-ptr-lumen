import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
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
        <Container fluid>
            <Card className="mb-2">
                <Card.Header>{accommodation.name}</Card.Header>
                <Row> 
                    <Col xm={12} sm={6}>
                    <AnimationWrapper>
                        <a href={"/profileAccommodation/"+id}>
                            <Card.Img   style={{ width: '50%'}} onclick={"/profileAccommodation/"+id} className="img" src={alojamento}></Card.Img>
                        </a>
                    </AnimationWrapper>
                    </Col>
                    <Col xm={12} sm={6}>
                    <Card.Text >
                        <h5 style={{textAlign:"center"}}>Morada: {accommodation.address} </h5>
                        <h5 style={{textAlign:"center"}}>Preco: {accommodation.price}&euro;</h5>
                        <h5 style={{textAlign:"center"}}>Rating: {accommodation.rating} &#42;</h5>
                    </Card.Text>
                    <Button style={{margin:"0 auto", display:"block", width:"100%"}} className="m-2" variant="primary" href={ "/profileAccommodation/"+id}>Ver página do alojamento</Button>
                    <Button style={{margin:"0 auto", display:"block", width: "100%"}} className="m-2" variant="primary" onClick={handleRemove}>Remover dos favoritos</Button>

                    </Col>
                </Row>
            </Card> 
        </Container>
    )
}

export default SingleAccommodation