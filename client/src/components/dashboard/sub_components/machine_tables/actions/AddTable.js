import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Input from '@material-ui/core/Input';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import { TableEditRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const styles ={
	div:{
		color: '#ffffff'
	}
}

const getRowId = row => row.id;

class AddTable extends Component{
	
	constructor(){
		super();
		this.state = {
				rows:[
				  { id: 0, printedPart: '', workingHours: '', timeAndDate: '', finishingTime: '', dayNumber: '', failureCoef: '', Remarks: ''  } 
				],
				columns:[
				  { name: 'printedPart', title: 'Printed Part' },
				  { name: 'workingHours', title: 'Working Hours' },
				  { name: 'timeAndDate', title: 'Time and date' },
				  { name: 'finishingTime', title: 'Finishing Time' },
				  { name: 'dayNumber', title: 'Day Number' },
				  { name: 'failureCoef', title: 'Failure Coef'},
				  { name: 'Remarks', title: 'Remarks'}
				]
		}
	}
	
	commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.setState({ rows });
    };
  
	componentDidMount(){
		console.log(this.props);
	}
	
	render(){
		const { classes } = this.props;
		const { rows, columns } = this.state;
		
		return(
		
		<Paper>
			<Grid
			  rows={rows}
			  columns={columns}
			  getRowId={getRowId}
			>
			  <EditingState
				onCommitChanges={this.commitChanges}
				defaultEditingRowIds={[0]}
			  />
			  <Table />
			  <TableHeaderRow />
			  <TableEditRow />
			  <TableEditColumn
				showAddCommand
				showEditCommand
				showDeleteCommand
			  />
			</Grid>
		</Paper>
		
		)
		
	}
	
}


AddTable.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});


export default  connect(mapStateToProps)(withStyles(styles)(AddTable));


