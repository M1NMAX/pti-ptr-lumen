import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import Homepage from './Pages/HomePage/';
import ProfileUser from './Pages/ProfileUser';
import ProfileAccom from './Pages/ProfileAccommodation';
import ProfileAccomEdi from './Pages/ProfileAccommodationEditable';
import RegisterAccom from './Pages/RegisterAccommodation';
import Dashboard from './Pages/Dashboard'
import Favourites from './Pages/Favourites'
import Pending from './Pages/Pending'

import capa from './img/capa.png'
import './App.css'
import ListUsersChat from './Pages/ListUsersChat';
function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/listChat" exact component={ListUsersChat} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/profileUser/:id" exact component={ProfileUser} />
            <Route path="/profileAccommodation/:id" exact component={ProfileAccom} />
            <Route path="/profileAccommodationEditable/:id" exact component={ProfileAccomEdi} />
            <Route path="/registerAccommodation" exact component={RegisterAccom} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/pending" exact component={Pending} />
          </Switch>
        </BrowserRouter>
      );
}
export default Routes


//<div className="App img" style={{
//    height:"100%"
//  }}>