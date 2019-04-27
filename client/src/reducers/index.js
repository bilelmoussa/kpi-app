import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import N2Reducer from './N2Reducer';
import N2Plus150Reducer from './N2Plus150Reducer';
import N2Plus50Reducer from './N2Plus50Reducer';
<<<<<<< HEAD
import Ratio from './Ratio';
=======
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
	N2: N2Reducer,
	N2_Plus_150: N2Plus150Reducer,
<<<<<<< HEAD
	N2_Plus_50: N2Plus50Reducer,
	Ratios: Ratio
=======
	N2_Plus_50: N2Plus50Reducer
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
});