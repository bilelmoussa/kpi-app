import React, { Component } from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircleChart from './components/circleChart';
import {getAllMachineRatio} from '../../../actions/authentication';
import { empty } from '../../../is-empty';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Visibility from '@material-ui/icons/Visibility';
import AddCircle from '@material-ui/icons/AddCircle';
import AddTime from './components/AddTime';
import CountDown from './components/CountDown';

const theme = createMuiTheme({
	palette: {
	  type: 'dark', // Switching the dark mode on is a single property value change.
	},
	typography: {
		useNextVariants: true,
	  },
  });

const styles = theme =>({
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

});

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

class dash_home extends Component {
	constructor(){
		super();
		this.state = {
			value: 0,
			data : {
				TimeEfficiency: 0,
				FailRate: 0,
				TemplateEfficiency: 0,
				FilamantComsumption: 0,
			}
		}
	}

	componentDidMount() {
		this.props.getAllMachineRatio(2019)
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.Ratios !== prevState.Ratios){
			if(empty(nextProps.Ratios.data)){
				return null;
			}else{
				return { data: nextProps.Ratios.data };
			}
		}else{
			return null
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.Ratios !== this.props.Ratios){
			if(empty(this.props.Ratios)){
			}else{
				this.setState({data: this.props.Ratios});
			}
		}else{
			return null;
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render(){
		const { classes } = this.props;
		const { data } = this.state;
		const { value } = this.state;

		const time_data = {
			title: "Time Efficiency",
			val: (data.TimeEfficiency * 100).toFixed(0)
		}

		const fail_data = {
			title: "Fail Rate",
			val: (data.FailRate * 100).toFixed(0)
		}

		const Template_data = {
			title: 'Template Efficiency',
			val: (data.TemplateEfficiency * 100).toFixed(0)
		}

		const Filamant_data = {
			title: 'Filamant Comsumption',
			val: (data.FilamantComsumption).toFixed(0) 
		}



		return(
			<MuiThemeProvider theme={theme}>
			<div className="dash_page">
				<div className="ratios">
					<AppBar className={classes.app_nav}  position="static">
					<Typography variant="h5" className={classes.nav_h}>statistics</Typography>
					</AppBar>
					<Card className={classes.CardContainer}>
					
						<CircleChart data={time_data}/>
						<CircleChart data={fail_data}/>
						<CircleChart data={Template_data}/>
						<CircleChart data={Filamant_data}/>
						
					</Card>
				</div>
				<div className="countDown">
					<AppBar className={classes.app_nav}  position="static">
						<Typography variant="h5" className={classes.nav_h}>Timer</Typography>
					</AppBar>
					<AppBar className={classes.app_nav}  position="static">
						<Tabs value={value} onChange={this.handleChange}>
							<Tab icon={<Visibility />} />
							<Tab icon={<AddCircle />} />
						</Tabs>
					</AppBar>
					{value === 0 && <TabContainer><CountDown /></TabContainer>}
					{value === 1 && <TabContainer><AddTime /></TabContainer>}
				
				</div>
			</div>
			</MuiThemeProvider>

			
		)
	}
}

dash_home.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getAllMachineRatio: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	Ratios: state.Ratios,
})

export default  connect(mapStateToProps, {getAllMachineRatio})(withStyles(styles)(dash_home));
=======


export default class dash_home extends Component {
	render(){
		return(
			<div>Dashboard</div>
		)
	}
}
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
