import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empty } from '../../../../../is-empty'
import { EditingState, IntegratedSorting, SortingState } from '@devexpress/dx-react-grid';
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
import { N2WeekTableData, N2Plus150WeekTableData, N2Plus50WeekTableData,  put_N2, put_N2_plus_150, put_N2_plus_50, delete_N2 , delete_N2_plus_150, delete_N2_plus_50, ClearTableData } from '../../../../../actions/authentication';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { isChanged, isObEmpty } from '../../../../../is-empty';
import NumberFormat from 'react-number-format';
import  SelectAppBar  from './SelectAppBar';

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



function validate_cell(data){
	
	if(empty(data.printedPart) || empty(data.workingHours) || empty(data.timeAndDate) ||  empty(data.finishingTime)  ||  empty(data.failureCoef) ||  empty(data.actualWh)){
		return true 
	}else{
		return false;
	}
	
}

function time_to_numb(value){
		let hours = Number(value.replace(/(\d{2}):(\d{2})/, '$1'));
		let before_col = value.replace(/(\d{2}):(\d{2})/, '$2');
		let minutes = Number(before_col)/60;
		let new_time =  hours + minutes;
		return new_time;
}



const Cell = (props) => {
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};





const DateTimeFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$1/$2/$3  $4:$5');


const TimeFormatter = ({ value }) =>{
	return value;	
};

