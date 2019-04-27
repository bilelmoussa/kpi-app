import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CHART from '../CHART';
import { connect } from 'react-redux';
import { 
	get_n2_months,
	get_n2_years,
	get_n2_plus_150_years,
	get_n2_plus_150_months,
	get_n2_plus_50_years,
	get_n2_plus_50_months,
	N2MonthChartData,
	N2Plus150MonthChartData,
	N2Plus50MonthChartData,
	ClearChartData,
	ClearSelectMonths
 } from '../../../../../actions/authentication';
import { empty } from '../../../../../is-empty';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		flexDirection: "row",	
	},
  button: {
    margin: theme.spacing.unit,
	},
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },	
})



class Month extends Component {
constructor(){
    super();
    this.state = {
				month: 0,
				year: 0,
				months: [],
				years : [],
        openMonth: false,
				openYear: false,
				ChartData: 	[],
    }
}

componentDidMount(){
	const { machine } = this.props;
	if(machine === "N2"){
		this.props.get_n2_years();
		this.props.ClearChartData("N2", "Month");
	}
	else if(machine === "N2Plus150"){
		this.props.get_n2_plus_150_years();
		this.props.ClearChartData("N2Plus150", "Month");
	}
	else if(machine === "N2Plus50"){
		this.props.get_n2_plus_50_years();
		this.props.ClearChartData("N2Plus50", "Month");
	}

}

static getDerivedStateFromProps(nextProps, prevState){
	const { machine } = nextProps;
	if(machine === "N2"){
		if(nextProps.N2!==prevState.N2){
			if(empty(nextProps.N2.Years)){
				return { years: [] };
			}			
			else if(empty(nextProps.N2.Months) && !empty(nextProps.N2.Years)){
				return { months: [], years: nextProps.N2.Years };
			}	
			else if(!empty(nextProps.N2.Months) && !empty(nextProps.N2.Years)){
				return { months: nextProps.N2.Months, years: nextProps.N2.Years };
			}	
			else if(!empty(nextProps.N2.Months) && !empty(nextProps.N2.Years) && empty(nextProps.N2.MonthChartData)){
				return { months: nextProps.N2.Months, years: nextProps.N2.Years,  chartData:  [] };
			}	
			else{
				return { years: nextProps.N2.Years, months: nextProps.N2.Months,  chartData: nextProps.N2.MonthChartData };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus150"){
		if(nextProps.N2_Plus_150!==prevState.N2_Plus_150){
			if(empty(nextProps.N2_Plus_150.Years)){
				return { years: [] };
			}			
			else if(empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years)){
				return { months: [], years: nextProps.N2_Plus_150.Years };
			}	
			else if(!empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years)){
				return { months: nextProps.N2_Plus_150.Months, years: nextProps.N2_Plus_150.Years };
			}	
			else if(!empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years) && empty(nextProps.N2_Plus_150.MonthChartData)){
				return { months: nextProps.N2_Plus_150.Months, years: nextProps.N2_Plus_150.Years,  chartData:  [] };
			}	
			else{
				return { years: nextProps.N2_Plus_150.Years, months: nextProps.N2_Plus_150.Months, chartData: nextProps.N2_Plus_150.MonthChartData };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus50"){
		if(nextProps.N2_Plus_50!==prevState.N2_Plus_50){
			if(empty(nextProps.N2_Plus_50.Years)){
				return { years: [] };
			}			
			else if(empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)){
				return { months: [], years: nextProps.N2_Plus_50.Years };
			}	
			else if(!empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)){
				return { months: nextProps.N2_Plus_50.Months, years: nextProps.N2_Plus_50.Years };
			}		
			else if(!empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)  && empty(nextProps.N2_Plus_50.MonthChartData)){
				return { months: nextProps.N2_Plus_50.Months, years: nextProps.N2_Plus_50.Years,  chartData:  [] };
			}	
			else{
				return { years: nextProps.N2_Plus_50.Years, months: nextProps.N2_Plus_50.Months,  chartData: nextProps.N2_Plus_50.MonthChartData };
			}
			
		}else { return null };

	}else{
		return null;
	}
}		

