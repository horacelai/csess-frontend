import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {gameLogout} from '../../actions/login';

class LogoutPage extends Component{
    componentDidMount(){
        this.props.gameLogout(this.props.sessionId);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.login.sessionId.length > 0 && this.props.login.sessionId.length === 0){
            window.location.reload(false);
        }
    }

    render(){
        if(!this.props.login.isLogined){
            return (<Redirect to='/login' />);
        }
        return (<h1>Logout</h1>);
    }
}

function mapStateToProps(state){
    return { login: state.login };
}

export default connect(mapStateToProps, {gameLogout})(LogoutPage);
