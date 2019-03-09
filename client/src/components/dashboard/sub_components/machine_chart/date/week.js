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


class Week extends Component {
constructor(){
    super();
    this.state = {
        week: 0,
        month: 0,
        year: 0,
        
        openWeek: false,
        openMonth: false,
        openYear: false,
    }
}

handleChange = event => {
	this.setState({ [event.target.name]: event.target.value });
};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}
handleCloseWeek = () => {this.setState({ openWeek: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}
handleOpenWeek = () => {this.setState({ openWeek: true })}

render() {
    const { classes } = this.props;
    const { openWeek, openMonth, openYear, week, data, month, year } = this.state;

    /*
    let WeekList = () =>{
            return data.map((row, i) => { return <MenuItem key={i} value={row}>Week {row._id.week}</MenuItem> });
    }
    */


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

                            <MenuItem value={2019}>Year 2019</MenuItem>
                            <MenuItem value={2018}>Year 2018</MenuItem>
                            <MenuItem value={2017}>Year 2017</MenuItem>

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
}

export default withStyles(styles)(Week)