import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import N2 from './machine_tables/N2';
import N2Plus150 from './machine_tables/N2_plus_150';
import N2Plus50 from './machine_tables/N2_plus_50';
import Card from '@material-ui/core/Card';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true },
});



function TabContainer(props) {
  return (
    <Card component="div" style={{overflow: 'auto', margin: '16px auto', width: '98vw'  }}>
      {props.children}
    </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
	root: {
    flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444'	
	},
})

class table extends Component {
	constructor(){
		super();
		this.state = {
			writer_auth: false,
			role: 'user',
			value: 0
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
	
	componentDidMount(){
		if(!this.state.writer_auth){
			this.props.history.push('/dashboard/')
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
				<div className={classes.root}>
				<AppBar className={classes.app_nav}  position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="N2" />
						<Tab label="N2 Plus 150" />
						<Tab label="N2 Plus 50" />
					</Tabs>
				</AppBar>
					{value === 0 && <TabContainer><N2 /></TabContainer>}
					{value === 1 && <TabContainer><N2Plus150 /></TabContainer>}
					{value === 2 && <TabContainer><N2Plus50 /></TabContainer>}
			    </div>
			</MuiThemeProvider>
		)
	}
}

table.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(table))