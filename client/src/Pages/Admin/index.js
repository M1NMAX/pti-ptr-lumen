import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AdminSingleAccommodation from '../../Components/AdminSingleAccom'
import {Container, Card,Row,Col, Form, Button, FormControl} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

function AdminPage() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/accommodations').then(response => {
                console.log(response.data)
                setAccommodations(response.data);
                console.log(response.data.length);
            }).catch(err => {
                alert(err)
            })
        }, []);


    async function remove(accommodationId){
       await api.delete('api/accommodations/'+accommodationId, {
            headers: {
                Authentication: `Bearer ${token}`,
            }
          }).then(response => {
          if(!response.data.status){
            console.log("erro")
            localStorage.clear();
          }

        }).catch(err => {
          alert(err)
        })

        setAccommodations(Accommodations);
    }
    
    return(
        <div>
            <NavBarHome/>
            <Container>
                <h3 className="center">Página do Admistrador</h3> 
                <div inline> 
                    <Button variant="info" className="button mr-sm-2">Filtrar</Button>
                    <Button variant="info" className="button">Imprimir resultados</Button>
                    <Form inline style={{float:'right', maxWidth:'100%'}}>
                        <Form.Control type="text"  placeholder="Pesquisar" className="mr-sm-2 "/>
                        <Button variant="info" className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                </div>
                {Accommodations.map((accommodation)=>(<AdminSingleAccommodation accom={accommodation} remove={remove} />)) }
            </Container>
            <Footer/>
       </div>

    )
}
export default AdminPage
