import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import SingleAccommodation from '../../Components/SingleAccommodation'
import { Container,Row,Col, Button, Alert} from 'react-bootstrap'
import Footer from '../../Components/Footer'


function Favourites() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/favourites',  {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            if(response.data.status){
              console.log(response.data.favourites);
                setAccommodations(response.data.favourites);
            }else{
                history.push("/login")
            }
            
        }).catch(err => {
            alert(err)
        })
    }, [token]);


    async function removeFavourite(accommodationId){
       await api.delete('/api/favourites/'+accommodationId, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
          if(!response.data.status){
              alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
          }

        }).catch(err => {
          alert(err)
        })

        setAccommodations(Accommodations.filter((accommodation) => accommodation.accommodation_id != accommodationId ));
        
    }
    
    return(
        <div>
        <NavBarHome/>
        <Container>
          <Row  className= "mt-3 mb-3">
            <Col  xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }}>
              <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
            </Col>
            <Col xs={7} md={4} className='text-center'><h3><FontAwesomeIcon icon={faHeart}/> Os meus favoritos</h3> </Col>                 
          </Row>

          { Accommodations.length>0 ? 
                  Accommodations.map((accommodation)=>(<SingleAccommodation accom={accommodation} removeFavourite={removeFavourite} />)): 
                  <div className="center">
                    <Alert variant="info" className="mt-4">
                      <h6><FontAwesomeIcon icon={faHeartBroken}/> Ainda não tem favoritos</h6>
                    </Alert> 
                  <a className="center" href="/">Procurar Alojamentos</a>
              </div>
          }
          </Container>
        <Footer/>
       </div>

    )
}
export default Favourites
