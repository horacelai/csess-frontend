import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Redirect} from 'react-router';
import {gameLogin, clearError, clearPending, updateSocket} from '../../actions/login';
import QRCode from '../../components/login/qr-code';

import './loginController.css';


class LoginController extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.login.isLogined && !prevProps.login.isLogined){
            window.location.reload(false);
        }
    }

    componentDidMount(){
        this.props.clearError();

        if(this.props.login.pendingDetails){
            let timestemp = new Date().getTime();

            if(this.props.login.pendingDetails.expireAt < timestemp){
                this.props.clearPending();
            }else{
                this.props.updateSocket(this.props.login.pendingDetails.pendingId);
            }
        }
    }


    handleUsernameSubmit(event){
        this.props.gameLogin(this.state.username);
        event.preventDefault();
    }

    handleUsernameType(event){
        this.setState({username: event.target.value.toLowerCase()});
    }

    render(){
        if(this.props.login.role === 'user' || this.props.login.role === 'leader'){
            return (<Redirect to="/" />)
        }else if(this.props.login.role === 'admin'){
            return (<Redirect to="/admin" />)
        }
        else if(!this.props.login.pending){
            return (
                <div className="loginController">
                    <div className="container">
                        <form onSubmit={this.handleUsernameSubmit.bind(this)}>
                            <h2>請輸入用戶代碼</h2>
                            <div className="error-msg">{this.props.login.error}</div>
                            <input type="text" onChange={this.handleUsernameType.bind(this)} value={this.state.username}/>
                            <input type="submit" value="提交" />
                        </form>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="loginController">
                    <div className="container">
                        <div className="qr-container">
                            <QRCode className="loginQr" data={JSON.stringify({'pendingId': this.props.login.pendingDetails.pendingId})} />
                        </div>
                        <div className="qr-instruction">請向管理員展示以下QR Code 以完成登入，QR Code 於五分鐘內有效</div>
                    </div>
                </div>
            );
        }


    }
}

function mapStateToProps(state){
    return { login: state.login };
}

export default connect(mapStateToProps, {gameLogin, clearError, clearPending, updateSocket})(LoginController);
