import React, {Component} from 'react';

import LoginController from '../../containers/login/loginController';

import './loginPage.css';
import logo from '../../assets/got_logo.svg';

class LoginPage extends Component{
    render(){
        return(
            <div className="loginPage">
                <div className="logo-container container">
                    <img src={logo} alt="Game of CS" />
                </div>
                <div className="container">
                    <h1>登入</h1>
                </div>
                <LoginController />
            </div>
        );
    }
}

export default LoginPage;
