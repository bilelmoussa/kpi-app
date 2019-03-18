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
				openYear: false	
    }
}

componentDidMount(){
	const { machine } = this.props;
	if(machine === "N2"){
		this.props.get_n2_years();
	}
	else if(machine === "N2Plus150"){
		this.props.get_n2_plus_150_years();
	}
	else if(machine === "N2Plus50"){
		this.props.get_n2_plus_50_years();
	}

}

static getDerivedStateFromProps(nextProps, prevState){
	const { machine } = nextProps;
	if(machine === "N2"){
		if(nextProps.N2!==prevState.N2){
			if(empty(nextProps.N2.Years)){
				return { years: [] };
			}else if(empty(nextProps.N2.Months) && empty(nextProps.N2.Years)){
				return { months: [], years: [] };
			}
			else if(empty(nextProps.N2.Months) && !empty(nextProps.N2.Years)){
				return { months: [], years: nextProps.N2.Years };
			}		
			else{
				return { years: nextProps.N2.Years, months: nextProps.N2.Months };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus150"){
		if(nextProps.N2_Plus_150!==prevState.N2_Plus_150){
			if(empty(nextProps.N2_Plus_150.Years)){
				return { years: [] };
			}else if(empty(nextProps.N2_Plus_150.Months) && empty(nextProps.N2_Plus_150.Years)){
				return { months: [], years: [] };
			}
			else if(empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years)){
				return { months: [], years: nextProps.N2_Plus_150.Years };
			}		
			else{
				return { years: nextProps.N2_Plus_150.Years, months: nextProps.N2_Plus_150.Months };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus50"){
		if(nextProps.N2_Plus_50!==prevState.N2_Plus_50){
			if(empty(nextProps.N2_Plus_50.Years)){
				return { years: [] };
			}else if(empty(nextProps.N2_Plus_50.Months) && empty(nextProps.N2_Plus_50.Years)){
				return { months: [], years: [] };
			}	
			else if(empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)){
				return { months: [], years: nextProps.N2_Plus_50.Years };
			}		
			else{
				return { years: nextProps.N2_Plus_50.Years, months: nextProps.N2_Plus_50.Months };
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
			}else if(empty(this.props.N2.Months) && empty(this.props.N2.Years)){
				this.setState({
					months: [],
				})
			}
			else if(empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					months: [],
					years: this.props.N2.Years,
				})
			}
			else{
				this.setState({
					years: this.props.N2.Years,
					months: this.props.N2.Months,
				});
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
			}else if(empty(this.props.N2_Plus_150.Months) && empty(this.props.N2_Plus_150.Years)){
				this.setState({
					months: [],
				})
			}
			else if(empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
				this.setState({
					months: [],
					years: this.props.N2_Plus_150.Years,
				})
			}
			else{
				this.setState({
					years: this.props.N2_Plus_150.Years,
					months: this.props.N2_Plus_150.Months,
				});
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
			}else if(empty(this.props.N2_Plus_50.Months) && empty(this.props.N2_Plus_50.Years)){
				this.setState({
					months: [],
				})
			}
			else if(empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					months: [],
					years: this.props.N2_Plus_50.Years,
				})
			}
			else{
				this.setState({
					years: this.props.N2_Plus_50.Years,
					months: this.props.N2_Plus_50.Months,
				});
			}
		}else{
			return null;
		}
	}

}



handleChange = event => {
	const { machine } = this.props;
	this.setState({ [event.target.name]: event.target.value });
	if(machine === "N2"){
		if(event.target.name === "year"){
			this.props.get_n2_months(event.target.value);
		}
	}
	else if(machine === "N2Plus150"){
		if(event.target.name === "year"){
			this.props.get_n2_plus_150_months(event.target.value);
		}
	}
	else if(machine === "N2Plus50"){
		if(event.target.name === "year"){
			this.props.get_n2_plus_50_months(event.target.value);
		}
	}

};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}

render() {
    const { classes } = this.props;
		const { openMonth, openYear,  month, year, months, years } = this.state;
		
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
				
        <CHART Target="Month" />

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
}

const mapStateToProps = (state) => ({
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});


export default connect(mapStateToProps, { get_n2_years, get_n2_months, get_n2_plus_150_years, get_n2_plus_150_months, get_n2_plus_50_years, get_n2_plus_50_months })(withStyles(styles)(Month))
