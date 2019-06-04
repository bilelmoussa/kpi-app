import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircleChart from './components/circleChart';
import {getAllMachineRatio, GetQuotesNumber, GetClients, GetTurnover} from '../../../actions/authentication';
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
	  type: 'dark', 
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
		margin: "0 0 50px 0"
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
			},
			QuotesNumber: 0,
			Clients: 0,
			Turnover: 0,
			writer_auth: false,
			role: 'user'
		}
	}

	componentDidMount() {
		let date = new Date();
		let year = date.getFullYear();
		this.props.getAllMachineRatio(year);
		this.props.GetQuotesNumber();
		this.props.GetClients();
		this.props.GetTurnover();
		
		if(!empty(this.props.auth.user)){
			if(this.props.auth.user.role === "admin" || this.props.auth.user.role === "staff"){
				this.setState({
					writer_auth: true,
					role : 	this.props.auth.user.role
				})
			}
		}else{
			return null;
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps !== prevState){
			if(!empty(nextProps.Ratios.data) &&  empty(nextProps.QuotesNumber) && empty(nextProps.Clients) && empty(nextProps.Turnover) &&  empty(nextProps.auth.user)){
				return { data: nextProps.Ratios.data };
			}
			
			else if(!empty(nextProps.QuotesNumber) && !empty(nextProps.QuotesNumber) && empty(nextProps.Clients) && empty(nextProps.Turnover) &&  empty(nextProps.auth.user)){
				return {
					data: nextProps.Ratios.data, 
					QuotesNumber: nextProps.QuotesNumber.QuotesNumber
				}
			}
			else if(!empty(nextProps.Ratios.data) && !empty(nextProps.QuotesNumber) && !empty(nextProps.Clients) && empty(nextProps.Turnover) &&  empty(nextProps.auth.user)){
				return {
					data: nextProps.Ratios.data, 
					QuotesNumber: nextProps.QuotesNumber.QuotesNumber, 
					Clients: nextProps.Clients.Clients
				}
			}
			
			else if(!empty(nextProps.Ratios.data) && !empty(nextProps.QuotesNumber) && !empty(nextProps.Clients) && !empty(nextProps.Turnover) &&  empty(nextProps.auth.user)){
				return {
					data: nextProps.Ratios.data, 
					QuotesNumber: nextProps.QuotesNumber.QuotesNumber, 
					Clients: nextProps.Clients.Clients, 
					Turnover: nextProps.Turnover.Turnover
				}
			}
			
			else if(!empty(nextProps.Ratios.data) && !empty(nextProps.QuotesNumber) && !empty(nextProps.Clients) && !empty(nextProps.Turnover) &&  !empty(nextProps.auth.user)){

				if(nextProps.auth.user.role === 'staff' || nextProps.auth.user.role === 'admin'){
					return { 
						data: nextProps.Ratios.data, 
						QuotesNumber: nextProps.QuotesNumber.QuotesNumber, 
						Clients: nextProps.Clients.Clients, 
						Turnover: nextProps.Turnover.Turnover, 
						role: nextProps.auth.user.role,
						writer_auth: true
					}
				}else{
					return {
						data: nextProps.Ratios.data, 
						QuotesNumber: nextProps.QuotesNumber.QuotesNumber, 
						Clients: nextProps.Clients.Clients, 
						Turnover: nextProps.Turnover.Turnover, 
						role: nextProps.auth.user.role,
						writer_auth: false
					};
				}
				
			}
			
			else{
				return null
			}

		}else{
			return null
		}
	}
	

	
	componentDidUpdate(prevProps, prevState){
		if(prevProps !== this.props){
			if(!empty(this.props.Ratios) && empty(this.props.QuotesNumber) && empty(this.props.Clients) && empty(this.props.Turnover) && empty(this.props.auth.user)){
				this.setState({data: this.props.Ratios});
			}
			else if(!empty(this.props.Ratios)  && !empty(this.props.QuotesNumber) && empty(this.props.Clients) && empty(this.props.Turnover) && empty(this.props.auth.user)){
				this.setState({
					data: this.props.Ratios, 
					QuotesNumber: this.props.QuotesNumber.QuotesNumber
				})
			}
			else if(!empty(this.props.Ratios)  && !empty(this.props.QuotesNumber) && !empty(this.props.Clients) && empty(this.props.Turnover) && empty(this.props.auth.user)){
				this.setState({ 
					data: this.props.Ratios, 
					QuotesNumber: this.props.QuotesNumber.QuotesNumber, 
					Clients: this.props.Clients.Clients 
				})
			}
			else if(!empty(this.props.Ratios)  && !empty(this.props.QuotesNumber) && !empty(this.props.Clients) && !empty(this.props.Turnover) && empty(this.props.auth.user)){
				this.setState({ 
					data: this.props.Ratios, 
					QuotesNumber: this.props.QuotesNumber.QuotesNumber, 
					Clients: this.props.Clients.Clients, 
					Turnover: this.props.Turnover.Turnover 
				})
			}
			else if(!empty(this.props.Ratios)  && !empty(this.props.QuotesNumber) && !empty(this.props.Clients) && !empty(this.props.Turnover) && !empty(this.props.auth.user)){
				if(this.props.auth.user.role === 'staff' || this.props.auth.user.role === 'admin'){
					this.setState({
						data: this.props.Ratios, 
						QuotesNumber: this.props.QuotesNumber.QuotesNumber, Clients: this.props.Clients.Clients, 
						Turnover: this.props.Turnover.Turnover,
						role: this.props.auth.user.role,
						writer_auth: true,
					})
				}else{
					this.setState({
						data: this.props.Ratios, 
						QuotesNumber: this.props.QuotesNumber.QuotesNumber, Clients: this.props.Clients.Clients, 
						Turnover: this.props.Turnover.Turnover,
						role: this.props.auth.user.role,
						writer_auth: false,
					})
				}
			}
			else{
				return null
			}
		}else{
			return null;
		}
	}

	

	handleChange = (event, value) => {
		this.setState({ value });
	};

	protectCounter(classes, value){
		if(this.state.writer_auth && (this.state.role === 'admin' || this.state.role === 'staff')){
			return(
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
			)
		}
		else{
			return null;
		}
	}

	render(){
		const { classes } = this.props;
		const { data, QuotesNumber, Clients, Turnover } = this.state;
		const { value } = this.state;


		if(empty(data.TimeEfficiency)){
			data.TimeEfficiency = 0;
		}else if(empty(data.FailRate)){
			data.FailRate = 0;
		}else if(empty(data.TemplateEfficiency)){
			data.TemplateEfficiency = 0;
		}else if(empty(data.FilamantComsumption)){
			data.FilamantComsumption = 0;
		}
		


		const time_data = {
			title: "Time Efficiency",
			val: (Number(data.TimeEfficiency) * 100).toFixed(0) || 0
		}


		const fail_data = {
			title: "Fail Rate",
			val: (Number(data.FailRate) * 100).toFixed(0) || 0
		}

		const Template_data = {
			title: 'Template Efficiency',
			val: (Number(data.TemplateEfficiency) * 100).toFixed(0) || 0
		}

		const Filamant_data = {
			title: 'Filament Comsumption',
			val: Number(data.FilamantComsumption).toFixed(0)  || 0
		}

		const quotes_number = {
			title: 'Quotes Number',
			val: QuotesNumber
		}

		const clients_ = {
			title: 'Clients',
			val: Clients
		}

		const turnover_ = {
			title: 'Turnover',
			val: Turnover
		}

		return(
			<MuiThemeProvider theme={theme}>
			<div className="dash_page">
				<div className="ratios">
					<AppBar className={classes.app_nav}  position="static">
					<Typography variant="h5" className={classes.nav_h}>productive kpi</Typography>
					</AppBar>
					<Card className={classes.CardContainer}>
					
						<CircleChart data={time_data}/>
						<CircleChart data={fail_data}/>
						<CircleChart data={Template_data}/>
						<CircleChart data={Filamant_data}/>

					</Card>
					<AppBar className={classes.app_nav}  position="static">
					<Typography variant="h5" className={classes.nav_h}>economical kpi</Typography>
					</AppBar>
					<Card className={classes.CardContainer}>
						
						<CircleChart data={quotes_number}/>
						<CircleChart data={clients_}/>
						<CircleChart data={turnover_}/>
					</Card>
				</div>

				{this.protectCounter(classes, value)}

			</div>
			</MuiThemeProvider>

			
		)
	}
}

dash_home.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	QuotesNumber: PropTypes.object.isRequired,
	Clients: PropTypes.object.isRequired,
	Turnover: PropTypes.object.isRequired,
	getAllMachineRatio: PropTypes.func.isRequired,
	GetQuotesNumber: PropTypes.func.isRequired,
	GetClients: PropTypes.func.isRequired,
	GetTurnover: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	Ratios: state.Ratios,
	QuotesNumber: state.QuotesNumber,
	Clients: state.Clients,
	Turnover: state.Turnover
})

export default  connect(mapStateToProps, {getAllMachineRatio, GetQuotesNumber, GetClients, GetTurnover})(withStyles(styles)(dash_home));
