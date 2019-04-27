import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser, delete_Error } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex',
    minWidth: 300,
    margin: 'auto',
	width: '35%',
	backgroundColor: 'rgba(33, 150, 243, 0.6)',
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
    marginTop: 20,
  },
  TextValidator:{
    margin: "10px 0",
  },
  ValidatorForm:{
    display: 'flex',
    flexDirection : 'column',
    margin: "0 auto",
    width: '100%'
  },
  CardContent:{
    display: 'flex',
    flexDirection : 'column',
    margin: "0 auto",
	width: '80%',
	minWidth: '250px'
  },

  cssLabel: {
    '&$cssFocused': {
      color: "#fff",
	  transform: 'scale(0.9)'
    },
  },
  cssFocused: {},

  cssUnderline: {
    '&:after': {
      borderBottomColor: "#ffffff",
    },
  },
  register:{
    marginTop: 10,
    marginBottom: 10,
    opacity: '0.9'
  },
  media: {
    height: '150px',
    width: '150px',
    margin : '10px auto',
	borderRadius: '50%'
  },
	log_header:{
		color: "#ffffff"
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

const log_errorsStyles = {
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


export  class login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
			errors: {},
			log_toggle_error: true,
        }
    }

    handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			log_toggle_error: true,
		})
		this.props.delete_Error();
		
	}
    
    
	handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            user_name: this.state.username,
            password: this.state.password,
        }
		this.props.loginUser(user, this.props.history);
    }
	
	static getDerivedStateFromProps(nextProps, prevState){
			if(nextProps.errors!==prevState.errors ){
				return { 
					errors: nextProps.errors,
					log_toggle_error: nextProps.errors.success
				};
			}else{return null;}		
		
		
	}
	
    componentDidUpdate(prevProps, prevState) {
			if(prevProps.errors!==this.props.errors ) {
				this.setState({
					errors: this.props.errors,
					log_toggle_error: this.props.errors.success
				});
			}else{
				return null;
			}
	}
		

	
	 log_errmsg(){
		let err = this.state.log_toggle_error; 
		if(!err === undefined || !err === null || err === false || !err === "" ){
			return(
			<p style={ log_errorsStyles }>{this.state.errors.msg}</p>
		    )
		}
		else{ 
			return (
				null
			)
		}
	}
	
		componentDidMount() {
			if(this.props.auth.isAuthenticated) {
				this.props.history.push('/dashboard');
			}
		}
		

		
  render() {
    const { classes } = this.props;
    return (
      <div className="forms" id="login">
          <Card className={classes.card}>
              <CardContent className={classes.CardContent}>
                    <ValidatorForm className={classes.ValidatorForm} onSubmit={this.handleSubmit} onClick={this.props.delete_Error}>

                            <CardMedia
                              className={classes.media}
                              image={require("../../static/download.jpg")}
                              title="logo"
                            />

                            
							<Typography 
								variant='h6'
								className={classes.title}
								classes={{'h6': classes.log_header}}
								>
								Login
							</Typography>
							
							<div id="log_err">{this.log_errmsg()}</div>	
							
                            <TextValidator
                              label="Username"
                              onChange={this.handleChange}
                              name="username"
                              autoComplete="off"
                              value={this.state.username}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              className={classes.TextValidator}
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
                              label="Password"
                              onChange={this.handleChange}
                              name="password"
                              value={this.state.password}
                              validators={['required']}
                              errorMessages={['this field is required']}
                              className={classes.TextValidator}
                              type="password"
                              autoComplete="off"
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
                            >Login</Button>

                            <Button
                              component={Link}
                              to="/register"
                              variant="contained" 
                              color="primary"
                              className={classes.Button}
                            >Register</Button>

                    </ValidatorForm>
              </CardContent>
          </Card> 
      </div>    
    
    )
  }
}



login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	delete_Error: PropTypes.func.isRequired,
};



const mapStateToProps = (state) => ({
    errors: state.errors,
	auth: state.auth,
	delete_Error: state.auth
})

export default connect(mapStateToProps, { loginUser, delete_Error })(withRouter(withStyles(styles)(login)));
