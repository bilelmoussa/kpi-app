import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444'	
	},	
})

function TabContainer(props) {
  return (
    <Card component="div">
      {props.children}
    </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class N2Plus50 extends Component{
	constructor(){
		super();
		this.state = {
			value: 0
		}
	}
	
	componentDidMount(){
		
	}
	
	handleChange = (event, value) => {
		this.setState({ value });
	};
	
	render(){
		const { classes } = this.props;
		const { value } = this.state;
		
		return(
			<div className={classes.root}>
				<AppBar className={classes.app_nav}  position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="week 1" />
						<Tab label="week 2" />
					</Tabs>
				</AppBar>
					{value === 0 && <TabContainer>Week 1</TabContainer>}
					{value === 1 && <TabContainer>week 2</TabContainer>}
			</div>		
		)
		
	}	
}


N2Plus50.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
	auth: state.auth,
});


export default  connect(mapStateToProps)(withStyles(styles)(N2Plus50));