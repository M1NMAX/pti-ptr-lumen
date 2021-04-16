
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Button, Card,Row,Col} from 'react-bootstrap'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
// import './index.css'
import api from '../../services/api';

function Dashboard() {
    const [token] = useState(localStorage.getItem('token'));
    
    const [user, setUser] = useState('');
   

    const history = useHistory();

    useEffect(() => {
        
       
          api.get('api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
                history.push('/login');
            }else{
                setUser(response.data);
                
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);
   
    return (
        <div>
            <NavBarHome/>
            <Card className="text-center">
                <Card.Header>Dashboard</Card.Header>
                <Card.Body>
                    <Card.Title>Bem-vindo, {user.username}</Card.Title>
                    <Card.Text>
                    Tens 3 Notificacoes | messagens
                    </Card.Text>
                    <Search/>
                </Card.Body>
                
            </Card>
           
        </div>

    )
}

export default Dashboard
