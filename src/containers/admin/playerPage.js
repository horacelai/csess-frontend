import React, {Component} from 'react';
import {connect} from 'react-redux';

import { toast } from 'react-toastify';

import {getTeamList, getPlayerFromTeam, addPlayer, removePlayer} from '../../actions/admin';

import { size, map, pickBy } from 'lodash';

import deleteIcon from '../../assets/cross.svg';

import './playerPage.css';

class PlayerPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: '',
            team: 'ADMIN',
            role: 'USER',
            username: ''
        }

    }

    componentDidMount(){
        this.props.getTeamList();
        this.props.getPlayerFromTeam('ADMIN');
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.team !== prevState.team){
            this.props.getPlayerFromTeam(this.state.team);
        }
    }

    handlePlayerRemove(event, id){
        event.preventDefault();
        if(window.confirm('Do you want to delete this player?')){
            this.props.removePlayer(id, this.props.admin.players[id]);
            toast.success('Player Removed.');
        }
    }

    renderPlayers(){
        const roleStyle = {
            'USER': {
                color: '#000000',
                backgroundColor: '#FFFFFF'
            },
            'LEADER': {
                color: '#000000',
                backgroundColor: '#fff175'
            },
            'ADMIN': {
                color: '#FFFFFF',
                backgroundColor: '#7F4EC9'
            }
        };
        if(this.props.admin.isLoading || this.state.team === ''){
            return (
                <h3>載入中...</h3>
            );
        }else if((this.props.admin.players) && size(this.props.admin.players) === 0){
            return(
                <h3>冇人喺度 :(</h3>
            );
        }else{
            let players = this.props.admin.players;
            console.log(players);
            return map(pickBy(players, (p)=> { return p.team === this.state.team}), (player, playerId)=>{
                return (
                    <div key={playerId} className="players-list-item">
                        <div className="text">
                            <div className="playerName">{player.username}</div>
                            <div className="playerId">ID: {playerId}</div>
                            <div className="playerRole" style={roleStyle[player.role]}>{player.role}</div>
                        </div>
                        <button className="delete-icon" onClick={(event)=>this.handlePlayerRemove(event, playerId)}><img src={deleteIcon} alt="delete" width='24px'/></button>
                    </div>);
            });
        }
    }

    handleInputChange(event, name){
        let s = {};
        s[name] = event.target.value;
        this.setState(s);
    }

    handleFormSubmit(event){
        let {id, team, role, username} = this.state;
        event.preventDefault();

        let data = {role, team, username};

        if(id === '' || username === '') {
            toast.error('Text should not be empty!');
            return;
        }

        this.props.addPlayer(id, data);

        this.setState({
            id: '',
            role: 'USER',
            username: ''
        });
        toast.success('Player Created.');
    }

    renderInput(name, displayName){
        return(
            <div className="input-group">
                <label htmlFor={name}>{displayName}</label>
                <input type="text" name={name} id={name} value={this.state[name]} onChange={(event)=>this.handleInputChange(event, name)}/>
            </div>
        );
    }

    renderSelect(name, displayName, options = [], onChange){
        return(
            <div className="input-group">
                <label htmlFor={name}>{displayName}</label>
                <select value={this.state[name]} onChange={(event)=>{this.handleInputChange(event, name)}}>
                    {options.map((option)=>{
                        return(
                            <option key={option} value={option}>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }

    render(){
        return(
            <div className="playerPage container">
                <h1>Players</h1>

                {this.renderSelect('team', 'Team', this.props.admin.teamList, (event)=>{
                    this.props.getPlayerFromTeam(event.target.value);
                })}

                <form onSubmit={this.handleFormSubmit.bind(this)} className="inline-form">
                    {this.renderInput('id', 'Id')}
                    {this.renderInput('username', 'Name')}
                    {this.renderSelect('role', 'Role', ['USER', 'LEADER', 'ADMIN'])}
                    <input type='submit' value="Add Player"/>
                </form>
                <div className="players-list">
                    {this.renderPlayers()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { admin: state.admin };
}

export default connect(mapStateToProps, {getTeamList, getPlayerFromTeam, addPlayer, removePlayer})(PlayerPage);
