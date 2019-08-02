import React from 'react';
import { Switch, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../admin/navbar';
import CurrentEvent from '../admin/currentEvent';

import TeamPage from '../../containers/admin/teamsPage';
import PlayerPage from '../../containers/admin/playerPage';
import TaskPage from '../../containers/admin/taskPage';
import SigninPage from '../../containers/admin/signinPage';
import HuntPage from '../../containers/admin/huntPage';

import './adminPage.css';

const AdminPageOne = function(props){
    return (
        <div className="container">
            <h1>Ocamp Management System</h1>
        </div>
    );
}

const AdminPage = function(props){
    return (
        <div className='adminPage page'>
            <CurrentEvent />
            <NavBar />
            <Switch>
                <Route exact path="/admin/" component={AdminPageOne}/>
                <Route path="/admin/teams" component={TeamPage}/>
                <Route path="/admin/players" component={PlayerPage}/>
                <Route path="/admin/tasks" component={TaskPage}/>
                <Route path="/admin/signin" component={SigninPage}/>
                <Route path="/admin/hunt" component={HuntPage}/>
            </Switch>
            <ToastContainer position='bottom-right'/>
        </div>
    );
}

export default AdminPage;
