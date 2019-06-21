import { 
	N2_YEARS,
	N2_MONTHS,
	N2_WEEKS,
	N2_WEEK_CHART_DATA,
	N2_MONTH_CHART_DATA,
	N2_YEAR_CHART_DATA,
	N2_WEEK_TABLE_DATA, 
	N2_SELECT_DATE,
	N2_PART_NAME
} from '../actions/types';

const initialState = {
	Years: {},
	Months: {},
	Weeks: {},
	WeekChartData: {},
	MonthChartData: {},
	YearChartData: {},
	WeekTableData: {},
	N2_selectedDate: {},
	N2_PartName: {},
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
			return { ...state, WeekTableData: action.payload};
		case N2_SELECT_DATE:
			return { ...state, N2_selectedDate: action.payload};
		case N2_PART_NAME:
			return { ...state, N2_PartName: action.payload};				
        default: 
            return state;
    }
}