import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFixedColumns } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { post_N2 } from '../../../../../actions/authentication';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const styles = theme =>({
	lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
	div:{
		color: '#ffffff'
	},
	dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
})

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);


const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={ onExecute } title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
)}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

function empty(data)
{
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

function validate_cell(data){
	
	if(empty(data.Date)){
		return true;
	}else if(empty(data.printedPart)){
		return true;
	}else if(empty(data.workingHours)){
		return true;
	}else if(empty(data.timeAndDate)){
		return true;
	}else if(empty(data.finishingTime)){
		return true;
	}else if(empty(data.failureCoef)){
		return true;
	}else if(empty(data.actualWh)){
		return true;
	}else if(empty(data.Date)){
		return true;
	}else{
		return false;
	}
	
}

function NOW(date_input) {
	let date = new Date(date_input);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM ' : 'AM ';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return  strTime + " " + ` ${date.getMonth()+1}` + "-" + date.getDate() + "-" + date.getFullYear(); 
}


const Cell = (props) => {
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};

const DateTimeFormatter = ({ value }) => NOW(value);

const DateEditor = ({ value, onValueChange }) => (
	 <TextField
		input={<Input />}
        type="date"
        value={value}
		onChange={event => onValueChange(event.target.value)}
		InputLabelProps={{
          shrink: true,
        }}
      />
)

const DateTime = ({ value, onValueChange }) => (
	 <TextField
		input={<Input />}
        type="datetime-local"
        value={value}
		onChange={event => onValueChange(event.target.value)}
		InputLabelProps={{
          shrink: true,
        }}
      />
)


const DateTypeProvider = props => (
  <DataTypeProvider
    editorComponent={DateEditor}
    {...props}
  />)

const DateTimeTypeProvider = props => (
	<DataTypeProvider
		editorComponent={DateTime}
		formatterComponent={DateTimeFormatter}
		{...props}
	/>)


const getRowId = row => row.id;

class AddTable extends Component{
	
	constructor(){
		super();
		this.state = {
				rows:[
				],
				columns:[
				  { name: 'printedPart', title: 'Printed Part' },
				  { name: 'workingHours', title: 'Working Hours' },
				  { name: 'timeAndDate', title: 'Time and date' },
				  { name: 'finishingTime', title: 'Finishing Time', dataType: 'datetime-local' },
				  { name: 'dayNumber', title: 'Day Number' },
				  { name: 'failureCoef', title: 'Failure Coef'},
				  { name : 'actualWh', title: 'Actual Wh' },
				  { name: 'Remarks', title: 'Remarks'},
				  { name: 'Date', title: 'Date', dataType:'date'}
				],
				tableColumnExtensions:[
					{ columnName: 'printedPart', width: 180},
					{ columnName: 'workingHours', width: 180},
					{ columnName: 'timeAndDate', width: 250},
					{ columnName: 'finishingTime', width: 250},
					{ columnName: 'dayNumber', width: 180},
					{ columnName: 'failureCoef', width: 180},
					{ columnName: 'actualWh', width: 180},
					{ columnName: 'Remarks', width: 180},
					{ columnName: 'Date', width: 180},
				],
				dateColumns: ['Date'],
				dateTimeColumns: ['timeAndDate','finishingTime'],
				editingRowIds: [],
				addedRows: [],
				rowChanges: {},
				deletingRows: [],
				empty_row: [],
				columnOrder: ['printedPart','workingHours','timeAndDate', 'finishingTime', 'dayNumber', 'failureCoef', 'actualWh', 'Remarks', 'Date'],
				leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
		};

		const getStateDeletingRows = () => {
			const { deletingRows } = this.state;
			return deletingRows;
		};

		const getStateRows = () => {
			const { rows } = this.state;
			return rows;
		};
	

		
		this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

		this.changeAddedRows = addedRows => this.setState({
				addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
				printedPart: '',
				workingHours: '',
				timeAndDate: '',
				finishingTime: '',
				dayNumber: '',
				failureCoef: '',
				actualWh: '',
				Remarks: '',
				Date: '',
			})),
		});

		this.changeRowChanges = rowChanges => this.setState({ rowChanges });

		this.commitChanges = ({ added, changed, deleted }) => {
			let { rows } = this.state;
			
			if (added) {
			const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;	
				let data = added[0];
				if(validate_cell(data)){
					this.setState({empty_row: Object.values(data)});
					this.changeAddedRows(added);
				}else{
					console.log(this.props.machine)
					console.log(data);
					this.props.post_N2(data);
				}
				rows = [
					...rows,
					...added.map((row, index) => ({
					id: startingAddedId + index,
					...row,
					}))
					];
					
				
			}
			if (changed) {
				rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
			}
			
			this.setState({ rows, deletingRows: deleted || getStateDeletingRows() });
		};

		this.cancelDelete = () => this.setState({ deletingRows: [] });
		this.exitDialog = () => this.setState({ empty_row : [] });
		
		this.deleteRows = () => {
			const rows = getStateRows().slice();
			getStateDeletingRows().forEach((rowId) => {
				const index = rows.findIndex(row => row.id === rowId);
				if (index > -1) {
					rows.splice(index, 1);
				}
			});
			this.setState({ rows, deletingRows: [] });
		};
		
	}
	
	



  
	componentDidMount(){
	}
	
	render(){
		const { classes } = this.props;
		const { 
			rows,
			columns,
			tableColumnExtensions,
			editingRowIds,
			addedRows,
			rowChanges,
			deletingRows,
			leftFixedColumns,
			empty_row,
			dateColumns,
			dateTimeColumns
		} = this.state;
		return(

		<Paper>
			<Grid
			  rows={rows}
			  columns={columns}
			  getRowId={getRowId}
			>
			
			<EditingState
					 editingRowIds={editingRowIds}
					 onEditingRowIdsChange={this.changeEditingRowIds}
					 rowChanges={rowChanges}
					 onRowChangesChange={this.changeRowChanges}
					 addedRows={addedRows}
					 onAddedRowsChange={this.changeAddedRows}
					 onCommitChanges={this.commitChanges}
			/>
			<DateTypeProvider
            for={dateColumns}
			/>
			<DateTimeTypeProvider
            for={dateTimeColumns}
			/>
			<Table
			style={{paddingBottom: 15}}
			columnExtensions={tableColumnExtensions} 
			cellComponent={Cell}/>
			
			<TableHeaderRow />
			
			<TableEditRow cellComponent={EditCell}/>
			
			<TableEditColumn
            width={150}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
			/>
			
			<TableFixedColumns
            leftColumns={leftFixedColumns}
			/>
			
			</Grid>
			<Dialog
          open={!!deletingRows.length}
          onClose={this.cancelDelete}
          classes={{ paper: classes.dialog }}
		>
          <DialogTitle>
            Delete Row
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the following row?
            </DialogContentText>
            <Paper>
              <Grid
                rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                columns={columns}
              >
                <Table
                  cellComponent={Cell}
				  columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteRows} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
		
		
		<Dialog
          open={!!empty_row.length}
          onClose={this.exitDialog}
          classes={{ paper: classes.dialog }}
		>
          <DialogTitle>
		   Some field are Empty
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
				Please fill all fields !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.exitDialog} color="secondary" >
              Exit
            </Button>
          </DialogActions>
        </Dialog>
		
		</Paper>
		
		)
		
	}
	
}


AddTable.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	post_N2: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});


export default  connect(mapStateToProps, { post_N2 } )(withStyles(styles)(AddTable));


