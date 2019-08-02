import React, {Component} from 'react';

import NavBar from '../../containers/game/navBar';
import TaskPage from '../../containers/game/taskPage';
import ScoresPage from '../../containers/game/scoresPage';

import { Switch, Route } from 'react-router';
import logo from '../../assets/got_logo.svg';

import './gamePage.css';

class GamePage extends Component{
    render(){
        return(
            <div className="gamePage page">
                <NavBar />
                <div className="logo-container">
                    <div className="container">
                    <img src={logo} alt="Game Of CS" />
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={TaskPage}/>
                    <Route path="/scores" component={ScoresPage}/>
                </Switch>
            </div>
        );
    }
}

export default GamePage;
