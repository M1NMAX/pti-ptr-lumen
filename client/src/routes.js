import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Me from "./Pages/Me";
import Chat from "./Pages/Chat";
import Homepage from './Pages/HomePage/';
import ProfileUser from './Pages/ProfileUser';
import ProfileAccom from './Pages/ProfileAccommodation';
import ProfileAccomEdi from './Pages/ProfileAccommodationEditable';
import RegisterAccom from './Pages/RegisterAccommodation';
import Dashboard from './Pages/Dashboard'
import Favourites from './Pages/Favourites'
import Pending from './Pages/Pending'
import LandlordAccommodations from './Pages/LandlordAccommodations'
import PendingGuest from './Pages/PendingGuest'
import AdminPage from './Pages/Admin'
import AdminFeature from './Pages/AdminFeature'
import Search from './Pages/Search'
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
            <Route path="/me" exact component={Me} />
            <Route path="/listChat" exact component={ListUsersChat} />
            <Route path="/chat/:id" exact component={Chat} />
            <Route path="/profileUser/:id" exact component={ProfileUser} />
            <Route path="/profileAccommodation/:id" exact component={ProfileAccom} />
            <Route path="/profileAccommodationEditable/:id" exact component={ProfileAccomEdi} />
            <Route path="/search/:location" exact component={Search} />
            <Route path="/search" exact component={Search} />
            <Route path="/registerAccommodation" exact component={RegisterAccom} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/pending" exact component={Pending} />
            <Route path="/meusAlojamentos" exact component={LandlordAccommodations} />
            <Route path="/pendingG" exact component={PendingGuest} />
            <Route path="/admin" exact component={AdminPage} />
            <Route path="/adminFeature" exact component={AdminFeature} />
          </Switch>
        </BrowserRouter>
      );
}
export default Routes


//<div className="App img" style={{
//    height:"100%"
//  }}>