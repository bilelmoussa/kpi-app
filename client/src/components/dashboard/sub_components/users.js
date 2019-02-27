import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const styles = {
	color: '#ffffff'
}

class users extends Component {
	constructor(){
		super();
		this.state = {
			admin_auth: false,
			role: 'read'
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.auth.user.role!==prevState.role && nextProps.auth.user.role === 'admin'){
			return { role: nextProps.auth.user.role, admin_auth: true };
		}
			else return null;
	};
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.auth.user.role!==this.props.auth.user.role && this.props.auth.user.role === 'admin') {
			this.setState({
				role: this.props.auth.user.role,
				admin_auth: true
			});
		}else{
			return null;
		}
	}
	
	componentDidMount(){
		if(!this.state.admin_auth){
			this.props.history.push('/dashboard/')
		}
	}
	
	render(){
		return(
			<div style={styles}> Users </div>
		)
	}
}

users.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(users)