componentDidUpdate(prevProps, prevState) {
	const { machine } = this.props;
	if(machine === "N2"){
		if(prevProps.N2!==this.props.N2){
			if(empty(this.props.N2.Years)){
				this.setState({
					years: [],
				})
			}else if(empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					months: [],
					years: this.props.N2.Years,
				})
			}
			else if(empty(this.props.N2.MonthChartData) && !empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					years: this.props.N2.Years,
					months: this.props.N2.Months,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2.Years,
					months: this.props.N2.Months,
					chartData:  this.props.N2.MonthChartData,
				})
			}
		}else{
			return null;
		}
	}
	else if(machine === "N2Plus150"){
		if(prevProps.N2_Plus_150!==this.props.N2_Plus_150){
			if(empty(this.props.N2_Plus_150.Years)){
				this.setState({
					years: [],
				})
			}else if(empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
				this.setState({
					months: [],
					years: this.props.N2_Plus_150.Years,
				})
			}
			else if(empty(this.props.N2_Plus_150.MonthChartData) && !empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
				this.setState({
					years: this.props.N2_Plus_150.Years,
					months: this.props.N2_Plus_150.Months,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2_Plus_150.Years,
					months: this.props.N2_Plus_150.Months,
					chartData:  this.props.N2_Plus_150.MonthChartData,
				})
			}
		
		}else{
			return null;
		}
	}
	else if(machine === "N2Plus50"){
		if(prevProps.N2_Plus_50!==this.props.N2_Plus_50){
			if(empty(this.props.N2_Plus_50.Years)){
				this.setState({
					years: [],
				})
			}else if(empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					months: [],
					years: this.props.N2_Plus_50.Years,
				})
			}
			else if(empty(this.props.N2_Plus_50.MonthChartData) && !empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					years: this.props.N2_Plus_50.Years,
					months: this.props.N2_Plus_50.Months,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2_Plus_50.Years,
					months: this.props.N2_Plus_50.Months,
					chartData:  this.props.N2_Plus_50.MonthChartData,
				})
			}
		}else{
			return null;
		}
	}

}



handleChange = event => {
	const { machine } = this.props;
	const { year } = this.state;

	this.setState({ [event.target.name]: event.target.value });
	if(machine === "N2"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2", "Month");
			this.props.ClearSelectMonths("N2");
			this.setState({month: 0, chartData: []});
			this.props.get_n2_months(event.target.value);
		}else if(event.target.name === "month"){
			this.props.ClearChartData("N2", "Month");
			this.props.N2MonthChartData(year, event.target.value)
		}
	}
	else if(machine === "N2Plus150"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2Plus150", "Month");
			this.props.ClearSelectMonths("N2Plus150");
			this.setState({month: 0, chartData: []});
			this.props.get_n2_plus_150_months(event.target.value);
		}
		else if(event.target.name === "month"){
			this.props.ClearChartData("N2Plus150", "Month");
			this.props.N2Plus150MonthChartData(year, event.target.value)		}
	}
	else if(machine === "N2Plus50"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2Plus50", "Month");
			this.props.ClearSelectMonths("N2Plus50");
			this.setState({ month: 0, chartData: []});
			this.props.get_n2_plus_50_months(event.target.value);
		}
		else if(event.target.name === "month"){
			this.props.ClearChartData("N2Plus50", "Month");
			this.props.N2Plus50MonthChartData(year, event.target.value)		
		}
	}

};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}

render() {
    const { classes, machine } = this.props;
		const { openMonth, openYear,  month, year, months, years, chartData } = this.state;
		let YearList = () =>{
			return years.map((year, i) => { return <MenuItem key={i} value={year}>Year {year}</MenuItem> });
		}

		let MonthList = () =>{
			return months.map((month, i) => { return <MenuItem key={i} value={month}>Month {month}</MenuItem> })
		}

    return (
    <div className={classes.root}>
			<AppBar className={classes.app_nav}  position="static">
				<form autoComplete="off">

					<FormControl className={classes.formControl} >
						<InputLabel htmlFor="Month">Month</InputLabel>
						<Select
							open={openMonth}
							onClose={this.handleCloseMonth}
							onOpen={this.handleOpenMonth}
							value={month}
							onChange={this.handleChange}
							inputProps={{
								name: 'month',
								id: 'Month',
							}}
						>
							{MonthList()}

						</Select>
					</FormControl>

					<FormControl className={classes.formControl} >
						<InputLabel htmlFor="Year">Year</InputLabel>
						<Select
							open={openYear}
							onClose={this.handleCloseYear}
							onOpen={this.handleOpenYear}
							value={year}
							onChange={this.handleChange}
							inputProps={{
								name: 'year',
								id: 'Year',
							}}
						>
						{YearList()}

						</Select>
					</FormControl>

      	  </form>
				</AppBar>
				
        <CHART machine={machine} ChartData={chartData}  Target="Month" />

	</div>

    )
  }
}

Month.propTypes = {
		classes: PropTypes.object.isRequired,
		get_n2_years: PropTypes.func.isRequired,
		get_n2_months: PropTypes.func.isRequired,
		get_n2_plus_150_years: PropTypes.func.isRequired,
		get_n2_plus_150_months: PropTypes.func.isRequired,
		get_n2_plus_50_years: PropTypes.func.isRequired,
		get_n2_plus_50_months: PropTypes.func.isRequired,
		N2MonthChartData: PropTypes.func.isRequired,
		N2Plus150MonthChartData: PropTypes.func.isRequired,
		N2Plus50MonthChartData: PropTypes.func.isRequired,
		ClearChartData: PropTypes.func.isRequired,
		ClearSelectMonths: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});


export default connect(mapStateToProps, { get_n2_years, get_n2_months, get_n2_plus_150_years, get_n2_plus_150_months, get_n2_plus_50_years, get_n2_plus_50_months,  N2MonthChartData, N2Plus150MonthChartData, N2Plus50MonthChartData, ClearChartData, ClearSelectMonths })(withStyles(styles)(Month))
