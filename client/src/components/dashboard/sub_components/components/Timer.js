import React, { Component } from 'react';

class Timer extends Component {
    constructor(){
        super();
        this.state = {
            data: "00"
        }
    }

    componentDidMount(){
        this.setState({data: this.props.data});
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data !== prevState.data){
            return {data: nextProps.data}
        }else{
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({data: this.props.data})
        }else{
            return null;
        }
    }

    render(){
        const {data} = this.state;
        
        let firstPart = "0";
        let secondPart = "0";

        firstPart = data.replace(/(\d{1})(\d{1})/, '$1');
        secondPart = data.replace(/(\d{1})(\d{1})/, '$2');

        return(
            <div className="Number_countdown">
                <ul className="flip secondPlay">
                    <li >
                        <div className="a_tag">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">{firstPart}</div>
                            </div>
                            
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">{firstPart}</div>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul className="flip secondPlay">
                    <li >
                        <div className="a_tag">
                            <div className="up">
                                <div className="shadow"></div>
                                <div className="inn">{secondPart}</div>
                            </div>
                            
                            <div className="down">
                                <div className="shadow"></div>
                                <div className="inn">{secondPart}</div>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        )
    }
}

export default Timer;

