import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { GetUsersList, ChangeAdminRole, deleteUser } from '../../../actions/authentication';
import { empty } from '../../../is-empty';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
	palette: {
	  type: 'dark', 
	},
	typography: {
		useNextVariants: true,
	  },
  });

const styles = theme =>({
	CardContainer : {
		width: '100%',
		overflowX: 'auto',
		position: 'absolute',
		paddingBottom: "50px"
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		textAlign: "center"	
	},
	nav_h:{
		padding: "15px 0",
		letterSpacing: "5px",
		textTransform: "uppercase"
	},
	table: {
		minWidth: 700,
	},
	btn:{
		fontSize: 12
	}

});



class users extends Component {
	constructor(){
		super();
		this.state = {
			admin_auth: false,
			role: 'user',
			UsersList: [],
			checkedB: true,
		}
	}

	componentDidMount(){
		this.props.GetUsersList();

		if(!empty(this.props.auth.user)){
			if(this.props.auth.user.role === "admin" || this.props.auth.user.role === "staff"){
				this.setState({
					writer_auth: true,
					role : 	this.props.auth.user.role
				})
			}
		}else if(!this.state.admin_auth){
			this.props.history.push('/dashboard/')
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps !== prevState){
			if(!empty(nextProps.auth.user) && empty(nextProps.UsersList) ){
				if(nextProps.auth.user.role === "admin"){
					return { role: nextProps.auth.user.role, admin_auth: true };
				}else{
					return null;
				}
			}else if(!empty(nextProps.auth.user) && !empty(nextProps.UsersList)){
				if(nextProps.auth.user.role === "admin"){
					return { role: nextProps.auth.user.role, admin_auth: true, UsersList: nextProps.UsersList.Users_List};
				}else{
					return null;
				}
			}
			else{ 
				return null
			};
		}else{
			return null;
		}
		
	};
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps!==this.props) {
			if(!empty(this.props.auth) && empty(this.props.UsersList)){
				if(this.props.auth.user.role === 'admin'){
					this.setState({
						role: this.props.auth.user.role,
						admin_auth: true
					});
				}else{
					return null;
				}
			}else if(!empty(this.props.auth) && !empty(this.props.UsersList)){
				if(this.props.auth.user.role === 'admin'){
					this.setState({
						role: this.props.auth.user.role,
						admin_auth: true,
						UsersList: this.props.UsersList.Users_List,
					});
				}else{
					return null;
				}
			}else{
				return null;
			}
			
		}else{
			return null;
		}
	}


	handleChange = (id, Admin) => event => {
		let NewUserList = [];
		let User;
		this.state.UsersList.forEach((user, i)=>{
			if(user.id === id){
				if(Admin === true){
					user.role = "user"
				}else{
					user.role = "staff"
				}
				User = user;
			}
			NewUserList.push(user);
		});

		this.props.ChangeAdminRole(NewUserList, User);
	};

	handleRemove = (id) => event =>{
		this.state.UsersList.forEach((user, i)=>{
			if(user.id === id){
				this.props.deleteUser(user, this.state.UsersList)
			}
		})
		
	}
	
	renderUserRows(UsersList, classes){
		if(!empty(UsersList)){
			return(
				UsersList.map(row => {
					let Staff;
					if(row.role === "staff"){
						Staff = true;
					}else{
						Staff = false;
					}
					return(
					<TableRow key={row.id}>
					<TableCell component="th" scope="row">
						{row.name}
					</TableCell>
					<TableCell >{row.user_name}</TableCell>
					<TableCell >
						<Switch
							checked={Staff}
							onChange={this.handleChange(row.id, Staff)}
							value="Staff"
							color="primary"
						/>
					</TableCell>
					<TableCell>
						<Button 
							variant="contained" 
							color="secondary"
							className={classes.btn}
							onClick={this.handleRemove(row.id)}
						>
							Remove
						</Button>
					</TableCell>
					</TableRow>
				)})
			)
		}else{
			return null;
		}
	}
	
	render(){
		const { classes } = this.props;
		const { UsersList } = this.state;

		return(
			<MuiThemeProvider theme={theme}>
				<div> 
					<AppBar className={classes.app_nav}  position="static">
							<Typography variant="h5" className={classes.nav_h}>Users</Typography>
					</AppBar>
					<Card className={classes.CardContainer}>
						<Table className={classes.table}>
							<TableHead>
							<TableRow>
								<TableCell className="tableCell">Name</TableCell>
								<TableCell className="tableCell">UserName</TableCell>
								<TableCell className="tableCell">Role <p>(User/Staff)</p></TableCell>
								<TableCell className="tableCell">Remove</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>

							{this.renderUserRows(UsersList, classes)}

							</TableBody>
						</Table>
					</Card>
				</div>
			</MuiThemeProvider>
		)
	}
}

users.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	GetUsersList: PropTypes.func.isRequired,
	UsersList: PropTypes.object.isRequired,
	ChangeAdminRole: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	UsersList: state.UsersList
});

export default connect(mapStateToProps, { GetUsersList, ChangeAdminRole, deleteUser })(withStyles(styles)(users))