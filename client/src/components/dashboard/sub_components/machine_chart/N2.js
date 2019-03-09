import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { get_N2  }  from '../../../../actions/authentication';
import Week from './date/week';
import Month from './date/month';
import Year from './date/year';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		flexDirection: "row",	
	}
})

function TabContainer(props) {
  return (
    <Card component="div" style={{overflow: 'auto', margin: '0', width: '100%'  }}>
      {props.children}
    </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

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



class N2 extends Component{
	constructor(){
		super();
		this.state = {
			data: [],
			value: 0,
		}
	}
	
	componentDidMount(){
		this.props.get_N2();
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
			if(nextProps.N2!==prevState.N2){
				if(empty(nextProps.N2.Get_n2)){
					return { data: [] };
				}else{
					return { data: nextProps.N2.Get_n2 };
				}
			}else { return null };
	}		
	
	componentDidUpdate(prevProps, prevState) {

			if(prevProps.N2!==this.props.N2  ){
				if(empty(this.props.N2.Get_n2)){
					this.setState({
						data: [],
					})
				}else{
					this.setState({
						data: this.props.N2.Get_n2 });
				}
			}else{
				return null;
			}
	}
	
	handleChange = (event, value) => {
    this.setState({ value });
	};

	render(){
		const { classes } = this.props;
		const { value } = this.state;	

		return(
			<div className={classes.root}>
				<AppBar className={classes.app_nav}  position="static">
					<Tabs value={value} onChange={this.handleChange}>
							<Tab label="Week" />
							<Tab label="Month" />
							<Tab label="Year" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><Week /></TabContainer>}
				{value === 1 && <TabContainer><Month /></TabContainer>}
				{value === 2 && <TabContainer><Year /></TabContainer>}

			</div>
		)
		
	}	
}


N2.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	get_N2: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
	auth: state.auth,
	N2: state.N2,
});


export default  connect(mapStateToProps, { get_N2 })(withStyles(styles)(N2));