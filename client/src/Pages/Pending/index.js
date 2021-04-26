import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarHome from '../../Components/NavBarHome';
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import PendingAc from '../../Components/PendingAc';
import Footer from '../../Components/Footer';


function Pending() {
    const[token] = useState(localStorage.getItem('token'));
    const[userId]= useState(localStorage.getItem('userID'));
    const[allPending, setAllPending] = useState([]);
    
    const history = useHistory();

    useEffect(() => {
        console.log(userId);
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/accommodations/rentalpending/'+userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setAllPending(response.data.pending);
                    console.log(response.data.pending);
                }else{
                    localStorage.clear();
                    history.push('/login')
                }
            }).catch(err => {
            alert(err)
            })
        }
    }, [token]);

    async function acceptPending(pendingId){
        await api.post('api/accommodations/rentalpending/accept/'+pendingId,{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(response.data.status){
                window.location.reload();
            }else{
                localStorage.clear();
                history.push('/login');
            }
        }).catch(err => {
            alert(err);
        });

    }

    async function rejectPending(pendingId){
        await api.delete('api/accommodations/rentalpending/'+pendingId,{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response);
            if(response.data.status){
                window.location.reload();
            }else{
                localStorage.clear();
                history.push('/login');
            }
        }).catch(err => {
            alert(err);
        })

    } 

    return(
        <div>
            <NavBarHome/>
            <div class="center"><h3>Pedidos pendentes</h3></div>
            
                {allPending.length>0?
                allPending.map((singlePending)=>(
                <PendingAc pending={singlePending} acceptPending={acceptPending} rejectPending={rejectPending}/>)):
                <p>Não tens assuntos pendentes</p>}
                
            <Footer/>
       </div>

    )
}
export default Pending
