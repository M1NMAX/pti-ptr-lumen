import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';


function Footer() {
    return (
        <footer className="text-center">
            <Card className="text-center" bg="white" text="black">
                <Card.Header>2021 copyright &copy;</Card.Header>
                <Card.Body>
                    <p> Ferramentas utilizadas </p>
                    <p> Ficha técnica </p>
                    <p> Contactos </p>
                </Card.Body>
            </Card>
        </footer>
    )
}

export default Footer
