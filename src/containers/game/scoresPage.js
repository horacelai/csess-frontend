import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getScores } from '../../actions/game';
import refreshImage from '../../assets/refresh.svg';

import './scoresPage.css';

class ScoresPage extends Component{
    componentDidMount(){
        this.props.getScores();
    }

    renderTeams(){
        let scores = this.props.game.scores;
        return scores.map((team, id)=>{
            return (
                <div key={id} className="rank-list-item" style={{borderBottom: `${team.team.color} solid 3px`}}>
                    <div>
                        {team.team.name}
                    </div>
                    <div>
                        {team.score}
                    </div>
                </div>
            );
        })
    }

    render(){
        return(
            <div className="scoresPage">
                <div className="container">
                    <div className="btn-container">
                        <h1>排名</h1>
                        <button className="refresh-button" onClick={()=>{this.props.getScores()}}><img src={refreshImage} alt="refresh"/></button>
                    </div>
                    <div className="rank-list">
                        {this.renderTeams()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { game: state.game };
}

export default connect(mapStateToProps, {getScores})(ScoresPage);
