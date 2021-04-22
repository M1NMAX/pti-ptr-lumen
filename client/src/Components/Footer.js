import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';


function Footer() {
    return (
        <footer className="text-center">
            <Card className="text-center" bg="white" text="black">
                <Card.Header>2021 copyright &copy;</Card.Header>
                <Card.Body>
                Ferramentas utilizadas
                    <ListGroup >
                        <ListGroup.Item variant="dark">React</ListGroup.Item>
                        <ListGroup.Item variant="dark">Bootstrap</ListGroup.Item>
                        <ListGroup.Item variant="dark">Laravel/Lumen</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </footer>
    )
}

export default Footer
