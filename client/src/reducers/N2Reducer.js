import { 
	GET_N2, 	
	N2_YEARS,
	N2_MONTHS,
	N2_WEEKS,
	N2_CHART_DATA 
} from '../actions/types';

const initialState = {
	Get_n2: {},
	Years: {},
	Months: {},
	Weeks: {},
	ChartData: {}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2:
			return { ...state ,Get_n2: action.payload };
		case N2_YEARS:
			return { ...state, Years:action.payload };
		case N2_MONTHS:
			return { ...state, Months:action.payload };
		case N2_WEEKS:
			return  { ...state, Weeks:action.payload };
		case N2_CHART_DATA:
			return { ...state, ChartData:action.payload };			
        default: 
            return state;
    }
}