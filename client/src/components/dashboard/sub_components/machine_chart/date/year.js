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


class Year extends Component {
constructor(){
    super();
    this.state = {
        year: 0,
        openYear: false,
    }
}

handleChange = event => {
	this.setState({ [event.target.name]: event.target.value });
};

handleCloseYear = () => {this.setState({ openYear: false })}

handleOpenYear = () => {this.setState({ openYear: true })}


render() {
    const { classes } = this.props;
    const { openYear,  data,  year } = this.state;

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
				
        <Chart Target="Year" />

	</div>

    )
  }
}

Year.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Year)
