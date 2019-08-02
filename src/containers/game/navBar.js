import React, {Component} from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { getScore } from '../../actions/game';

import hambuger from '../../assets/hambuger.svg';

const listItems = [
        {
            path: '/',
            displayName: '任務'
        },
        {
            path: '/scores',
            displayName: '排名'
        }
    ];


class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMobile: false,
            tabActive: false
        };
    }

    componentDidMount(){
        window.addEventListener('resize', this.hendleResize.bind(this));
        this.setState({
            isMobile: window.innerWidth < 650
        });
        this.props.getScore();
    }

    hendleResize(event){
        if(event.target.outerWidth < 650){
            this.setState({
                isMobile: true,
                tabActive: false
            });
        }else{
            this.setState({
                isMobile: false,
                tabActive: false
            });
        }

    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.hendleResize.bind(this));
    }

    renderNavItem(){
        return listItems.map((item, index)=>{
            return(
                <NavLink exact={(index===0)} to={item.path} className="nav_item" key={index} data-id={index}>{item.displayName}</NavLink>
            );
        });
    }

    handleHambugerClick(event){
        if(this.state.isMobile){
            this.setState({
                tabActive: !this.state.tabActive
            });
        }
    }

    render(){
        return (
            <div className={`game-navbar ${(this.state.tabActive && this.state.isMobile) ? 'active' : ''}`}>
                <div className="score">
                    {(this.props.game.score !== null)? parseInt(this.props.game.score, 10).toLocaleString('en') : 0} 分
                </div>
                <nav className="nav">
                    {this.renderNavItem()}
                </nav>
                <div className="hambuger" onClick={this.handleHambugerClick.bind(this)}>
                    <img src={hambuger} alt="-"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { game: state.game };
}

export default connect(mapStateToProps, {getScore})(NavBar);
