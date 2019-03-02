import { GET_N2, POST_N2, PUT_N2 } from '../actions/types';

const initialState = {
	Get_n2: {},
	Post_n2: {},
	Put_n2: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2:
            return { ...state ,Get_n2: action.payload };
		case POST_N2:
			return { ...state, Post_n2: action.payload };
		case PUT_N2:
			return { ...state, Put_n2: action.payload };
        default: 
            return state;
    }
}