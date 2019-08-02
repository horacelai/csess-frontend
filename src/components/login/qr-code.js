import React, { Component } from 'react';
import { toCanvas } from 'qrcode';

class QR extends Component{
    constructor(props){
        super(props);

        this.QRCanvas = React.createRef();
    }

    componentDidMount(){
        toCanvas(this.QRCanvas.current, this.props.data, {margin: 1, width: 400, color: { light: '#FFFFFFFF', dark: '#322B26FF'}}, function (error) {
            if (error) console.error(error);
        });
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        return (
            <canvas className={this.props.className} ref={this.QRCanvas} />
        );
    }
}

export default QR;
