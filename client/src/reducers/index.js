import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import responseReducer from './responseReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
	res: responseReducer
});