import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import {connect} from 'react-redux';

import { toast } from 'react-toastify';

import { getAuthMode, setAuthMode, addWishlist, acceptLogin } from '../../actions/admin';

import './signinPage.css';

import beepSound from '../../assets/beep.wav';

class SigninPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300,
            selection: 'WHITELIST',
            authModeSelect: '',
            wlusername: '',
            pendingId: ''
        }
        this.handleScan = this.handleScan.bind(this);
        this.beep = new Audio(beepSound);
    }

    componentDidUpdate(prevProp, prevState){
        if(this.props.admin.authMode !== prevProp.admin.authMode){
            this.setState({authModeSelect: this.props.admin.authMode});
        }
    }

    componentDidMount(){
        this.props.getAuthMode();
    }

    handleScan(data) {
        if (data) {
            try{
                let d = JSON.parse(data);
                if(d.pendingId !== this.state.pendingId){
                    this.setState({pendingId: d.pendingId});
                    this.beep.play();
                    this.props.acceptLogin(d.pendingId);
                }
            }catch(e){
            }
        }
    }
    handleError(err) {
        console.error(err)
    }

    handleUsernameType(event){
        this.setState({wlusername: event.target.value});
    }

    handleWhitelistSubmit(event){
        event.preventDefault();
        this.props.addWishlist(this.state.wlusername);
        toast.success('Player successfully added into wishlist.');
        this.setState({wlusername: ''});
    }

    renderSigninComp(){
        if(this.props.admin.authMode && this.props.admin.authMode === 'off'){
            return ( <h2>Auth Mode is now off.</h2> );
        }
        else if(this.state.selection === 'WHITELIST'){
            return (
                <div className="whitelist-ctr">
                    <h1>Whitelist</h1>
                    <form className="inline-form" onSubmit={this.handleWhitelistSubmit.bind(this)}>
                        <div className="input-group">
                            <label htmlFor="whitelist">Player Id</label>
                            <input id="whitelist" type="text" value={this.state.wlusername} onChange={this.handleUsernameType.bind(this)} />
                        </div>
                        <input type="submit" value="Whitelist" />
                    </form>
                </div>
            );
        }else{
            return (
                <div className="qr-reader-container">
                    < QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className="qrcode-reader" / >
                    <div className="player-details" style={{backgroundColor: `${(this.props.admin.loginPlayer.username) ? '#2AD300' : '#DF453D'}`}}>
                        <div>Username: {this.props.admin.loginPlayer.username}</div>
                        <div>Role: {this.props.admin.loginPlayer.role}</div>
                        <div>Team: {this.props.admin.loginPlayer.team}</div>
                    </div>
                </div>
            );
        }
    }

    handleSelectChange(event){
        this.setState({selection: event.target.value});
    }

    handleModeSelectChange(event){
        this.setState({authModeSelect: event.target.value});
    }

    handleModeSelectSubmit(event){
        event.preventDefault();
        if(window.confirm('Do you want to change auth mode?')){
            this.props.setAuthMode(this.state.authModeSelect);
        }
    }

    render() {
        return (
            <div className="signinPage container">
                <h1>Signin</h1>
                <form className="inline-form" onSubmit={this.handleModeSelectSubmit.bind(this)}>
                    <div className="input-group">
                        <label htmlFor="auth-mode-selection">Authentication</label>
                        <select id="auth-mode-selection" value={this.state.authModeSelect} onChange={this.handleModeSelectChange.bind(this)}>
                            <option value="off">OFF</option>
                            <option value="on">ON</option>
                        </select>
                    </div>
                    <input type="submit" value="Set Mode" />
                </form>
                <div className="inline-form">
                    <div className="input-group">
                        <label>Authentication Type</label>
                        <select onChange={this.handleSelectChange.bind(this)}>
                            <option value="WHITELIST">Whitelist</option>
                            <option value="QR">QRcode</option>
                        </select>
                    </div>
                </div>
                {this.renderSigninComp()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    };
}

export default connect(mapStateToProps, { getAuthMode, setAuthMode, addWishlist, acceptLogin })(SigninPage);