const Time = ({ value, onValueChange }) => (
<NumberFormat
	customInput={TextField}
	format="##:##" 
	placeholder="--:--" 
	mask={['-', '-', '-', '-']}
	value={value}
	onChange={event => onValueChange(event.target.value)}
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




const DateTimeTypeProvider = props => (
	<DataTypeProvider
		editorComponent={DateTime}
		formatterComponent={DateTimeFormatter}
		{...props}
	/>)


const TimeProvider = props =>(
	  <DataTypeProvider
			editorComponent={Time}
			formatterComponent={TimeFormatter}	
			{...props}
	/>
)


const getRowId = row => row.id;

class ViewTable extends Component{
	
	constructor(){
		super();
		this.state = {
				week: 0,
  			month: 0,
  			year: 0,
				data: [],
				rows:[],
				smallTableColumns: [
					{ name: 'Efficiency', title: 'Efficiency %' },
					{ name: 'FailRate', title: 'Fail Rate' },
					{ name: 'PlanningEfficiency', title: 'Planning Efficiency %' },
					{ name: 'AvgPrinting', title: 'Average Printing Hours Per Day' },
				],
				smallTableColumnsOrder: ['Efficiency', 'FailRate', 'PlanningEfficiency', 'AvgPrinting'],
				columns:[
				  { name: 'printedPart', title: 'Printed Part' },
				  { name: 'workingHours', title: 'Working Hours' },
				  { name: 'timeAndDate', title: 'Time and date' },
				  { name: 'finishingTime', title: 'Finishing Time', dataType: 'datetime-local' },
				  { name: 'failureCoef', title: 'Failure Coef'},
				  { name : 'actualWh', title: 'Actual Wh' },
				  { name: 'Remarks', title: 'Remarks'},
				],
				tableColumnExtensions:[
					{ columnName: 'printedPart', width: 180},
					{ columnName: 'workingHours', width: 180},
					{ columnName: 'timeAndDate', width: 250},
					{ columnName: 'finishingTime', width: 250},
					{ columnName: 'failureCoef', width: 180},
					{ columnName: 'actualWh', width: 180},
					{ columnName: 'Remarks', width: 180},
				],
				defaultSorting: [{ columnName: 'timeAndDate', direction: 'asc' }],
				sortingStateColumnExtensions: [
				{ columnName: 'timeAndDate', sortingEnabled: false },
				],
				dateTimeColumns: ['timeAndDate','finishingTime'],
				TimeColumns: ['workingHours', 'actualWh'],
				editingRowIds: [],
				addedRows: [],
				rowChanges: {},
				deletingRows: [],
				empty_row: [],
				columnOrder: ['printedPart','workingHours','timeAndDate', 'finishingTime', 'failureCoef', 'actualWh', 'Remarks'],
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
	
		
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
 
	
		this.changeAddedRows = addedRows => this.setState({
				addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
				printedPart: '',
				workingHours: "00:00",
				timeAndDate: '',
				finishingTime: '',
				failureCoef: '',
				actualWh: "00:00",
				Remarks: '',
			})),
		});

		this.changeRowChanges = rowChanges => this.setState({ rowChanges });

		this.commitChanges = ({ added, changed, deleted }) => {
			let { rows, year, month, week } = this.state;
			const { machine } = this.props;
			
			if (changed) {
				let old_rows = rows;
				let keys = Object.keys(changed);
				let row_id; 
				for (const key of keys) {
					row_id = key;
				}
				
				
				if(!isChanged(changed)){

					rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
					
					const vale = {
						printedPart: rows[row_id].printedPart,
						workingHours: time_to_numb(rows[row_id].workingHours),
						timeAndDate: rows[row_id].timeAndDate,
						finishingTime: rows[row_id].finishingTime,
						failureCoef: rows[row_id].failureCoef,
						actualWh: time_to_numb(rows[row_id].actualWh),
						Remarks: rows[row_id].Remarks,
						_id: rows[row_id]._id,
					};
					
					if(isObEmpty(changed[row_id])){
						let query = Object.keys(changed[row_id]);
						for(let i = 0; i < query.length; i++){
							if(query[i] === "Remarks"){
							}else{
								rows[row_id][query[i]] = old_rows[row_id][query[i]];
							}
						}
						this.setState({empty_row: Object.values(changed)});
					}else if(validate_cell(rows[row_id])){
						this.setState({empty_row: Object.values(changed)});
					}else if(!/(\d{2}):(\d{2})/.test(String(rows[row_id].workingHours)) || !/(\d{2}):(\d{2})/.test(String(rows[row_id].actualWh))){
						this.setState({empty_row: Object.values(changed)});
					}
					else{
						
						let keys = Object.keys(changed[row_id]);
						let chnged_val = [];
						for(let i = 0; i < keys.length; i++){
							 chnged_val.push([keys[i], vale[keys[i]]]);	
						}
						
						let json =  chnged_val.reduce(function(p, c) {
									 p[c[0]] = c[1];
									 return p;}, {});
									 
						let query = {id: {_id: vale._id}, query: json};
						
						if(machine === "N2"){
							this.props.put_N2(query);
							this.props.N2WeekTableData(year, month, week);
						}else if(machine === "N2_plus_150"){
							this.props.put_N2_plus_150(query);
							this.props.N2Plus150WeekTableData(year, month, week);
						}else if(machine === "N2_plus_50"){
							this.props.put_N2_plus_50(query);
							this.props.N2Plus50WeekTableData(year, month, week);
						}
						
						rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
					}
					
				}else if(validate_cell(rows[row_id])){
					this.setState({empty_row: Object.values(changed)});
				}
				
			}
			
			this.setState({ rows, deletingRows: deleted || getStateDeletingRows() });
		};

		this.cancelDelete = () => this.setState({ deletingRows: [] });
		this.exitDialog = () => this.setState({ empty_row : [] });
		
		this.deleteRows = () => {
			const rows = getStateRows().slice();
			const {year, month, week } = this.state;
			getStateDeletingRows().forEach((rowId) => {
				let index = rows.findIndex(row => row.id === rowId);
				let query = {_id: rows[index]._id };
				if(this.props.machine === "N2"){
					this.props.delete_N2(query);
					this.props.N2WeekTableData(year, month, week);
				}else if(this.props.machine === "N2_plus_150"){
					this.props.delete_N2_plus_150(query);
					this.props.N2Plus150WeekTableData(year, month, week);
				}else if(this.props.machine === "N2_plus_50"){
					this.props.delete_N2_plus_50(query);
					this.props.N2Plus50WeekTableData(year, month, week);
				}
				if (index > -1) {
					rows.splice(index, 1);
				}
			});
			this.setState({ rows, deletingRows: [] });
		};
		
	}
	
	componentDidMount(){
		const { machine } = this.props;
		
		if(machine === "N2"){
			this.props.ClearTableData("N2");
		}else if(machine === "N2_plus_150"){
			this.props.ClearTableData("N2Plus150");
		}else if(machine === "N2_plus_50"){
			this.props.ClearTableData("N2Plus50");
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){		
		const { machine } = nextProps;
		if(machine === "N2"){
			if(nextProps.N2!==prevState.N2){
				if(empty(nextProps.N2.WeekTableData)){
					return { data: [], rows:[], year: 0, month: 0, week: 0 };
				}else{
				return { data: nextProps.N2.WeekTableData, rows: nextProps.N2.WeekTableData[0].rows, year: nextProps.N2.WeekTableData[0]._id.year, month: nextProps.N2.WeekTableData[0]._id.month, week: nextProps.N2.WeekTableData[0]._id.week  };
				}
			}else { return null };
		}else if(machine === "N2_plus_150"){
			if(nextProps.N2_Plus_150!==prevState.N2_Plus_150 ){
				if(empty(nextProps.N2_Plus_150.WeekTableData)){
					return { data: [], rows:[], year: 0, month: 0, week: 0 };
				}else{
					return { data: nextProps.N2_Plus_150.WeekTableData, rows: nextProps.N2_Plus_150.WeekTableData[0].rows, year: nextProps.N2_Plus_150.WeekTableData[0]._id.year, month: nextProps.N2_Plus_150.WeekTableData[0]._id.month, week: nextProps.N2_Plus_150.WeekTableData[0]._id.week };
				}
			}else { return null };
		}else if(machine === "N2_plus_50"){
			if(nextProps.N2_Plus_50!==prevState.N2_Plus_50 ){
				if(empty(nextProps.N2_Plus_50.WeekTableData)){
					return { data: [], rows:[], year: 0, month: 0, week: 0 };
				}else{
					return { data: nextProps.N2_Plus_50.WeekTableData,  rows: nextProps.N2_Plus_50.WeekTableData[0].rows, year: nextProps.N2_Plus_50.WeekTableData[0]._id.year, month: nextProps.N2_Plus_50.WeekTableData[0]._id.month, week: nextProps.N2_Plus_50.WeekTableData[0]._id.week  };
				}
			}else { return null };
		}
	};
	
    
	componentDidUpdate(prevProps, prevState) {
		const { machine } = this.props;
		
		if(machine === "N2"){
			if(prevProps.N2!==this.props.N2  ){
				if(empty(this.props.N2.WeekTableData)){
					this.setState({
						data: [],
						rows: [],
						year: 0,
						month: 0,
						week: 0
					})
				}else{
					this.setState({
						data: this.props.N2.WeekTableData,
						rows: this.props.N2.WeekTableData[0].rows,
						year: this.props.N2.WeekTableData[0]._id.year,
						month: this.props.N2.WeekTableData[0]._id.month,
						week: this.props.N2.WeekTableData[0]._id.week,
					});
				}
			}else{
				return null;
			}
		}else if(machine === "N2_plus_150"){
			if(prevProps.N2_Plus_150!==this.props.N2_Plus_150){
				if(empty(this.props.N2_Plus_150.WeekTableData)){
					this.setState({
						rows: [],
						data: [],
						year: 0,
						month: 0,
						week: 0
					})
				}else{
					this.setState({
						data: this.props.N2_Plus_150.WeekTableData,
						rows: this.props.N2_Plus_150.WeekTableData[0].rows,
						year: this.props.N2_Plus_150.WeekTableData[0]._id.year,
						month: this.props.N2_Plus_150.WeekTableData[0]._id.month,
						week: this.props.N2_Plus_150.WeekTableData[0]._id.week,
					});
				}
			}else{
				return null;
			}
		}else if(machine === "N2_plus_50"){
			if(prevProps.N2_Plus_50!==this.props.N2_Plus_50){
				if(empty(this.props.N2_Plus_50.WeekTableData)){
					this.setState({
						rows: [],
						data: [],
						year: 0,
						month: 0,
						week: 0
					})
				}else{
					this.setState({
						data: this.props.N2_Plus_50.WeekTableData,
						rows: this.props.N2_Plus_50.WeekTableData[0].rows,
						year: this.props.N2_Plus_50.WeekTableData[0]._id.year,
						month: this.props.N2_Plus_50.WeekTableData[0]._id.month,
						week: this.props.N2_Plus_50.WeekTableData[0]._id.week,
					});
				}
			}else{
				return null;
			}
		}
	}
  

	
	render(){
		const { classes, machine } = this.props;
		const {
			data, 
			rows,
			columns,
			tableColumnExtensions,
			editingRowIds,
			defaultSorting,
			rowChanges,
			addedRows,
			deletingRows,
			leftFixedColumns,
			empty_row,
			dateTimeColumns,
			sortingStateColumnExtensions,
			TimeColumns,
			smallTableColumns,
		} = this.state;

		const small_table = [
		{
			Efficiency: empty(data) ? "" : data[0].Efficiency * 100,
			FailRate: empty(data) ? "" : data[0].FailRate * 100,
			PlanningEfficiency: empty(data) ? "" : data[0].PlanningEfficiency * 100,
			AvgPrinting: empty(data) ? "" : data[0].AvgPrinting,
		}
	]


		return(
		<div>
		<SelectAppBar machine={machine}/>
		<Paper>
			<Grid
			  rows={rows}
			  columns={columns}
			  getRowId={getRowId}
			>
	
			<SortingState
				defaultSorting={defaultSorting}
				onSortingChange={this.changeSorting}
				columnExtensions={sortingStateColumnExtensions}
			/>
			
			<EditingState
					editingRowIds={editingRowIds}
					onEditingRowIdsChange={this.changeEditingRowIds}
					rowChanges={rowChanges}
					onRowChangesChange={this.changeRowChanges}
					addedRows={addedRows}
					onAddedRowsChange={this.changeAddedRows}
					onCommitChanges={this.commitChanges}
			/>
			
			<IntegratedSorting />
			
			<TimeProvider 
				for={TimeColumns}
			/>
			
			<DateTimeTypeProvider
				for={dateTimeColumns}
			/>
			
			<Table
			style={{paddingBottom: 15}}
			columnExtensions={tableColumnExtensions} 
			cellComponent={Cell}/>
			
			<TableHeaderRow  showSortingControls />
	
			<TableEditRow cellComponent={EditCell}/>
			
			
			<TableEditColumn
            width={150}
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
			  
					<TimeProvider 
						for={TimeColumns}
					/>
					
					<DateTimeTypeProvider
						for={dateTimeColumns}
					/>
				
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

		<Grid
		rows={small_table}
		columns={smallTableColumns}
		>
			<Table
			style={{paddingBottom: 15}}
			/>
			<TableHeaderRow />
		</Grid>
		</Paper>
		</div>	
		)
		
	}
	
}


ViewTable.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	put_N2: PropTypes.func.isRequired,
	put_N2_plus_150: PropTypes.func.isRequired,
	put_N2_plus_50: PropTypes.func.isRequired,
	N2WeekTableData: PropTypes.func.isRequired,
	delete_N2: PropTypes.func.isRequired,
	N2Plus150WeekTableData: PropTypes.func.isRequired,
	N2Plus50WeekTableData: PropTypes.func.isRequired,
	ClearTableData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});


export default  connect(mapStateToProps, { put_N2, put_N2_plus_150, put_N2_plus_50, delete_N2, delete_N2_plus_150, delete_N2_plus_50, N2WeekTableData, N2Plus150WeekTableData, N2Plus50WeekTableData, ClearTableData } )(withStyles(styles)(ViewTable));


