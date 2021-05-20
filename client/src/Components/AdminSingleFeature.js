import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

 
function AdminSingleFeature({feat, remove}) {
    const [id] = useState(feat.id);
    const [token] = useState(localStorage.getItem('token'));
    const [feature, setFeature] = useState([]);

    useEffect(() => {
          api.get( 'api/accommodations/feature/',{
              headers:{
                  Authentication:`Bearer ${token}`,
              }
          }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
               
            }else{
               setFeature(response.data)

          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      async function handleRemove(event){
        event.preventDefault();
        await remove(id);
       
      }
    
   
    return (
        <Container fluid>
            <Card className="mb-2 border" style={{padding: '2%'}}>
                <Row> 
                    <Col xm={12} sm={6}>
                    <div className="d-flex justify-content-center">
                        {feat.name}
                    </div>
                    </Col>
                    <Col xm={12} sm={6}>
                    <div className="d-flex justify-content-center">
                        <Button size="sm" style={{margin:"0 auto", display:"block", width: "300px"}} className="m-1" variant="danger" onClick={handleRemove}><FontAwesomeIcon icon={faTrashAlt}/> Remover</Button>
                    </div>
                    </Col>
                </Row>
            </Card> 
        </Container>
    ) 
}

export default AdminSingleFeature