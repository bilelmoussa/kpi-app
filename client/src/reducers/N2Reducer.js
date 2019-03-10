import { 
	GET_N2, 	
	N2_YEARS,
	N2_MONTHS 
} from '../actions/types';

const initialState = {
	Get_n2: {},
	Years: {},
	Months: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2:
			return { ...state ,Get_n2: action.payload };
		case N2_YEARS:
			return { ...state, Years:action.payload };
		case N2_MONTHS:
			return { ...state, Months:action.payload };	
        default: 
            return state;
    }
}