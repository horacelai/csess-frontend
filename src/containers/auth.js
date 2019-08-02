import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Redirect} from 'react-router';

const Auth = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends Component {
        render(){
            const role  = this.props.login.role;
            if (this.props.login.isLogined && allowedRoles.includes(role)) {
                return <WrappedComponent {...this.props} />
            }
            else{
                return <Redirect to="/login"/>;
            }
        }
    }

    function mapStateToProps(state) {
      return { login: state.login };
    }

    return connect(mapStateToProps)(WithAuthorization)
}

export default Auth;
