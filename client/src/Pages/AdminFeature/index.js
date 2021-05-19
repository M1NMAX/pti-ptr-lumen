import NavBarAdmin from '../../Components/NavBarAdmin'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AdminSingleFeature from '../../Components/AdminSingleFeature'
import {Container, Card,Row,Col, Form, Button, FormControl} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

function AdminPage() {
    const [feature, setFeature] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/accommodations/feature').then(response => {
            setFeature(response.data.data);  
            console.log(response.data.data);          
        }).catch(err => {
          alert(err)
        })
        }, []);
    
    return(
        <div>
            <NavBarAdmin/>
            <Container>
                <h3 className="center"></h3> 
                <div inline> 
                    <Form inline style={{float:'right', maxWidth:'100%'}}>
                        <Form.Control type="text"  placeholder="Pesquisar" className="mr-sm-2 "/>
                        <Button variant="info" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                </div>
                {/* {feature.map((feature)=>(<AdminSingleFeature accom={feature} /remove={remove}/ />)) */}
            </Container>
            <Footer/>
       </div>

    )
}
export default AdminPage
