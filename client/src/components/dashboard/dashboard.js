import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Assessment from '@material-ui/icons/Assessment';
import Description from '@material-ui/icons/Description';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from '@material-ui/icons/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { Route, Switch, Link } from 'react-router-dom';
import profile from './sub_components/profile';
import chart from './sub_components/chart';
import table from './sub_components/table';
import dash_home from './sub_components/dash_home';
import users from './sub_components/users';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { ButtonBase } from '@material-ui/core';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CommercialRates from './sub_components/CommercialRates'


const styles = {
  list: {
    width: 280,
	display: 'flex',
	flexDirection: 'column'
  },
  account_circle:{
	  color: '#ffffff'
  },
  list_text:{
		color: '#ffffff',
		textTransform: 'capitalize'
  },
  left_bar:{
	  backgroundColor: '#2196f3',
  },
  grow: {
		flexGrow: 1,
		display: "flex",
		flexDirection: 'row',
		letterSpacing: '7px',
		fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 27,
    textTransform: 'uppercase',
		textShadow: "1px 1px 1px #f9f9f9",
		width: 230,
		justifyContent: "start"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  nav:{
	  backgroundColor: '#2196f3',
	  width: 'auto'
  },
  bigAvatar:{
	width: 100,
	height: 100,
	margin: '20px auto'
	},
	smlAvatar:{
		width: 40,
		height: 40,
		margin: 'auto 10px auto 5px'
	},
  ul_list:{
	margin: '20px 0'  
	},
	TitleContainer:{
		width: "100%"
	}
  
}

const pagenotfound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


	
class dashboard extends Component {
	constructor(){
		super();
		this.state = {
		 left: false,
		 writer_auth: false,
		 role: 'read'
		}
	}
	 
	 
	toggleDrawer = (side, open) => () => {
		this.setState({
		  [side]: open,
		});
	};
	
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.auth.user.role!==prevState.role && (nextProps.auth.user.role === 'write' || nextProps.auth.user.role === 'admin')){
			return { role: nextProps.auth.user.role, writer_auth: true };
		}
			else return null;
	};
    
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.auth.user.role!==this.props.auth.user.role && (this.props.auth.user.role === 'write' || this.props.auth.user.role === 'admin')) {
			this.setState({
				role: this.props.auth.user.role,
				writer_auth: true
			});
		}else{
			return null;
		}
	}
	
	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		}
	}
	
	onLogout(e){
		e.preventDefault();
        this.props.logoutUser(this.props.history);
	}
	
	 ProtectedTable(classes){
		if(this.state.writer_auth){
		return(
		<ListItem component={Link} to={`/dashboard/table`}  button>
				<ListItemIcon>
					<Description style={styles.account_circle}/>
					</ListItemIcon>
				<ListItemText primary={'table'} classes={{ primary: classes.list_text }}/>
		</ListItem>);
		}else{
		 return(null);
		}
	}

	ProtectedUsers(classes){
		if(this.state.writer_auth && this.state.role === 'admin'){
			return(
				<ListItem component={Link} to={`/dashboard/users`}  button>
						<ListItemIcon>
							<SupervisedUserCircle style={styles.account_circle}/>
						</ListItemIcon>
						<ListItemText primary={'users'} classes={{ primary: classes.list_text }}/>
				</ListItem>
			);
		}else{
			return null;
		}
	}
	
	ProtectedCommercialRates(classes){
		if(this.state.writer_auth){
			return(
				<ListItem component={Link} to={`/dashboard/CommercialRates`}  button>
						<ListItemIcon>
							<AttachMoney style={styles.account_circle}/>
						</ListItemIcon>
						<ListItemText primary={'Commercial Rates'} classes={{ primary: classes.list_text }}/>
				</ListItem>
			)
		}else{
			return null;
		}
	}


  render() {
	const { classes } = this.props;
	 const sideList = (
			<div className={classes.list}>
				<Avatar 
					src={require('../../static/download.jpg')} 
					className={classes.bigAvatar}
				/>
				<Divider />
				<List className={classes.ul_list}>
					
					<ListItem component={Link} to={`/dashboard`}  button>
						<ListItemIcon>
							<Dashboard style={styles.account_circle} />
						</ListItemIcon>
						<ListItemText primary={'dashboard'} classes={{ primary: classes.list_text }}/>
					</ListItem>
					
					<ListItem component={Link} to={`/dashboard/profile`}  button>
						<ListItemIcon>
							<AccountCircle style={styles.account_circle} />
						</ListItemIcon>
						<ListItemText primary={'profile'} classes={{ primary: classes.list_text }}/>
					</ListItem>
					
					{this.ProtectedTable(classes)}
					
					<ListItem component={Link} to={`/dashboard/chart`}  button>
						<ListItemIcon>
							<Assessment style={styles.account_circle}/>
						</ListItemIcon>
						<ListItemText primary={'chart'} classes={{ primary: classes.list_text }}/>
					</ListItem>
					
					{this.ProtectedCommercialRates(classes)}

					{this.ProtectedUsers(classes)}
					
					
				</List>
			</div>
	 )
    return (
		<Grid container direction='column'>
			<AppBar className={classes.nav} position="static">
				<Toolbar>
					<IconButton onClick={this.toggleDrawer('left', true)}  className={classes.menuButton} color="inherit" aria-label="Menu">
					<MenuIcon />
					</IconButton>
					<div className={classes.TitleContainer}>
					<ButtonBase className={classes.grow} component={Link} to={`/dashboard`}  >
					<Avatar
								src={require('../../static/download.jpg')}
								className={classes.smlAvatar}
					>
					
					</Avatar>
						3dWave
					</ButtonBase>
					</div>
					
					<Button 
						color="inherit"
						onClick={this.onLogout.bind(this)}
						>
						<ExitToApp />
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer classes={{paper:classes.left_bar}} open={this.state.left} onClose={this.toggleDrawer('left', false)}>
				<div
				tabIndex={0}
				role="button"
				onClick={this.toggleDrawer('left', false)}
				onKeyDown={this.toggleDrawer('left', false)}
				>
					{sideList}
				</div>
			</Drawer>
			<div id="sub_routes">
				<Switch>
						<Route exact path={`/dashboard`} component={dash_home} />
						<Route exact path={`/dashboard/profile`} component={profile} />
						<Route exact path={`/dashboard/table`} component={table} auth={this.props.auth} />
						<Route exact path={`/dashboard/chart`} component={chart} />
						<Route exact path={`/dashboard/CommercialRates`} component={CommercialRates} />
						<Route exact path={`/dashboard/users`} component={users} />
						<Route component={pagenotfound}/>
				</Switch>
			</div>
		</Grid>
    )
  }
}

dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default  connect(mapStateToProps, {logoutUser})(withStyles(styles)(dashboard));
