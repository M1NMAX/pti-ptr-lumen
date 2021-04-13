import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Pages/Login";
import Header from './Components/Header'

import Homepage from './Pages/HomePage/'
import ProfileUser from './Components/ProfileUser'
import ProfileAlojamento from './Components/ProfileAlojamento'
import capa from './img/capa.png'
import './App.css'
function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </BrowserRouter>
      );
}
export default Routes


//<div className="App img" style={{
//    height:"100%"
//  }}>