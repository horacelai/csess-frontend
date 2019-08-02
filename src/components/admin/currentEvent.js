import React, {Component} from 'react';
import TimeTable from '../../assets/timetable.json';

import './currentEvent.css';

class CurrentEvent extends Component{
    constructor(props){
        super(props);

        this.state = {
            time: 0,
            currentDate: '',
            currentEvent: null
        }
    }

    getCurrentEvent(){
        let {time, currentDate} = this.state;

        let tt = TimeTable[currentDate];

        if(!tt) return null;


        for(let i=0; i<tt.length; i++){
            let element = tt[i];
            if(this.getTimeSecond(time) >= this.getTimeSecond(element.timeStart) && this.getTimeSecond(time) < this.getTimeSecond(element.timeEnd)){
                return element;
            }
        }


        return null;
    }

    componentWillMount(){
        let date = new Date();
        this.setState({
            time: date.getHours() * 100 + date.getMinutes(),
            currentDate: date.getDate() + '/' + (date.getMonth() + 1),
            currentEvent: this.getCurrentEvent(),
        });
    }

    componentDidMount(){
        this.setState({
            currentEvent: this.getCurrentEvent(),
        });

        this.timer = setInterval(() => {
            let date = new Date();
            this.setState({
                time: date.getHours() * 100 + date.getMinutes(),
                currentDate: date.getDate() + '/' + (date.getMonth() + 1),
                currentEvent: this.getCurrentEvent(),
            });
        }, 10000);
    }

    getTimeSecond(time){
        return (parseInt(time/100, 10))*60 + parseInt(time%100, 10);
    }

    getTimeProgress(){
        let currentEvent = this.state.currentEvent;

        let totalEventTime = this.getTimeSecond(currentEvent.timeEnd) - this.getTimeSecond(currentEvent.timeStart);
        let totalTimePass = this.getTimeSecond(this.state.time) - this.getTimeSecond(currentEvent.timeStart);

        return (totalTimePass/totalEventTime) * 100;
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        if(!this.state.currentEvent){
            return (
                <div className="current_event">

                </div>
            )
        }
        return (
            <div className="current_event">
                <div className="container">
                    <h4>{this.state.currentEvent.display.name}</h4>
                    <small>{this.state.currentEvent.display.time}</small>
                </div>
                <div className="time-bar" style={{transform: `translateX(-${100 - this.getTimeProgress()}%)`}}></div>
            </div>
        );
    }
}

export default CurrentEvent;
