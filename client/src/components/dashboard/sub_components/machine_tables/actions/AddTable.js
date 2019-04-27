import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empty } from '../../../../../is-empty'
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
import { post_N2, put_N2, post_N2_plus_150, post_N2_plus_50, put_N2_plus_150, put_N2_plus_50, delete_N2, delete_N2_plus_150, delete_N2_plus_50 } from '../../../../../actions/authentication';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { isChanged, isObEmpty } from '../../../../../is-empty';
import { ObjectId } from '../../../../../ObjectID';
import { get_dateTime_format } from '../../../../../date_validation'
import NumberFormat from 'react-number-format';

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



function validate_cell(data){
	
	if(empty(data.printedPart) || empty(data.workingHours) || empty(data.timeAndDate) ||  empty(data.finishingTime) || empty(data.failureCoef) ||  empty(data.actualWh)  ||  empty(data.weight) ||  empty(data.template)){
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

const DateTimeFormatter = ({ value }) => get_dateTime_format(value);


const TimeFormatter = ({ value }) =>{ 
		return value;
};


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




const TimeProvider = props =>(
	  <DataTypeProvider
			editorComponent={Time}
			formatterComponent={TimeFormatter}	
			{...props}
	/>
)



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
				  { name: 'workingHours', title: 'Working Hours', dataType: 'number'},
				  { name: 'timeAndDate', title: 'Time and date',  dataType: 'datetime-local' },
				  { name: 'finishingTime', title: 'Finishing Time', dataType: 'datetime-local' },
				  { name: 'failureCoef', title: 'Failure Coef'},
					{ name : 'actualWh', title: 'Actual Wh', dataType: 'number'},
<<<<<<< HEAD
					{ name : 'weight', title: 'Weight (g)' },
					{ name: 'template', title: 'Standard Template' },
=======
					{ name : 'weight', title: 'Weight' },
					{ name: 'template', title: 'Template' },
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
				  { name: 'Remarks', title: 'Remarks'},
				],
				tableColumnExtensions:[
					{ columnName: 'printedPart', width: 180},
					{ columnName: 'workingHours', width: 180},
					{ columnName: 'timeAndDate', width: 250},
					{ columnName: 'finishingTime', width: 250},
					{ columnName: 'failureCoef', width: 180},
					{ columnName: 'actualWh', width: 180},
					{ columnName: 'weight', width: 180 },
					{ columnName: 'template', width: 180 },
					{ columnName: 'Remarks', width: 180},
				],
				dateTimeColumns: ['timeAndDate','finishingTime'],
<<<<<<< HEAD
				TimeColumns: ['workingHours', "actualWh", "template"],
=======
				TimeColumns: ['workingHours', "actualWh"],
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
				editingRowIds: [],
				addedRows: [],
				rowChanges: {},
				deletingRows: [],
				empty_row: [],
				columnOrder: ['printedPart','workingHours','timeAndDate', 'finishingTime', 'failureCoef', 'actualWh','weight', 'template', 'Remarks'],
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

		this.changeAddedRows = addedrow =>{
			let default_row = addedrow.map(row => (Object.keys(row).length ? row : {
					printedPart: '',
					workingHours: '--:--',
					timeAndDate: '',
					finishingTime: '',
					failureCoef: '',
					actualWh: '--:--',
					weight: '',
<<<<<<< HEAD
					template: '--:--',
=======
					template: '',
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
					Remarks: '',
				}));
			this.setState({ addedRows: default_row });
		};

		this.changeRowChanges = rowChanges => this.setState({ rowChanges });

		this.commitChanges = ({ added, changed, deleted }) => {
			let { rows } = this.state;
			const { machine } = this.props;
			
			if (added) {
				const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
				const clientId = ObjectId();
				
				let part_data = {
						printedPart: added[0].printedPart,
						workingHours: time_to_numb(added[0].workingHours),
						timeAndDate: added[0].timeAndDate,
						finishingTime: added[0].finishingTime,
						failureCoef: added[0].failureCoef,
						actualWh: time_to_numb(added[0].actualWh),
						weight: added[0].weight,
<<<<<<< HEAD
						template: time_to_numb(added[0].template),
=======
						template: added[0].template,
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
						Remarks: added[0].Remarks,
						client_id: clientId
					};
				
				if(validate_cell(added[0])){
					this.setState({empty_row: Object.values(added)});
					added[0].added = false;
<<<<<<< HEAD
				}else if(!/(\d{2}):(\d{2})/.test(String(added[0].workingHours)) || !/(\d{2}):(\d{2})/.test(String(added[0].actualWh)) || !/(\d{2}):(\d{2})/.test(String(added[0].template))){
=======
				}else if(!/(\d{2}):(\d{2})/.test(String(added[0].workingHours)) || !/(\d{2}):(\d{2})/.test(String(added[0].actualWh))){
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
					this.setState({empty_row: Object.values(added)});
					added[0].added = false;
				}
				else{
					added[0].added = true;
					if(machine === "N2"){
						this.props.post_N2(part_data);
					}else if(machine === "N2_plus_150"){
						this.props.post_N2_plus_150(part_data);
				
					}else if(machine === "N2_plus_50"){
						this.props.post_N2_plus_50(part_data);
					}
					
				}
				
				rows = [
					...rows,
					...added.map((row, index) => ({
					id: startingAddedId + index,
					client_id: clientId,
					...row,
					}))
					];	
			}
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
						weight:  rows[row_id].weight,
<<<<<<< HEAD
						template:  time_to_numb(rows[row_id].template),
=======
						template:  rows[row_id].template,
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
						Remarks: rows[row_id].Remarks,
						client_id: rows[row_id].client_id,
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
					}
					else if(validate_cell(rows[row_id])){
						this.setState({empty_row: Object.values(changed)});
<<<<<<< HEAD
					}else if(!/(\d{2}):(\d{2})/.test(String(rows[row_id].workingHours)) || !/(\d{2}):(\d{2})/.test(String(rows[row_id].actualWh)) || !/(\d{2}):(\d{2})/.test(String(rows[row_id].template)) ){
=======
					}else if(!/(\d{2}):(\d{2})/.test(String(rows[row_id].workingHours)) || !/(\d{2}):(\d{2})/.test(String(rows[row_id].actualWh))){
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
						this.setState({empty_row: Object.values(changed)});
					}else{
						if(rows[row_id].added){
							let keys = Object.keys(changed[row_id]);
							let chnged_val = [];
							for(let i = 0; i < keys.length; i++){
							 chnged_val.push([keys[i], vale[keys[i]]]);	
							}
						
							let json =  chnged_val.reduce(function(p, c) {
									 p[c[0]] = c[1];
									 return p;}, {});
									 
						
							let query = {id: {client_id: vale.client_id}, query: json};
							
							if(machine === "N2"){
								this.props.put_N2(query);
							}else if(machine === "N2_plus_150"){
								this.props.put_N2_plus_150(query);
							}else if(machine === "N2_plus_50"){
								this.props.put_N2_plus_50(query);
							}
							
							
						}else{
							rows[row_id].added = true;
					
							if(machine === "N2"){
								this.props.post_N2(vale);
							}else if(machine === "N2_plus_150"){
								this.props.post_N2_plus_150(vale);
							}else if(machine === "N2_plus_50"){
								this.props.post_N2_plus_50(vale);
							}
							
							rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
						}
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
			getStateDeletingRows().forEach((rowId) => {
				const index = rows.findIndex(row => row.id === rowId);
				if(rows[index].added){
					let query = {cleint_id: rows[index].cleint_id };
					if(this.props.machine === "N2"){
						this.props.delete_N2(query);
					}else if(this.props.machine === "N2_Plus_150"){
						this.props.delete_N2_plus_150(query);
					}else if(this.props.machine === "N2_Plus_50"){
						this.props.delete_N2_plus_50(query);
					}
				}
				
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
			dateTimeColumns,
			TimeColumns,
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
			
			<TimeProvider 
			for={TimeColumns}
			/>
			
<<<<<<< HEAD
			<DateTimeTypeProvider
            for={dateTimeColumns}
			/>

=======
		
			<DateTimeTypeProvider
            for={dateTimeColumns}
			/>
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
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
		
		</Paper>
		
		)
		
	}
	
}


AddTable.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	post_N2: PropTypes.func.isRequired,
	put_N2: PropTypes.func.isRequired,
	post_N2_plus_150: PropTypes.func.isRequired,
	post_N2_plus_50: PropTypes.func.isRequired,
	put_N2_plus_150: PropTypes.func.isRequired,
	put_N2_plus_50: PropTypes.func.isRequired,
	delete_N2: PropTypes.func.isRequired,
	delete_N2_plus_150: PropTypes.func.isRequired, 
	delete_N2_plus_50: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
	auth: state.auth,
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50,
});


export default  connect(mapStateToProps, { post_N2, put_N2, post_N2_plus_150, post_N2_plus_50, put_N2_plus_150, put_N2_plus_50,  delete_N2, delete_N2_plus_150, delete_N2_plus_50 } )(withStyles(styles)(AddTable));


