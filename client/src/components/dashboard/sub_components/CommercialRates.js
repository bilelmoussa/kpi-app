import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { empty } from '../../../is-empty';
import QuotesNumber from '../sub_components/QuotesNumber/QuotesNumber';
import Clients from '../sub_components/Clients/Clients';
import Turnover from '../sub_components/Turnover/Turnover';

const theme = createMuiTheme({
	palette: {
	  type: 'dark', 
	},
	typography: {
		useNextVariants: true,
	  },
  });

const styles = theme => ({
	CardContainer : {
		display: "flex",
		flexDirection: "row",
		flexWrap: "Wrap",
		justifyContent: "space-around",
		margin: "0"
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
	}

})


function TabContainer(props) {
	return (
	  <Card component="div" >
		{props.children}
	  </Card>
	);
  }
  
  TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
  };


class CommercialRates extends Component {
	 constructor(){
		 super();
		 this.state = {
			 value: 0,
			 writer_auth: false,
			 role: 'user',
		 }
	 }

	 componentDidMount(){
		if(!empty(this.props.auth.user)){
			if(this.props.auth.user.role === "admin" || this.props.auth.user.role === "staff"){
				this.setState({
					writer_auth: true,
					role : 	this.props.auth.user.role
				})
			}else if(!this.state.writer_auth){
				this.props.history.push('/dashboard/')
			}
		}else{
			return null;
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.auth.user.role!==prevState.role && (nextProps.auth.user.role === 'staff' || nextProps.auth.user.role === 'admin')){
			return { role: nextProps.auth.user.role, writer_auth: true };
		}
			else return null;
	};
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.auth.user.role!==this.props.auth.user.role && (this.props.auth.user.role === 'staff' || this.props.auth.user.role === 'admin')) {
			this.setState({
				role: this.props.auth.user.role,
				writer_auth: true
			});
		}else{
			return null;
		}
	}

	 handleChange = (event, value) => {
		this.setState({ value });
	};

	render(){
		const { classes } = this.props;
		const { value } = this.state;

		return(
			<MuiThemeProvider theme={theme}>
					<div className="countDown">
					<AppBar className={classes.app_nav}  position="static">
						<Typography variant="h5" className={classes.nav_h}>Commercial Rates</Typography>
					</AppBar>
					<AppBar className={classes.app_nav}  position="static">
						<Tabs value={value} onChange={this.handleChange}>
							<Tab label="Quotes Number" />
							<Tab label="Clients" />
							<Tab label="Turnover" />
						</Tabs>
					</AppBar>
					{value === 0 && <TabContainer><QuotesNumber /></TabContainer>}
					{value === 1 && <TabContainer><Clients /></TabContainer>}
					{value === 2 && <TabContainer><Turnover /></TabContainer>}
				</div>
			</MuiThemeProvider>			
		)
	}
}

CommercialRates.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(withStyles(styles)(CommercialRates))