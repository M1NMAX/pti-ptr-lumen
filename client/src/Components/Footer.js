import React from 'react';
import {Card, ListGroup, Col, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faBootstrap, faLaravel } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <footer className="border-top">
            <Card  text="black">
                <Card.Header className="pl-5 mb-0 mt-0" style={{backgroundColor: "rgb(153, 150, 150)"}}><b>Ficha técnica</b>  </Card.Header>
                <Card.Body className="pb-0 mb-0 mt-0" style={{backgroundColor: "rgb(179, 174, 174)", textAlign:"center"}}>
                    <Row>
                        <Col>
                        <p> <b>Ferramentas utilizadas:</b> <div className="pl-5" style={{wordSpacing: '20px'}}><FontAwesomeIcon icon={faReact}/>React; <FontAwesomeIcon icon={faBootstrap}/>Bootstrap; <FontAwesomeIcon icon={faLaravel}/>Laravel/Lumen </div></p>
                    
                        </Col>
                    <Col>
                    <p> <b>Criadores:</b>  <div className="pl-5" >Carolina Sá; &nbsp;&nbsp;&nbsp; Gonçalo Costa; &nbsp;&nbsp;&nbsp;  João Mendes; &nbsp;&nbsp;&nbsp; José Ferreira; &nbsp;&nbsp;&nbsp; Maria Madalena Vieira; &nbsp;&nbsp;&nbsp; Pedro Ribeiro</div> </p>
                    
                    </Col>
                    
                    
                    </Row>
                    <div className="pl-5"style={{wordSpacing: '20px'}} >Grupo2; LTI-FCUL; 2021</div>
                    <p style={{fontSize: '12px'}} className="text-muted"> 2021 copyright &copy;</p>
                </Card.Body>
            </Card>
        </footer>
    )
}

export default Footer
