import React, { Component } from 'react';
import {connect} from 'react-redux';
import QrReader from 'react-qr-reader';

import { getTask, resetError, setError, finishTask, finishGeoTask, leaderFinishTask } from '../../actions/game';

import './taskPage.css';

import refreshImage from '../../assets/refresh.svg';
import beepSound from '../../assets/beep.wav';

class TaskPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            answer: "",
            findingLocation: false,
            cameraOn: false
        }

        this.beep = new Audio(beepSound);
    }
    componentDidMount(){
        this.props.getTask();
        this.props.resetError();
    }

    handleAnswerType(event){
        this.setState({answer: event.target.value});
    }

    handleAnswerSubmit(event){
        event.preventDefault();
        this.props.finishTask(this.state.answer);
        this.setState({answer: ""});
    }

    handleLeaderFinishTask(event){
        event.preventDefault();
        if(window.confirm('確定已完成任務？')){
            this.props.leaderFinishTask();
        }
    }

    handleLocationSubmit(event){
        this.setState({findingLocation: true});
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>{
                this.setState({findingLocation: false});
                this.props.finishGeoTask(position.coords.longitude , position.coords.latitude);
            }, (err)=>{
                this.props.setError("無法取得你的位置");
            });
        }else{
            this.props.setError("無法取得你的位置");
        }
    }

    handleQRScan(data){
        try{
            if(data.startsWith('qr:')){
                if(this.state.answer !== data){
                    this.props.finishTask(data);
                    this.setState({answer: data, cameraOn: false});
                    this.beep.play();
                }
            }
        }catch(e){
        }
    }

    renderController(){
        const task = this.props.game.task;
        const role = this.props.role;
        if(role === 'leader'){
            if(task.type === 'LEADER'){
                return (<button onClick={this.handleLeaderFinishTask.bind(this)}>完成任務</button>);
            }
        }else{
            if(task.type === 'ANSWER'){
                return (
                    <form onSubmit={this.handleAnswerSubmit.bind(this)}>
                        <h2>輸入答案</h2>
                        <div className="error">{this.props.game.message ? this.props.game.message : ""}</div>
                        <input type="text" value={this.state.answer} onChange={this.handleAnswerType.bind(this)} />
                        <input type="submit" value="提交" />
                    </form>
                );
            }else if(task.type === 'LOCATION'){
                return (
                    <div>
                        <div className="error">{this.props.game.message ? this.props.game.message : ""}</div>
                        <button onClick={this.handleLocationSubmit.bind(this)} disabled={this.state.findingLocation}>{(this.state.findingLocation)?"取得位置中...":"完成任務"}</button>
                    </div>
                );
            }else if(task.type === 'QRHUNT'){
                if(this.state.cameraOn){
                    return (
                        <div>
                            <button onClick={()=> this.setState({cameraOn: false})}>關閉相機</button>
                            <QrReader
                                delay={300}
                                onScan={this.handleQRScan.bind(this)}
                                className="qrcode-reader" / >
                        </div>
                    );
                }else{
                    return(
                        <div>
                            <button onClick={()=> {this.setState({cameraOn: true}); this.props.resetError()}}>開啟相機</button>
                            <div className="qr-msg">{this.props.game.message ? this.props.game.message : ""}</div>
                        </div>
                    );
                }
            }

        }

    }

    renderDescription(){
        let desc = this.props.game.task.display.description;

        if(Array.isArray(desc)){
            return desc.map((line, index)=>{
                if(/^img\(.+\)/.test(line)){
                    return <img src={line.slice(4, -1)} alt="hint_image"/>;
                }else{
                    return <p key={index}>{line}</p>;
                }
            });
        }else{
            return desc;
        }
    }

    render(){
        const task = this.props.game.task;
        if(this.props.game.loading && !task.display){
            return (
                <div className="game-taskPage">
                    <div className="container">
                        <h1>Loading</h1>
                    </div>
                </div>
            );
        }
        return(
            <div className="game-taskPage">
                <div className="task-container container">
                    <div className="btn-container">
                        <h1>當前任務</h1>
                        <button className="refresh-button" onClick={()=>{this.props.getTask()}}><img src={refreshImage} alt="refresh"/></button>
                    </div>
                    <h3>{task.display.title}</h3>
                    <div className="content">{this.renderDescription()}</div>
                    {this.renderController()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { game: state.game, role: state.login.role };
}

export default connect(mapStateToProps, {getTask, resetError, setError, finishTask, finishGeoTask, leaderFinishTask})(TaskPage);
