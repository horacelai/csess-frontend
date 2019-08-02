import React, {Component} from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

import hambuger from '../../assets/hambuger.svg';

const listItems = [
        {
            path: '/admin',
            displayName: 'Home'
        },
        {
            path: '/admin/signin',
            displayName: 'Sign In'
        },
        {
            path: '/admin/hunt',
            displayName: 'QR Hunt'
        },
        {
            path: '/admin/teams',
            displayName: 'Teams'
        },
        {
            path: '/admin/players',
            displayName: 'Players'
        },
        {
            path: '/admin/tasks',
            displayName: 'Tasks'
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
            <div className={`admin-navbar ${(this.state.tabActive && this.state.isMobile) ? 'active' : ''}`}>
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

export default NavBar;
