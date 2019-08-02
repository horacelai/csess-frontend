import React from 'react';
import { Switch, Route } from 'react-router';

import Auth from '../containers/auth';

import LoginPage from './pages/loginPage';
import AdminPage from './pages/adminPage';
import GamePage from './pages/gamePage';
import LogoutPage from '../containers/login/logoutPage';

const Routes = function(props){
    return (
        <Switch>
            <Route path="/admin/" component={Auth(['admin'])(AdminPage)}/>
            <Route path="/login/" component={LoginPage}/>
            <Route path="/logout/" component={LogoutPage}/>
            <Route path="/" component={Auth(['user', 'leader'])(GamePage)}/>
        </Switch>
    );
}

export default Routes;
