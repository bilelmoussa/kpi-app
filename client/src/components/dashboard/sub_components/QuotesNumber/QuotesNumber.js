import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { withSnackbar } from 'notistack';
import { empty } from '../../../../is-empty';
import {AddQuotesNumber} from '../../../../actions/authentication'

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
    else{
		return false;
	}
}

class QuotesNumber extends Component {
  constructor(){
      super();
      this.state = {
        QuotesNumberValue: "",
        emptyValue: false,
      }
  }

  handleQuotesNumberSubmit = (event) =>{
      event.preventDefault();
      if(validate_cell(this.state.QuotesNumberValue)){
        this.setState({emptyValue: true});
      }else{
        let value = this.state.QuotesNumberValue;
        this.props.AddQuotesNumber(value);
      }
  }

  onQuotesNumberValue = (event) =>{
    this.setState({ QuotesNumberValue: event.target.value });
  }

  handleClickVariant = variant => () => {
    if(!validate_cell(this.state.QuotesNumberValue)){
      //this.props.enqueueSnackbar('New Quotes Number Value has Added !', { variant });
    }  
  };

  exitDialog = () => this.setState({ emptyValue : false });

  render() {

    const {classes} = this.props;
    const { QuotesNumberValue, emptyValue } = this.state;

    return (
      <div className="CR_Container">

             <Typography variant="h6" className={classes.nav_h}>Add Quotes Number Value</Typography>
                    <form autoComplete="off" onSubmit={this.handleQuotesNumberSubmit}>
                        <FormControl className={classes.formControl} >
                            <NumberFormat
                                customInput={TextField}
                                
                                value={QuotesNumberValue}
                                onChange={this.onQuotesNumberValue}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" className={classes.FormButton} onClick={this.handleClickVariant('success')}>Add</Button>
                    </form>

            <Dialog
                open={emptyValue}
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

QuotesNumber.propTypes = {
	auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  AddQuotesNumber: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, {AddQuotesNumber})(withStyles(styles)(QuotesNumber));