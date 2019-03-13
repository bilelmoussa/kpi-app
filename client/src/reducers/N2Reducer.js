import { 
	GET_N2, 	
	N2_YEARS,
	N2_MONTHS,
	N2_WEEKS,
	N2_WEEK_CHART_DATA,
	N2_MONTH_CHART_DATA,
	N2_YEAR_CHART_DATA, 
} from '../actions/types';

const initialState = {
	Get_n2: {},
	Years: {},
	Months: {},
	Weeks: {},
	WeekChartData: {},
	MonthChartData: {},
	YearChartData: {}
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
		case N2_WEEK_CHART_DATA:
			return { ...state, WeekChartData:action.payload };
		case N2_MONTH_CHART_DATA:
			return { ...state, MonthChartData: action.payload };
		case N2_YEAR_CHART_DATA:
			return { ...state, YearChartData: action.payload }			
        default: 
            return state;
    }
}