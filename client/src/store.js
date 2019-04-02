import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import ReduxPromise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';


const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        compose(applyMiddleware(thunkMiddleware), composeWithDevTools(
            applyMiddleware(ReduxPromise))
		))
		
             

export default store;