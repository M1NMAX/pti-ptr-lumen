import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarHome from '../../Components/NavBarHome'
import { Container,Row,Col,Form,Button} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';

function RegisterAlojamento() {
    const [title, setTitle] = useState('');
    const [adress, setAdress] = useState('');
    const [price, setPrice] = useState('');
    const [occupationState, setOccupation] = useState('');
    const [nRooms, setNrooms] = useState('');
    const [nWC, setNWC] = useState('');
    const [area, setArea] = useState('');
    const [solar, setSolar] = useState('');
    const [wifi, setWifi] = useState('');
    const [cleaning, setClean] = useState('');
    //const [ageMin, setAgeMin] = useState('');
    //const [ageMax, setAgeMax] = useState('');
    const [gender, setGender] = useState('');
    const [smoker, setSmoker] = useState('');
    const [pet, setPet] = useState('');
    const history = useHistory();

    const [ ageMin, setAgeMin ] = useState(18);
    const [ ageMax, setAgeMax ] = useState(27);

    

    async function handleRegisterAlojamento(e) {
        e.preventDefault();

        try {
        const response = await api.post('api/registerAlojamento', {title, adress, price, occupationState, nRooms, nWC, area, solar, wifi, cleaning, ageMin, ageMax, gender, smoker, pet}).then(async (res) =>{
            if(res.data.status){
                const responseLogin = await api.post('api/registerAlojamento', {title, adress, price, occupationState, nRooms, nWC, area, solar, wifi, cleaning, ageMin, ageMax, gender, smoker, pet});
                localStorage.setItem('token', responseLogin.data.token);
                history.push('/lists');
            }
        });
        } catch (err) {
        alert('Falha no Registo, tente novamente.');
        }
        
    }
    return (
        <div>
            <NavBarHome/>
            <Form className="login page">
                <Form.Group controlId="formBasicTitle" onSubmit={handleRegisterAlojamento}>
                    <Form.Label>Título</Form.Label>
                    <Form.Control required width="sm" type="textarea" placeholder="Casa dos Mares " value={title} onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId="formBasicAdress" onSubmit={handleRegisterAlojamento}>
                    <Form.Label>Morada</Form.Label>
                    <Form.Control required width="sm" type="textarea" placeholder="Rua da Igreja nº33, Lisboa, Portugal" value={adress} onChange={e => setAdress(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPrice" onSubmit={handleRegisterAlojamento}>
                    <Form.Label>Preço P/Mês</Form.Label>
                    <Form.Control required width="sm" type="textarea" value={price} onChange={e => setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicOccupation">
                    <Form.Label>Estado de ocupação:</Form.Label>
                    <Form.Control required as="select" type="occupationState" value={occupationState} onChange={e => setOccupation(e.target.value)}>
                    <option>Ocupado</option>
                    <option>Desocupado</option>
                    <option>Reservado</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicRoom">
                    <Form.Label>Número de quartos:</Form.Label>
                    <Form.Control width="sm" type="number" value={nWC} onChange={e => setNWC(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicWC">
                    <Form.Label>Número de Casas de Banho:</Form.Label>
                    <Form.Control width="sm" type="number" value={nRooms} onChange={e => setNrooms(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicArea" onSubmit={handleRegisterAlojamento}>
                    <Form.Label>Área:</Form.Label>
                    <Form.Control width="sm" type="textarea" value={area} onChange={e => setArea(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicSolar" onSubmit={handleRegisterAlojamento}>
                    <Form.Label>Orientação Solar:</Form.Label>
                    <Form.Control as="select" type="solar" value={solar} onChange={e => setSolar(e.target.value)}>
                    <option>Norte (N)</option>
                    <option>Nordeste (NE)</option>
                    <option>Este (E)</option>
                    <option>Sudeste (SE)</option>
                    <option>Sul (S)</option>
                    <option>Sudoeste (SO)</option>
                    <option>Oeste (O)</option>
                    <option>Noroeste (NO)</option>
                    </Form.Control>
                </Form.Group>  

                <Form.Group controlId="formBasicWifi">
                    <Form.Label>Acesso à Internet:</Form.Label>
                    <Form.Control as="select" type="wifi" value={wifi} onChange={e => setWifi(e.target.value)}>
                    <option>Existe</option>
                    <option>Não existe</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicClean">
                    <Form.Label>Limpeza:</Form.Label>
                    <Form.Control as="select" type="cleaning" value={cleaning} onChange={e => setClean(e.target.value)}>
                    <option>Cada um faz a sua própria</option>
                    <option>É feita por profissionais</option>
                    </Form.Control>
                </Form.Group>

                <h3 class="w3-border-top">Requisitos dos inquilinos</h3>

                <Form.Group controlId="formBasicAge" >
                    <Form.Label>Faixa Etária:</Form.Label>
                        <Row> 
                        Dos
                        <Col>
                            
                            <RangeSlider
                                value={ageMin}
                                onChange={e => setAgeMin(e.target.value)}
                                min={17}
                                max={64}
                                variant='info'
                            />
                            </Col>
                            aos
                            <Col>
                            <RangeSlider
                                value={ageMax}
                                onChange={e => setAgeMax(e.target.value)}
                                min={18}
                                max={65}
                                variant='info'
                            />
                        </Col>
                        anos
                        </Row>
                    {/*<Form.Control width="sm" type="number" min="17" max="26" value={ageMin} onChange={e => setAgeMin(e.target.value)}/>
                    <Form.Text className="text-muted">
                    aos
                    </Form.Text>
    <Form.Control width="sm" type="number" min="18" max="27" value={ageMax} onChange={e => setAgeMax(e.target.value)}/> */}
                </Form.Group>
                
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Género:</Form.Label>
                    <Form.Control required as="select" type="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Misto</option>
                    <option>Indiferente</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicSmoker">
                    <Form.Label>Permite fumadores?</Form.Label>
                    <Form.Control as="select" type="type" value={smoker} onChange={e => setSmoker(e.target.value)}>
                    <option>Sim</option>
                    <option>Não</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPet">
                    <Form.Label>Permite animais de estimação?</Form.Label>
                    <Form.Control as="select" type="type" value={pet} onChange={e => setPet(e.target.value)}>
                    <option>Sim</option>
                    <option>Não</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submeter
                </Button>
            </Form>
        </div>
    )
}

export default RegisterAlojamento
