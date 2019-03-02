import { GET_N2_PLUS_150, POST_N2_PLUS_150 } from '../actions/types';

const initialState = {
	Get_n2_plus_150: {},
	Post_n2_plus_150: {},
	Put_n2_plus_150: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_150:
            return { ...state, Get_n2_plus_150: action.payload };
		case POST_N2_PLUS_150:
			return { ...state, Post_n2_plus_150: action.payload };
        default: 
            return state;
    }
}