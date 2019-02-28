import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import N2Reducer from './N2Reducer';
import N2Plus150Reducer from './N2Plus150Reducer';
import N2Plus50Reducer from './N2Plus50Reducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
	N2: N2Reducer,
	N2_Plus_150: N2Plus150Reducer,
	N2_Plus_50: N2Plus50Reducer
});