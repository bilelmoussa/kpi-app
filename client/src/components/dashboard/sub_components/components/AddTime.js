import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { StopTimer_N2,StopTimer_N2_Plus_150, StopTimer_N2_Plus_50, AddClientTimer, AddServerTimer  } from '../../../../actions/authentication';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { empty } from '../../../../is-empty';
import { withSnackbar } from 'notistack';

const styles = theme =>({
    nav_h:{
		padding: "15px 0",
		letterSpacing: "5px",
		textTransform: "uppercase"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    FormButton:{
        display: "flex",
        margin: "30px auto",
        minWidth: 100,
    },
    dialog: {
        width: 'calc(100% - 16px)',
      },
})

function validate_cell(data){
	if(empty(data)){
		return true;
    }
    else if(!/(\d{2}):(\d{2})/.test(String(data))){
        return true;
    }
    else{
		return false;
	}
}

function time_to_numb(value){
    let hours = Number(value.replace(/(\d{2}):(\d{2})/, '$1'));
    let before_col = value.replace(/(\d{2}):(\d{2})/, '$2');
    let minutes = Number(before_col)/60;
    let new_time =  hours + minutes;
    return new_time;
}


class AddTime extends Component {
    constructor(){
        super();
        this.state = {
            N2_selectedDate: "",
            N2Plus150_selectedDate: "",
            N2Plus50_selectedDate: "",
            emptyDate: false,
        }
    }

    onN2DateChange = (event) =>{
        this.setState({ N2_selectedDate: event.target.value });
    }

    onN2Plus150DateChange = (event) =>{
        this.setState({ N2Plus150_selectedDate: event.target.value });
    }

    onN2Plus50DateChange = (event) =>{
        this.setState({ N2Plus50_selectedDate: event.target.value });
    }

    handleN2Submit = (event) =>{
        event.preventDefault();
        if(validate_cell(this.state.N2_selectedDate)){
            this.setState({emptyDate: true});
        }else{
            let value = time_to_numb(this.state.N2_selectedDate);
            this.props.AddClientTimer("N2", value);
            this.props.AddServerTimer("N2", value);
        }
    }

    handleN2Plus150Submit = (event) =>{
        event.preventDefault();
        if(validate_cell(this.state.N2Plus150_selectedDate)){
            this.setState({emptyDate: true});
        }else{
            let value = time_to_numb(this.state.N2Plus150_selectedDate);
            this.props.AddClientTimer("N2Plus150", value);
            this.props.AddServerTimer("N2Plus150", value);
        }
    }

    handleN2Plus50Submit = (event) =>{
        event.preventDefault();
        if(validate_cell(this.state.N2Plus50_selectedDate)){
            this.setState({emptyDate: true});
        }else{
            let value = time_to_numb(this.state.N2Plus50_selectedDate);
            this.props.AddClientTimer("N2Plus50", value);
            this.props.AddServerTimer("N2Plus50", value);
        }
    }

    StopN2Timer = (event) =>{
        event.preventDefault();
        this.props.StopTimer_N2();
    }

    StopN2Plus150Timer = (event) =>{
        event.preventDefault();
        this.props.StopTimer_N2_Plus_150()
    }

    StopN2Plus50Timer = (event) =>{
        event.preventDefault();
        this.props.StopTimer_N2_Plus_50()
    }


    handleClickVariantStart_N2 = variant => () => {
        if(!validate_cell(this.state.N2_selectedDate)){
            this.props.enqueueSnackbar('N2 Count Down Has Started !', { variant });
        }
    };

    handleClickVariantStart_N2Plus150 = variant => () => {
        if(!validate_cell(this.state.N2Plus150_selectedDate)){
            this.props.enqueueSnackbar('N2 Plus 150 Count Down Has Started !', { variant });
        }
    };

    handleClickVariantStart_N2Plus50 = variant => () => {
        if(!validate_cell(this.state.N2Plus50_selectedDate)){
            this.props.enqueueSnackbar('N2 Plus 50 Count Down Has Started !', { variant });
        } 
    };

    handleClickVariantStop_N2 = variant => {
        this.props.enqueueSnackbar('N2 Count Down Has Stoped !', { variant });
    };

    handleClickVariantStop_N2Plus150 = variant => {
        this.props.enqueueSnackbar('N2 Plus 150 Count Down Has Stoped !', { variant });
    };

    handleClickVariantStop_N2Plus50 = variant => {
        this.props.enqueueSnackbar('N2 Plus 50 Count Down Has Stoped !', { variant });
    };

    handleStopButton_N2 = (event) =>{
        this.handleClickVariantStop_N2('warning');
        this.StopN2Timer(event);
    }

    handleStopButton_N2Plus150 = (event) =>{
        this.handleClickVariantStop_N2Plus150('warning');
        this.StopN2Timer(event);
    }

    handleStopButton_N2Plus50 = (event) =>{
        this.handleClickVariantStop_N2Plus50('warning');
        this.StopN2Timer(event);
    }


    exitDialog = () => this.setState({ emptyDate : false });

    render(){
        const {classes} = this.props;
        const {N2_selectedDate,  N2Plus150_selectedDate,  N2Plus50_selectedDate, emptyDate} = this.state;

        return(
            <div className="timer_container">
            <div className="machine_timer">
                    <Typography variant="h6" className={classes.nav_h}>N2</Typography>
                    <form autoComplete="off" onSubmit={this.handleN2Submit}>
                        <FormControl className={classes.formControl} >
                            <NumberFormat
                                customInput={TextField}
                                format="##:##" 
                                placeholder="--:--" 
                                mask={['-', '-', '-', '-']}
                                value={N2_selectedDate}
                                onChange={this.onN2DateChange}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" className={classes.FormButton} onClick={this.handleClickVariantStart_N2('success')}>Add</Button>
                        <Button variant="contained" color="primary" type="button" className={classes.FormButton} onClick={ this.handleStopButton_N2 }
                        >Stop</Button>
                    </form>
            </div>

            <div className="machine_timer">
                    <Typography variant="h6" className={classes.nav_h}>N2 Plus 150</Typography>
                    <form autoComplete="off" onSubmit={this.handleN2Plus150Submit}>
                        <FormControl className={classes.formControl} >
                                <NumberFormat
                                    customInput={TextField}
                                    format="##:##" 
                                    placeholder="--:--" 
                                    mask={['-', '-', '-', '-']}
                                    value={N2Plus150_selectedDate}
                                    onChange={this.onN2Plus150DateChange}
                                />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" className={classes.FormButton} onClick={this.handleClickVariantStart_N2Plus150('success')} >Add</Button>
                        <Button variant="contained" color="primary" type="button" className={classes.FormButton} onClick={this.handleStopButton_N2Plus150}>Stop</Button>
                    </form>
                          
            </div>
            <div className="machine_timer">
                    <Typography variant="h6" className={classes.nav_h}>N2 Plus 50</Typography>
                    <form autoComplete="off" onSubmit={this.handleN2Plus50Submit}>
                        <FormControl className={classes.formControl} >
                                    <NumberFormat
                                        customInput={TextField}
                                        format="##:##" 
                                        placeholder="--:--" 
                                        mask={['-', '-', '-', '-']}
                                        value={N2Plus50_selectedDate}
                                        onChange={this.onN2Plus50DateChange}
                                    />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" className={classes.FormButton} onClick={this.handleClickVariantStart_N2Plus50('success')}>Add</Button>
                        <Button variant="contained" color="primary" type="button" className={classes.FormButton} onClick={this.handleStopButton_N2Plus50}>Stop</Button>
                    </form>   
            </div>
            
            <Dialog
                open={emptyDate}
                onClose={this.exitDialog}
                classes={{ paper: classes.dialog }}
            >
                <DialogTitle>
                    Some field are Empty
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please fill all fields !
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.exitDialog} color="secondary" >
                    Exit
                    </Button>
                </DialogActions>

            </Dialog>

            </div>
        )
    }

}

AddTime.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    N2: PropTypes.object.isRequired,
    N2_Plus_150: PropTypes.object.isRequired,
    N2_Plus_50: PropTypes.object.isRequired,
    StopTimer_N2: PropTypes.func.isRequired,
    StopTimer_N2_Plus_150: PropTypes.func.isRequired,
    StopTimer_N2_Plus_50: PropTypes.func.isRequired,
    AddClientTimer: PropTypes.func.isRequired,
    AddServerTimer: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    N2: state.N2,
    N2_Plus_150: state.N2_Plus_150,
    N2_Plus_50: state.N2_Plus_50
});

export default connect(mapStateToProps, { StopTimer_N2, StopTimer_N2_Plus_150, StopTimer_N2_Plus_50, AddClientTimer, AddServerTimer})(withStyles(styles)(withSnackbar(AddTime)));

