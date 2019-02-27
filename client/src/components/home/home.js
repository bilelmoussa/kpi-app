import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import PropTypes from 'prop-types';


class home extends Component {
	
		componentDidMount() {
		
			if(this.props.auth.isAuthenticated) {
				this.props.history.push('/dashboard');
			}else{
				this.props.history.push('/login');
			}
		}
		
		  render() {
			return (
			  <div>
				 
			  </div>
			)
		  }
  
}


home.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};



const mapStateToProps = (state) => ({
	auth: state.auth,
});


export default connect(mapStateToProps, { loginUser })(home);