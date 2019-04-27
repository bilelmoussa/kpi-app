import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { registerUser, delete_Error } from '../../actions/authentication';


const styles = theme => ({
  card: {
    display: 'flex',
    minWidth: 300,
    margin: 'auto',
	width: '45%',
	backgroundColor: 'rgba(33, 150, 243, 0.6)',
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
    marginTop: 20,
  },
  Text_validator:{
    margin: "10px 0",
  },
  CardContent:{
    display: 'flex',
    flexDirection : 'column',
    margin: "0 auto",
    padding: 0,
	width: '80%',
	minWidth: 250
  },

  cssLabel: {
		marginBottom: 5,
    '&$cssFocused': {
      color: "#fff",
	  transform: 'scale(0.9)',
    },
  },
  cssFocused: {},

  cssUnderline: {
    '&:after': {
       borderBottomColor: "#ffffff",
    }
 },
  
	register_header:{
		color: "#ffffff"
	},
	
  media: {
    height: '150px',
    width: '150px',
    margin : '10px auto',
	borderRadius: '50%'
  },
  	Button: {
		marginTop: 20,
		marginBottom: 10,
        backgroundColor: '#222222',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#404040',
            color: '#FFF'
        }
    },
	input_css:{
		marginTop: 25,
		'&:before':{
			borderBottomColor: '#3a3a3a',
		}	
	},
	main_input:{
		padding: '10px 15px'
	}
});

const register_errorsStyles = {
	color: '#ffffff',
	fontSize: '14px',
	backgroundColor: '#ff5c5c',
	borderRadius: '5px',
	padding: '10px',
	margin: '5px 0',
	textTransform: 'capitalize',
	fontFamily: 'monospace',
	fontWeight: 'bold',
	letterSpacing: '3px',
	overflow: 'hidden',
	textAlign: 'center',
	wordBreak: 'break-all'
}


export  class register extends Component {

    constructor() {
        super();
        this.state = {
          name: '',
          user_name: '',
          password: '',
          confirmPassword: '',
			    errors: {},
			    toggle_error: true,
			
        }
    }
	
	
    componentDidMount() {
		
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			  if (value !== this.state.password) {
				  return false;
			  }
			  return true;
		});
		
		ValidatorForm.addValidationRule('length_nmbr', (value) => {
			 if (value.length < 3) {
				 return false;
			 }
			 return true;
		});
		
		ValidatorForm.addValidationRule('pasw_val', (value) => {
			if (!/^[a-z0-9]+$/i.test(value) || value.length < 8) {
				return false;
			}
			return true;
		});
	}

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
		toggle_error: true,
		})
		this.props.delete_Error();
		
		
	}
    
    
	handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            user_name: this.state.user_name,
            password: this.state.password,
            name: this.state.name,
        }
		this.props.registerUser(user, this.props.history);
    }

	
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.errors!==prevState.errors ){
			return { errors: nextProps.errors, toggle_error: nextProps.errors.success};
		}
		else{ return null;};
		
	}
	
    componentDidUpdate(prevProps, prevState) {
			if(prevProps.errors!==this.props.errors ) {
				this.setState({
					errors: this.props.errors,
					toggle_error: this.props.errors.success
				});
				
			}else{
				return null;
			}	
			
	}
	
	regsiter_errmsg(){
		let err = this.state.toggle_error;
		if(!err === undefined || err === null || err === false || err === ""){
			return(
			<p style={ register_errorsStyles }>{this.state.errors.msg}</p>
			)
		}
		else{ 
			return null;
		}
	}
	
	err_styles(){
		let err = this.state.toggle_error;
		if(!err === undefined || err === null || err === false || err === ""){
			return({
				display: 'block'
			})
		}
		else{ 
			return ({
				display: 'none'
			});
		}
	}
	

		
  render() {
    const { classes } = this.props;
    return (		
      <div className="forms" id="register">
          <Card className={classes.card}>
              <CardContent className={classes.CardContent}>

                    <ValidatorForm className={classes.CardContent} onSubmit={this.handleSubmit} onClick={this.props.delete_Error}>

							<CardMedia
								  className={classes.media}
								  image={require("../../static/download.jpg")}
								  title="logo"
							/>
							
							<Typography 
								className={classes.title}
								variant='h6'
								classes={{'h6': classes.register_header}}
							>
							Register
							</Typography>
							
							<div  style={this.err_styles()} id="register_err">{this.regsiter_errmsg()}</div>
						
                            <TextValidator
								autoComplete="off"
                              label="Name"
                              onChange={this.handleChange}
                              name="name"
                              value={this.state.name}
                              validators={['required']}
                              errorMessages={['this field is required !']}
                              className={classes.Text_validator}
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                              }}

                              InputProps={{
                                classes: {
                                  root:classes.input_css,			
									underline: classes.cssUnderline,
									input: classes.main_input
                                },
                              }}

                            />

                            <TextValidator
								autoComplete="off"
                              label="Username"
                              onChange={this.handleChange}
                              name="user_name"
                              value={this.state.user_name}
                              validators={['required', 'length_nmbr']}
                              errorMessages={['this field is required !' , 'Username must be at least 3 characters !']}
                              className={classes.Text_validator}
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                              }}

                              InputProps={{
                                classes: {
                                  root:classes.input_css,			
									underline: classes.cssUnderline,
									input: classes.main_input
                                },
                              }}

                            />

                    

                            <TextValidator
								autoComplete="off"
                              label="Password"
                              onChange={this.handleChange}
                              name="password"
                              value={this.state.password}
                              validators={['required', 'pasw_val']}
                              errorMessages={['this field is required !', 'password must be at leaset 8 characters and contain only alphanumeric !']}
                              className={classes.Text_validator}
                              type="password"
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                              }}

                              InputProps={{
                                classes: {
                                  root:classes.input_css,			
									underline: classes.cssUnderline,
									input: classes.main_input
                                },
                              }}        
                            />

                            <TextValidator
								autoComplete="off"
                              label="Confirm Password"
                              onChange={this.handleChange}
                              name="confirmPassword"
                              value={this.state.confirmPassword}
                              validators={['required', 'isPasswordMatch']}
                              errorMessages={['this field is required !', 'confirm password not correct !']}
                              className={classes.Text_validator}
                              type="password"           
                              InputLabelProps={{
                                classes: {
                                  root: classes.cssLabel,
                                  focused: classes.cssFocused,
                                },
                              }}

                              InputProps={{
                                classes: {
                                  root:classes.input_css,			
									underline: classes.cssUnderline,
									input: classes.main_input
                                },
                              }}        
                            />  

                           
                                <Button
                                  type="submit"
                                  variant="contained" 
                                  color="primary"
                                  className={classes.Button}
                                >register</Button>

                                <Button
                                  component={Link}
                                  to="/login"
                                  variant="contained" 
                                  color="primary"
                                  className={classes.Button}
                                >login</Button>

                    </ValidatorForm>
              </CardContent>
          </Card> 
      </div>    
    
    )
  }
}



register.propTypes = {
	classes: PropTypes.object.isRequired,
	registerUser: PropTypes.func.isRequired,
	delete_Error: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
    errors: state.errors,
	auth: state.auth,
});

export default  connect(mapStateToProps,{ registerUser, delete_Error })(withRouter(withStyles(styles)(register)));

