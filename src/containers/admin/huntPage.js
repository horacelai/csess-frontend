import React, {Component} from 'react';
import {connect} from 'react-redux';

import { addQR, getQR } from '../../actions/admin';
import QRCode from '../../components/login/qr-code';

import './huntPage.css';

class HuntPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            score: ""
        };
    }

    componentDidMount(){
        this.props.getQR();
    }

    handleQRSubmit(event){
        event.preventDefault();
        if(this.state.score && this.state.score > 0){
            this.props.addQR(this.state.score);
        }
    }

    handleScoreType(event){
        this.setState({score: event.target.value});
    }

    renderQRList(){
        if(!this.props.admin.isLoading && this.props.admin.qr){
            const qr = this.props.admin.qr;
            return qr.map((q, key) => {
                return (
                    <div key={key} className="qr-list-item">
                        <div className='qr'>
                            <QRCode className="huntQr" data={q.code} />
                        </div>
                        <div className='score'>{q.score}</div>
                    </div>
                );
            })
        }else{
            return (<h3>載入中...</h3>)
        }
    }

    render(){
        return(
            <div className="signinPage container">
                <h1>QR Hunter</h1>
                <form className="inline-form" onSubmit={this.handleQRSubmit.bind(this)}>
                    <div className="input-group">
                        <label htmlFor="score-input">Score</label>
                        <input type="text" id="score-input" onChange={this.handleScoreType.bind(this)} value={this.state.score}/>
                    </div>
                    <input type="submit" value="Add QR" />
                </form>

                <div className="qr-list">
                    {this.renderQRList()}
                </div>
            </div>
        );

    }
}

function mapStateToProps(state){
    return { admin: state.admin };
}

export default connect(mapStateToProps, { addQR, getQR })(HuntPage);
