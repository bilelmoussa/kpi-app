import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Chart from '../CHART';
import { connect } from 'react-redux';
import { get_months, get_years } from '../../../../../actions/authentication';

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
});

function empty(data){
	if(typeof(data) == 'number' || typeof(data) == 'boolean')
	{ 
	  return false; 
	}
	if(typeof(data) == 'undefined' || data === null)
	{
	  return true; 
	}
	if(typeof(data.length) != 'undefined')
	{
	  return data.length == 0;
	}
	if(typeof data === "string" &&  ( data === "" || data === null )){
		return true;
	}
	var count = 0;
	for(var i in data)
	{
	  if(data.hasOwnProperty(i))
	  {
		count ++;
	  }
	}
	return count == 0;
  }

class Week extends Component {
constructor(){
    super();
    this.state = {
		years: [],
		months: [],
        week: 0,
        month: 0,
        year: 0,
        openWeek: false,
        openMonth: false,
        openYear: false,
    }
}

componentDidMount(){
	this.props.get_years();
}

static getDerivedStateFromProps(nextProps, prevState){
	if(nextProps.N2!==prevState.N2){
		console.log(nextProps.N2.Years)
		if(empty(nextProps.N2.Years)){
			return { years: [] };
		}
		else{
			console.log("wtf");
			return { years: nextProps.N2.Years, months: nextProps.N2.Months };
		}
	}else { return null };
}		

componentDidUpdate(prevProps, prevState) {
	if(prevProps.N2!==this.props.N2  ){
		if(empty(this.props.N2.Years)){
			this.setState({
				years: [],
			})
		}else if(empty(this.props.N2.Months)){
			this.setState({
				months: [],
			})
		}
		else{
			this.setState({
				years: this.props.N2.Years });
		}
	}else{
		return null;
	}
}

handleChange = event => {
	this.setState({ [event.target.name]: event.target.value });
	if(event.target.name === "year"){
		//this.props.get_months(event.target.value);
	}else if(event.target.name === "month"){
		
	}
};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}
handleCloseWeek = () => {this.setState({ openWeek: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}
handleOpenWeek = () => {this.setState({ openWeek: true })}

render() {
    const { classes } = this.props;
    const { openWeek, openMonth, openYear, week,  month, year, months, years } = this.state;

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
						<InputLabel htmlFor="Week">Week</InputLabel>
						<Select
							open={openWeek}
							onClose={this.handleCloseWeek}
							onOpen={this.handleOpenWeek}
							value={week}
							onChange={this.handleChange}
							inputProps={{
								name: 'week',
								id: 'Week',
							}}
						>

                            <MenuItem value={10}>Week 10</MenuItem>
						    <MenuItem value={11}>Week 11</MenuItem>
						    <MenuItem value={12}>Week 12</MenuItem>        
					    </Select>
					</FormControl>

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
				
        <Chart Target="week" />

	</div>

    )
  }
}

Week.propTypes = {
	classes: PropTypes.object.isRequired,
	get_years: PropTypes.func.isRequired,
	get_months: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	N2: state.N2,
});

export default connect(mapStateToProps, { get_years, get_months })(withStyles(styles)(Week))