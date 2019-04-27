import { 
	N2_YEARS,
	N2_MONTHS,
	N2_WEEKS,
	N2_WEEK_CHART_DATA,
	N2_MONTH_CHART_DATA,
	N2_YEAR_CHART_DATA,
	N2_WEEK_TABLE_DATA, 
<<<<<<< HEAD
	N2_SELECT_DATE
=======
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
} from '../actions/types';

const initialState = {
	Years: {},
	Months: {},
	Weeks: {},
	WeekChartData: {},
	MonthChartData: {},
	YearChartData: {},
	WeekTableData: {},
<<<<<<< HEAD
	N2_selectedDate: {}
=======
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
};

export default function(state = initialState, action ) {
    switch(action.type) {
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
			return { ...state, YearChartData: action.payload };
		case N2_WEEK_TABLE_DATA:
<<<<<<< HEAD
			return { ...state, WeekTableData: action.payload};
		case N2_SELECT_DATE:
			return { ...state, N2_selectedDate: action.payload}					
=======
			return { ...state, WeekTableData: action.payload};				
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
        default: 
            return state;
    }
}