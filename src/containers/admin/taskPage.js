import React, {Component} from 'react';
import {connect} from 'react-redux';

import {map} from 'lodash';

import { toast } from 'react-toastify';

import { getTasks, getTeams, getStages, updateStage, setTask, skipTask, finishTask } from '../../actions/admin';

import './taskPage.css';

class TaskPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            stage: 'NONE',
            task: {}
        };
    }

    componentDidMount(){
        this.props.getTeams();
        this.props.getTasks();
        this.props.getStages();
    }

    renderStageOptions(){
        let stages = this.props.admin.stages;

        return map(stages, (stage, index)=>{
            return(
                <option key={index} value={stage}>
                    {stage}
                </option>
            );
        });
    }

    handleStageSubmit(event){
        event.preventDefault();

        if(window.confirm('Do you really want to change stage? All tasks will be reset once you submit it.')){
            this.props.updateStage(this.state.stage);
        }
    }

    handleStageChange(event){
        this.setState({
            stage: event.target.value
        });
    }

    handleSetTaskClick(event, teamId){
        if(this.state.task[teamId] && this.state.task[teamId] !== ''){
            if(window.confirm('Do you want to set the task?')){
                this.props.setTask(teamId, this.state.task[teamId]);

                let t = { ...this.state.task };
                t[teamId] = '';
                this.setState({ task: t });
            }
        }else{
            toast.error('Please select a task.');
        }
    }

    handleSetTaskChange(event, teamId){
        let t = { ...this.state.task };
        t[teamId] = event.target.value;
        this.setState({ task: t });
    }

    handleSkipTask(event, teamId){
        if(window.confirm('Do you want to skip this task?')){
            this.props.skipTask(teamId);
        }
    }

    handleFinishTask(event, teamId){
        if(window.confirm('Do you want to finish this task?')){
            this.props.finishTask(teamId);
        }
    }

    renderController(task, id){
        if(task.taskId === '-1'){
            return (
                <div className='task-controller'>
                    <select onChange={(event) => this.handleSetTaskChange(event, id)} value={this.state.task[id]}>
                        <option value=''>NO TASK</option>
                        {
                            this.props.admin.tasksList.map((task)=>{
                                return ( <option key={task} value={task}>{task}</option> )
                            })
                        }
                    </select>
                    <button onClick={(event) => this.handleSetTaskClick(event, id)}>Set Task</button>
                </div>
            );
        }else if(task.type !== 'END'){
            return (
                <div className='task-controller'>
                    <button onClick={(event)=>this.handleSkipTask(event, id)}>Skip</button>
                    <button onClick={(event)=>this.handleFinishTask(event, id)}>Finish</button>
                </div>
            );
        }
    }

    renderDescription(desc){
        if(Array.isArray(desc)){
            return desc.map((line, index)=>{
                return <p key={index}>{line}</p>;
            });
        }else{
            return desc;
        }
    }

    renderTasksList(){
        let { teams, tasks} = this.props.admin;
        console.log(tasks);
        if(this.props.admin.isLoading || !this.props.admin.tasks){
            return (
                <h3>載入中...</h3>
            );
        }else{
            return map(tasks, (task, key)=>{
                return (
                    <div key={key} className="tasks-list-item">
                        <h3>{key}: {teams[key].name}</h3>
                        <div className='title'>{task.display.title}</div>
                        <div className='description'>{this.renderDescription(task.display.description)}</div>
                        {this.renderController(task, key)}
                    </div>
                );
            });
        }
    }

    render(){
        return (
            <div className="taskPage container">
                <h1>Tasks</h1>
                <form className="inline-form" onSubmit={this.handleStageSubmit.bind(this)}>
                    <div className="input-group"><label htmlFor="stage-selection">Stage</label><select id="stage-selection" onChange={this.handleStageChange.bind(this)} value={this.state.stage}>{this.renderStageOptions()}</select></div>
                    <input type="submit" value="Set Stage" />
                </form>
                <h2>Current Stage: {this.props.admin.currentStage}</h2>
                <div className="tasks-list">
                    {this.renderTasksList()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { admin: state.admin };
}

export default connect(mapStateToProps, { getTasks, getTeams, getStages, updateStage, setTask, skipTask, finishTask })(TaskPage);
