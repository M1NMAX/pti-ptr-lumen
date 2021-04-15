import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from './Components/Header'
import Chat from "./Pages/Chat";
import Homepage from './Pages/HomePage/'
import ProfileUser from './Pages/ProfileUser'
import ProfileAlojamento from './Pages/ProfileAlojamento'
import RegisterAlojamento from './Pages/RegisterAlojamento'

import capa from './img/capa.png'
import './App.css'
function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/profileUser/:id" exact component={ProfileUser} />
            <Route path="/profileAlojamento/:id" exact component={ProfileAlojamento} />
            <Route path="/registerAlojamento" exact component={RegisterAlojamento} />
          </Switch>
        </BrowserRouter>
      );
}
export default Routes


//<div className="App img" style={{
//    height:"100%"
//  }}>