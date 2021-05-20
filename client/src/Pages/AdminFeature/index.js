import NavBarAdmin from '../../Components/NavBarAdmin'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AdminSingleFeature from '../../Components/AdminSingleFeature'
import {Container, Card,Row,Col, Form, Button, FormControl, Alert} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faFileDownload} from '@fortawesome/free-solid-svg-icons'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

function AdminFeature() {
    const [feature, setFeature] = useState([]);
    const [featureName, setFeatureName] = useState();
    const [token] = useState(localStorage.getItem('token'));
    
    const [newF, setNew] = useState(false);
    const [newFeature, setNewFeature] = useState('');

    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');

    const history = useHistory();

    const { ExportCSVButton } = CSVExport;
    const columns = [{
        dataField: 'id',
        text: 'ID'
        }, {
        dataField: 'name',
        text: 'Característica'
        }];

   
    useEffect(() => {
        api.get('api/accommodations/feature').then(response => {
            setFeature(response.data.data);  
            setFeatureName(response.data.data.name);
        }).catch(err => {
          alert(err)
        })
        }, []);

        async function handleNewCarac(e) {
            setNew(false);
            e.preventDefault();
            let data = {
                'name': newFeature,     
            };
            await api.post('api/accommodations/feature', data
            ).then(async (response) =>{
                setShowResult(true);
                setResult(<Alert  variant="success">
                        <Alert.Heading>Sucesso</Alert.Heading>
                        <hr></hr>
                        <p>Característica adicionada com sucesso!</p>
                    </Alert>)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }).catch (err => {
                console.log(err);
            })
            setFeature([...feature, data]);
        }

        async function remove(featureId){
            await api.delete('api/accommodations/feature/'+featureId, {
                 headers: {
                     Authentication: `Bearer ${token}`,
                 }
               }).then(response => {
                setShowResult(true);
                setResult(<Alert  variant="danger">
                        <Alert.Heading>Sucesso</Alert.Heading>
                        <hr></hr>
                        <p>Característica removida com sucesso!</p>
                    </Alert>)
                 window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
             }).catch(err => {
               alert(err)
             })
             setFeature(feature.filter((f) => f.id != featureId ));
         }
    
    return(
        <div>
            <NavBarAdmin/>
            
            <Container>
                <Row  className= "mt-3 mb-3">
                    <Col  xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={7} md={4} className='text-center'><h3>Gerir Características</h3> </Col>                 
                </Row>
                {showResult && result}
                <div > 
                    {!newF &&
                    <> 
                        <Button variant="info" className="m-3" onClick={() => setNew(true)}>Adicionar Nova Característica</Button>
                           
                        <ToolkitProvider
                            keyField="id"
                            data={ feature }
                            columns={ columns }
                            exportCSV
                            >
                            {
                                props => (
                                <div>
                                    <ExportCSVButton className="border m-3" style={{backgroundColor:"grey", color:"white"}} { ...props.csvProps }> <FontAwesomeIcon icon={faFileDownload}/> Exportar Características</ExportCSVButton>
                                </div>
                                )
                            }
                        </ToolkitProvider>
    </>
                    }
                    {newF &&
                    <Form inline onSubmit={handleNewCarac}>
                        <Form.Control type="text"  placeholder="Nova Característica" className="mr-sm-2 " onChange={e => setNewFeature(e.target.value)}/>
                        <Button variant="info" className="m-3" type="submit">Adicionar</Button>
                    </Form>
                    }
                    
                </div>
                {feature.map((singleFeat)=>(<AdminSingleFeature feat={singleFeat} remove={remove} />)) }
            </Container>
            <Footer/>
       </div>

    )
}
export default AdminFeature;
