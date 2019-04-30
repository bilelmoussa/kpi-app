import React, { Component } from 'react';
import Timer from './Timer';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import  { empty } from '../../../../is-empty';


const styles = theme =>({
	nav_h:{
		padding: "15px 0",
		letterSpacing: "5px",
        textTransform: "uppercase",
        margin: "0 20px",
        width: "30%",
        minWidth: "300px",
	}
})

class MachineTimer extends Component {
    constructor(){
        super();
        this.state = {
            time: {},
            seconds: 0,
            MachineName: "",
        };
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };

        return obj;
    }

    componentDidMount(){
        this.setState({seconds: this.props.data, MachineName: this.props.MachineName});
    }



    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            if(empty(nextProps.data)){
                return {seconds: 0, MachineName: nextProps.MachineName}
            }else{
                return {seconds: nextProps.data, MachineName: nextProps.MachineName}
            }
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(empty()){
                this.setState({seconds: 0, MachineName: this.props.MachineName});
            }else{
                this.setState({seconds: this.props.data, MachineName: this.props.MachineName});
            }
        }else{
            return null
        }
    }

   


    render(){
        const { classes } = this.props;
        const { MachineName } = this.state;

        let time = this.secondsToTime(this.state.seconds);

        const { h, m, s } = time;
        

        let hours = "00";
        let minutes = "00";
        let seconds = "00";


        const returnSeconds = () =>{
            if(!empty(s)){
                if(!/(\d{2})/.test(s)){
                    seconds = `0${s}`;
                }else{
                    seconds = `${s}`
                }
            }
        }

        const returnMinutes = () =>{
            if(!empty(m)){
                if(!/(\d{2})/.test(m)){
                    minutes = `0${m}`;
                }else{
                    minutes = `${m}`
                }
            }
        }

        const returnHours = () =>{
            if(!empty(h)){
                if(!/(\d{2})/.test(h)){
                    hours = `0${h}`;
                }else{
                    hours = `${h}`
                }
            }
        }
        
        returnHours();
        returnMinutes();
        returnSeconds();


    
        return(
            <div className="machines_timer">  
                    <Typography variant="h4" className={classes.nav_h}>{MachineName}</Typography>            
                    <div className="container">
                        <Timer data={hours}/>
                        <ul className="flip secondPlay">
                            <li >
                                <div className="a_tag">
                                    <div className="up">
                                        <div className="shadow"></div>
                                        <div className="inn">:</div>
                                    </div>
                                    
                                    <div className="down">
                                        <div className="shadow"></div>
                                        <div className="inn">:</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Timer data={minutes}/>
                        <ul className="flip secondPlay">
                            <li >
                                <div className="a_tag">
                                    <div className="up">
                                        <div className="shadow"></div>
                                        <div className="inn">:</div>
                                    </div>
                                    
                                    <div className="down">
                                        <div className="shadow"></div>
                                        <div className="inn">:</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Timer data={seconds}/>
                    </div>
                </div>
        )
    }
}


MachineTimer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MachineTimer);