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
	get_n2_years,
	get_n2_plus_150_years,
	get_n2_plus_50_years,
	N2YearChartData,
	N2Plus150YearChartData,
	N2Plus50YearChartData,
	ClearChartData
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


class Year extends Component {
constructor(){
    super();
    this.state = {
				years: [],
        year: 0,
				openYear: false,
				ChartData: 	[],
    }
}

componentDidMount(){
	const { machine } = this.props;
	if(machine === "N2"){
		this.props.get_n2_years();
		this.props.ClearChartData("N2", "Year");
	}
	else if(machine === "N2Plus150"){
		this.props.get_n2_plus_150_years();
		this.props.ClearChartData("N2Plus150", "Year");
	}
	else if(machine === "N2Plus50"){
		this.props.get_n2_plus_50_years();
		this.props.ClearChartData("N2Plus50", "Year");
	}
	
}

static getDerivedStateFromProps(nextProps, prevState){
	const { machine } = nextProps;
	if(machine === "N2"){
		if(nextProps.N2!==prevState.N2){
			if(empty(nextProps.N2.Years)){
				return { years: [] };
			}			
			else if(!empty(nextProps.N2.Years)){
				return { years: nextProps.N2.Years };
			}	
			else if(!empty(nextProps.N2.Years) && empty(nextProps.N2.YearChartData)){
				return {  years: nextProps.N2.Years, weeks:  nextProps.N2.Weeks, chartData:  [] };
			}	
			else{
				return { years: nextProps.N2.Years,  chartData: nextProps.N2.YearChartData };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus150"){
		if(nextProps.N2_Plus_150!==prevState.N2_Plus_150){
			if(empty(nextProps.N2_Plus_150.Years)){
				return { years: [] };
			}			
			else if(!empty(nextProps.N2_Plus_150.Years)){
				return {  years: nextProps.N2_Plus_150.Years };
			}		
			else if(!empty(nextProps.N2_Plus_150.Years) && empty(nextProps.N2_Plus_150.YearChartData)){
				return { years: nextProps.N2_Plus_150.Years,  chartData:  [] };
			}	
			else{
				return { years: nextProps.N2_Plus_150.Years, chartData: nextProps.N2_Plus_150.YearChartData };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus50"){
		if(nextProps.N2_Plus_50!==prevState.N2_Plus_50){
			if(empty(nextProps.N2_Plus_50.Years)){
				return { years: [] };
			}			
			else if(!empty(nextProps.N2_Plus_50.Years)){
				return { years: nextProps.N2_Plus_50.Years };
			}		
			else if(!empty(nextProps.N2_Plus_50.Years)  && empty(nextProps.N2_Plus_50.YearChartData)){
				return { years: nextProps.N2_Plus_50.Years,  chartData:  [] };
			}	
			else{
				return { years: nextProps.N2_Plus_50.Years, chartData: nextProps.N2_Plus_50.YearChartData };
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
			}
			else if(empty(this.props.N2.YearChartData) &&  !empty(this.props.N2.Years)){
				this.setState({
					years: this.props.N2.Years,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2.Years,
					chartData:  this.props.N2.YearChartData,
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
			}
			else if(empty(this.props.N2_Plus_150.YearChartData) && !empty(this.props.N2_Plus_150.Years)){
				this.setState({
					years: this.props.N2_Plus_150.Years,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2_Plus_150.Years,
					chartData:  this.props.N2_Plus_150.YearChartData,
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
			}
			else if(empty(this.props.N2_Plus_50.YearChartData) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					years: this.props.N2_Plus_50.Years,
					chartData: []
				})
			}else{
				this.setState({
					years: this.props.N2_Plus_50.Years,
					chartData:  this.props.N2_Plus_50.YearChartData,
				})
			}
		
		}else{
			return null;
		}
	}

}

handleChange = event => {
	this.setState({ [event.target.name]: event.target.value });
	const { machine } = this.props;

	this.setState({ [event.target.name]: event.target.value });
	if(machine === "N2"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2", "Year");
			this.props.N2YearChartData(event.target.value)
		}
	}
	else if(machine === "N2Plus150"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2Plus150", "Year");
			this.props.N2Plus150YearChartData(event.target.value)
		}
	}
	else if(machine === "N2Plus50"){
		if(event.target.name === "year"){
			this.props.ClearChartData("N2Plus50", "Year");
			this.props.N2Plus50YearChartData(event.target.value)
		}
	}

}

handleCloseYear = () => {this.setState({ openYear: false })}

handleOpenYear = () => {this.setState({ openYear: true })}


render() {
    const { classes, machine } = this.props;
		const { openYear, year, years, chartData } = this.state;
		
		
    let YearList = () =>{
            return years.map((year, i) => { return <MenuItem key={i} value={year}>Year {year}</MenuItem> });
    }
    


    return (
        <div className={classes.root}>
			<AppBar className={classes.app_nav}  position="static">
				<form autoComplete="off">

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
				
        <CHART machine={machine} ChartData={chartData} Target="Year" />

	</div>

    )
  }
}

Year.propTypes = {
		classes: PropTypes.object.isRequired,
		get_n2_years: PropTypes.func.isRequired,
		get_n2_plus_150_years: PropTypes.func.isRequired,
		get_n2_plus_50_years: PropTypes.func.isRequired,
		N2YearChartData: PropTypes.func.isRequired,
		N2Plus150YearChartData: PropTypes.func.isRequired,
		N2Plus50YearChartData: PropTypes.func.isRequired,
		ClearChartData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});

export default connect(mapStateToProps, { get_n2_years, get_n2_plus_150_years, get_n2_plus_50_years, N2YearChartData, N2Plus150YearChartData,  N2Plus50YearChartData, ClearChartData })(withStyles(styles)(Year))
