import React, { useState, useEffect } from "react";
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button,Row,Col} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import Accommodations from '../../Components/Accommodation'


function Search() {
    let { location } = useParams();
    const [Accmmodations, setAcommodations] = useState([]);
    console.log(location)


    useEffect(() => {
        api.get('api/accommodations').then(response => {
            console.log(response.data)
            setAcommodations(response.data);
            console.log(response.data.length);
        }).catch(err => {
            alert(err)
        })
    }, []);


    return (
        <div>
            <NavBarHome></NavBarHome>
            <Container fluid>
                <Row>
                    <Col lg={2} sm={12} style={{wordWrap: "break-word"}}>
                        <h1 style={{textAlign:"center"}}>Filtros</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Local:</Form.Label>
                            <Form.Control type="text" value={location} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Wifi" />
                            <Form.Check type="checkbox" label="Animais de Estimação" />
                            <Form.Check type="checkbox" label="Fumadores" />
                            <Form.Check type="checkbox" label="Limpeza" />
                        </Form.Group>
                    </Col>
                    <Col lg={10} sm={12}>
                        <h1 style={{textAlign:"center"}}>Alojamentos</h1>
                        <Container fluid>
                            <Accommodations accom={Accmmodations} />   
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default Search
