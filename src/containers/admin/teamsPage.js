import React, {Component} from 'react';
import {connect} from 'react-redux';

import { toast } from 'react-toastify';

import {map} from 'lodash';

import {getTeams, addTeam, removeTeam, changeScore, confirmScoreChange} from '../../actions/admin';

import './teamsPage.css';
import deleteIcon from '../../assets/cross.svg';

class TeamPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: '',
            name: '',
            color: 'AAAAAA',
            scoreDirty: false
        }
    }

    componentDidMount(){
        this.props.getTeams();
    }

    handleTeamRemove(event, id){
        event.preventDefault();
        if(window.confirm('Do you want to delete this team? Before you deleting a team, please be sure that no player are on that team.')){
            this.props.removeTeam(id);
            toast.success('Team Removed.');
        }
    }

    handleScoreChange(event, teamId){
        if(!isNaN(event.target.value)){
            this.setState({scoreDirty: true});
            this.props.changeScore(teamId, Math.abs(event.target.value));
        }
    }

    handleScoreKey(event, teamId){
        if(event.keyCode === 13 || event.keyCode === 27) {
            event.preventDefault();
            event.target.blur();
        }
    }

    handleScoreBlur(event, teamId){
        if(this.state.scoreDirty === false){
            return;
        }
        let answer = 0;
        if(this.props.admin.teams[teamId].score !== ''){
            answer = event.target.value;
        }
        this.props.confirmScoreChange(teamId, answer);
        this.setState({scoreDirty: false});
        toast.success('Score Changed.');
    }

    renderTeams(){
        if(this.props.admin.isLoading){
            return (
                <h3>載入中...</h3>
            )
        }else{
            let teams = this.props.admin.teams;

            return map(teams, (team, teamId)=>{
                return (
                        <div key={teamId} className="teams-list-item" style={{borderLeft: `${team.color} solid 10px`}}>
                            <div className="text">
                                <div className="teamname">{team.name}</div>
                                <div className="teamid">ID: {teamId}</div>
                                <input type="text"
                                    className="score"
                                    onChange={(event)=>this.handleScoreChange(event, teamId)}
                                    onKeyDown={(event)=>this.handleScoreKey(event, teamId)}
                                    onBlur={(event)=>this.handleScoreBlur(event, teamId)}
                                    value={teams[teamId].score}
                                    tabIndex="-1"></input>
                            </div>
                            <button className="delete-icon" onClick={(event)=>this.handleTeamRemove(event, teamId)}><img src={deleteIcon} alt="delete" width='24px'/></button>
                        </div>);
            });
        }
    }

    renderInput(name, displayName){
        return(
            <div className="input-group">
                <label htmlFor={name}>{displayName}</label>
                <input type="text" name={name} id={name} value={this.state[name]} onChange={(event)=>this.handleInputChange(event, name)}/>
            </div>
        );
    }

    renderColorInput(name, displayName){
        return(
            <div className="input-group">
                <label htmlFor={name}>{displayName}</label>
                <div className="input-color-group">
                    <input type="color" name={name} id={name} value={this.state[name]} onChange={(event)=>this.handleInputChange(event, name)}/>
                </div>
            </div>
        );
    }

    handleInputChange(event, name){
        let s = {};
        s[name] = event.target.value;
        this.setState(s);
    }

    handleFormSubmit(event){
        let {id, name, color} = this.state;
        event.preventDefault();
        if(id === '' || name === '' || color === '') {
            toast.error('Text should not be empty!');
            return;
        }


        this.props.addTeam(id, {name: name, color: color});
        this.setState({
            id: '',
            name: '',
            color: 'aaaaaa'
        });

        toast.success('Team Created.');
    }

    render(){
        return (
            <div className="teamPage container">
                <h1>Teams</h1>
                <form onSubmit={this.handleFormSubmit.bind(this)} className="inline-form">
                    {this.renderInput('id', 'Team id')}
                    {this.renderInput('name', 'Name')}
                    {this.renderColorInput('color', 'Color')}
                    <input type='submit' value="Add Team"/>
                </form>
                <div className="teams-list">
                    {this.renderTeams()}
                </div>
            </div>);
    }
}

function mapStateToProps(state){
    return { admin: state.admin };
}

export default connect(mapStateToProps, {getTeams, addTeam, removeTeam, changeScore, confirmScoreChange})(TeamPage);
