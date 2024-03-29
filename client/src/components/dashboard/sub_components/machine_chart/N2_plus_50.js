import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Week from './date/week';
import Month from './date/month';
import Year from './date/year';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		flexDirection: "row",	
	}
})

function TabContainer(props) {
  return (
    <Card component="div" style={{overflow: 'auto', margin: '0', width: '100%'  }}>
      {props.children}
    </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

class N2Plus50 extends Component{
	constructor(){
		super();
		this.state = {
			value: 0,
		}
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
							<Tab label="Week" />
							<Tab label="Month" />
							<Tab label="Year" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><Week machine="N2Plus50"/></TabContainer>}
				{value === 1 && <TabContainer><Month  machine="N2Plus50"/></TabContainer>}
				{value === 2 && <TabContainer><Year  machine="N2Plus50"/></TabContainer>}

			</div>	
		)
		
	}	
}


N2Plus50.propTypes = {
	classes: PropTypes.object.isRequired,
};





export default  withStyles(styles)(N2Plus50);