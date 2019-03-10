import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Chart from '../CHART';

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
        openMonth: false,
				openYear: false	
    }
}



handleChange = event => {
	this.setState({ [event.target.name]: event.target.value });
	if(event.target.name === "year"){
		
	}else if(event.target.name === "month"){
		
	}
};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}

render() {
    const { classes } = this.props;
    const { openMonth, openYear,  month, year } = this.state;
	/*
		let YearList = () =>{
			return years.map((year, i) => { return <MenuItem key={i} value={year}>Year {year}</MenuItem> });
		}

		let MonthList = () =>{
			return months.map((month, i) => { return <MenuItem key={i} value={month}>Month {month}</MenuItem> })
		}
*/
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
							<MenuItem value={10}>Month 10</MenuItem>
							<MenuItem value={11}>Month 11</MenuItem>
							<MenuItem value={12}>Month 12</MenuItem>

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
							<MenuItem value={10}>Year 10</MenuItem>
							<MenuItem value={11}>Year 11</MenuItem>
							<MenuItem value={12}>Year 12</MenuItem>

						</Select>
					</FormControl>

      	  </form>
				</AppBar>
				
        <Chart Target="Month" />

	</div>

    )
  }
}

Month.propTypes = {
		classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(Month)
