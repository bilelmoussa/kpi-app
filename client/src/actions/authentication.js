import axios from 'axios';
import { 
	GET_ERRORS, 
	SET_CURRENT_USER,
	N2_YEARS,
	N2_PLUS_150_YEARS,
	N2_PLUS_50_YEARS,
	N2_MONTHS,
	N2_PLUS_150_MONTHS,
	N2_PLUS_50_MONTHS,
	N2_WEEKS,
	N2_PLUS_150_WEEKS,
	N2_PLUS_50_WEEKS,
	N2_WEEK_CHART_DATA,
	N2_PLUS_150_WEEK_CHART_DATA,
	N2_PLUS_50_WEEK_CHART_DATA,
	N2_MONTH_CHART_DATA,
	N2_PLUS_150_MONTH_CHART_DATA,
	N2_PLUS_50_MONTH_CHART_DATA,
	N2_YEAR_CHART_DATA,
	N2_PLUS_150_YEAR_CHART_DATA,
	N2_PLUS_50_YEAR_CHART_DATA,
	N2_WEEK_TABLE_DATA,
	N2_PLUS_150_WEEK_TABLE_DATA,
	N2_PLUS_50_WEEK_TABLE_DATA,
	RATIOS,
	N2_SELECT_DATE,
	N2_PLUS_150_SELECT_DATE,
	N2_PLUS_50_SELECT_DATE,
} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const loginUser = (user, history) => dispatch => {
    axios.post('/api/user/login', user)
            .then(res => {
				const  { token } = res.data;
                localStorage.setItem('jwtToken', token);
				setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
				history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
			
}

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/user/register', user)
            .then(res =>{ 
				history.push('/login')
			})
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
	if(history){
		history.push('/login')
	}
}

export const delete_Error = () => dispatch =>{
	let new_err = { }
	dispatch({
		type: GET_ERRORS,
		payload: new_err
	})
}



 
export const post_N2 = (Part) => dispatch =>{
	axios.post('/api/N2/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_150 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_150/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_50 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_50/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}


function to_date(data){
	let date = new Date(data);
	let new_form_d = date.toISOString().substring(0, 16);
	return new_form_d;
}



function time_hours(value){
	let num = value * 60;
	let hours = Math.floor(num / 60);  
	let index_p = String(value).indexOf('.');
	let before_col = String(value).slice(index_p);
	let minutes_H = Math.round(Number(`0${before_col}`) * 60);
	
	if(minutes_H.toString().length < 2){
		 minutes_H =  `0${minutes_H}`;
	}
	
	if(hours.toString().length < 2){
		hours = `0${hours}`;
	}
	
	if(index_p === -1){
		return hours + ":00";
	}else{
		return hours + ":" + minutes_H;
	}
	
}



export const put_N2 = (query) => dispatch =>{
	axios.put('/api/N2/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_150 = (query) => dispatch =>{
	axios.put('/api/N2_plus_150/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_50 = (query) => dispatch =>{
	axios.put('/api/N2_plus_50/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const delete_N2 = (id) => dispatch =>{
	axios.delete('/api/N2/deleteparts', { data: { id } } )
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}

export const delete_N2_plus_150 = (id) => dispatch =>{
	axios.delete('/api/N2_plus_150/deleteparts', { data: { id } })
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}

export const delete_N2_plus_50 = (id) => dispatch =>{
	axios.delete('/api/N2_plus_50/deleteparts', { data: { id } })
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}



//GET DATA FOR SELECT
export const get_n2_years = () => dispatch =>{
	 axios.get('/api/N2/years')
		.then(res => {
			dispatch({
				type: N2_YEARS,
				payload: res.data.years
			})
		})
		.catch(err =>{console.log(err)})
}

export const get_n2_plus_150_years = () => dispatch =>{
	axios.get('/api/N2_plus_150/years')
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_150_YEARS,
			   payload: res.data.years
		   })
	   })
	   .catch(err =>{console.log(err)})
}

export const get_n2_plus_50_years = () => dispatch =>{
	axios.get('/api/N2_plus_50/years')
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_50_YEARS,
			   payload: res.data.years
		   })
	   })
	   .catch(err =>{console.log(err)})
}

export const get_n2_months = (year) => dispatch =>{
	axios.get(`/api/N2/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_MONTHS,
			   payload: res.data.months
		   })
	   })
	   .catch(err =>{console.log(err)})
}

export const get_n2_plus_150_months = (year) => dispatch =>{
	axios.get(`/api/N2_plus_150/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_150_MONTHS,
			   payload: res.data.months
		   })
	   })
	   .catch(err =>{console.log(err)})
}

export const get_n2_plus_50_months = (year) => dispatch =>{
	axios.get(`/api/N2_plus_50/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_50_MONTHS,
			   payload: res.data.months
		   })
	   })
	   .catch(err =>{console.log(err)})
}

export const get_n2_weeks = (year, month) => dispatch =>{
	axios.get(`/api/N2/weeks/${year}/${month}`)
		.then(res=>{
			console.log(res)
			dispatch({
				type: N2_WEEKS,
				payload: res.data.weeks
			})
		})
		.catch(err=>{console.log(err)})
}

export const get_n2_plus_150_weeks = (year, month) => dispatch =>{
	axios.get(`/api/N2_plus_150/weeks/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_WEEKS,
				payload: res.data.weeks
			})
		})
		.catch(err=>{console.log(err)})
}

export const get_n2_plus_50_weeks = (year, month) => dispatch =>{
	axios.get(`/api/N2_plus_50/weeks/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_WEEKS,
				payload: res.data.weeks
			})
		})
		.catch(err=>{console.log(err)})
}




//CHART DATA
export const N2WeekChartData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_WEEK_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2PLUS150WeekChartData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2_plus_150/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_WEEK_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2PLUS50WeekChartData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2_plus_50/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_WEEK_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

//MONTH CHART
export const N2MonthChartData = (year, month) => dispatch =>{
	axios.get(`/api/N2/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_MONTH_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2Plus150MonthChartData = (year, month) => dispatch =>{
	axios.get(`/api/N2_plus_150/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_MONTH_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2Plus50MonthChartData = (year, month) => dispatch =>{
	axios.get(`/api/N2_plus_50/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_MONTH_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}


//YEAR CHART
export const N2YearChartData = (year) => dispatch =>{
	axios.get(`/api/N2/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_YEAR_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2Plus150YearChartData = (year) => dispatch =>{
	axios.get(`/api/N2_plus_150/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_YEAR_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const N2Plus50YearChartData = (year) => dispatch =>{
	axios.get(`/api/N2_plus_50/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_YEAR_CHART_DATA,
				payload: res.data.data
			})
		})
		.catch(err=>{console.log(err)})
}

export const ClearChartData = (machine, target) => dispatch =>{
	if(machine === "N2"){
		if(target === "week"){
			dispatch({
				type: N2_WEEK_CHART_DATA,
				payload: []
			})
		}
		else if(target === "Month"){
			dispatch({
				type: N2_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_YEAR_CHART_DATA,
				payload: []
			})
		}
	}else if(machine === "N2Plus150"){
		if(target === "week"){
			dispatch({
				type: N2_PLUS_150_WEEK_CHART_DATA,
				payload: []
			})
		}else if(target === "Month"){
			dispatch({
				type: N2_PLUS_150_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_PLUS_150_YEAR_CHART_DATA,
				payload: []
			})
		}
		
	}else if(machine === "N2Plus50"){
		if(target === "week"){
			dispatch({
				type: N2_PLUS_50_WEEK_CHART_DATA,
				payload: []
			})
		}else if(target === "Month"){
			dispatch({
				type: N2_PLUS_50_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_PLUS_50_YEAR_CHART_DATA,
				payload: []
			})
		}

	}
}


//TABLE DATA
export const N2WeekTableData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2/week_table/${year}/${month}/${week}`)
		.then(res=>{
			console.log(res)
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template);						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_WEEK_TABLE_DATA,
				payload: new_rows
			})
		})
} 

export const N2Plus150WeekTableData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2_plus_150/week_table/${year}/${month}/${week}`)
		.then(res=>{
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template)						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_PLUS_150_WEEK_TABLE_DATA,
				payload: new_rows
			})
		})
}

export const N2Plus50WeekTableData = (year, month, week) => dispatch =>{
	axios.get(`/api/N2_plus_50/week_table/${year}/${month}/${week}`)
		.then(res=>{
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template)						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_PLUS_50_WEEK_TABLE_DATA,
				payload: new_rows
			})
		})
}  

//CLEAR TABLE DATA
export const ClearTableData = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_WEEK_TABLE_DATA,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_WEEK_TABLE_DATA,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_WEEK_TABLE_DATA,
			payload: []
		})
	}
}

//CLEAR SELECT MONTHS
export const ClearSelectMonths = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_MONTHS,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_MONTHS,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_MONTHS,
			payload: []
		})
	}
}


//CLEAR SELECT WEEKS
export const ClearSelectWeeks = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_WEEKS,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_WEEKS,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_WEEKS,
			payload: []
		})
	}
}

//GET 4 Ratio
export const getAllMachineRatio = (year) => dispatch =>{
	axios.get(`/api/All_Machines/stat/${year}`)
	.then(res=>{
		console.log(res)
		dispatch({
			type: RATIOS,
			payload: res.data
		})
	})
}


let Timer_N2 = 0;
let Timer_N2_Plus_150 = 0;
let Timer_N2_Plus_50 = 0;



export const AddClientTimer = (machine, values) => dispatch =>{
	if(machine === "N2"){
		let  seconds = values * 3600;


			clearInterval(Timer_N2);
			dispatch({
				type: N2_SELECT_DATE,
				payload: 0
			});

			Timer_N2 = setInterval(function(){
				let nextSeconds = seconds--
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2)
					nextSeconds = 0;
				}

				dispatch({
					type: N2_SELECT_DATE,
					payload: nextSeconds
				});
		
			}, 1000);
		
	}
	else if(machine === "N2Plus150"){
		let  seconds = values * 3600;

			clearInterval(Timer_N2_Plus_150);
			dispatch({
				type: N2_PLUS_150_SELECT_DATE,
				payload: 0
			});

			Timer_N2_Plus_150 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_150)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_150_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);
		
		
		
	}
	else if(machine === "N2Plus50"){
		let  seconds = values * 3600;
	
			clearInterval(Timer_N2_Plus_50);
			dispatch({
				type: N2_PLUS_50_SELECT_DATE,
				payload: 0
			});

			Timer_N2_Plus_50 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_50)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_50_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);
	
	}
}

export const AddServerTimer = (machine, values) => () => {

	if(machine === "N2"){

		let seconds = values * 3600;

		axios.post('/api/timer/start_n2_timer', {values: seconds})
			.then(res=>{
				console.log(res.data)
			})
			.catch(err=>{
				console.log(err)
		})

	}else if(machine === "N2Plus150"){
		let seconds = values * 3600;

		axios.post('/api/timer/start_n2plus150_timer', {values: seconds})
			.then(res=>{
				console.log(res.data)
			})
			.catch(err=>{
				console.log(err)
		})

	}else if(machine === "N2Plus50"){
		let seconds = values * 3600;

		axios.post('/api/timer/start_n2plus50_timer', {values: seconds})
			.then(res=>{
				console.log(res.data)
			})
			.catch(err=>{
				console.log(err)
		})
	}

	
}



export const  StopTimer_N2 = () => dispatch =>{
	axios.get('/api/timer/stop_n2_timer')
	.then(res=>{
		console.log(res.data)
	})
	.catch(err=>{
		console.log(err)
	})
	clearInterval(Timer_N2);
	dispatch({
		type: N2_SELECT_DATE,
		payload: 0
	});
}


export const Get_N2_Timer  = () => dispatch =>{
	if(Timer_N2 === 0){
		axios.get('/api/timer/get_n2_timer')
		.then(res=>{
			let  seconds =  res.data.value;
			clearInterval(Timer_N2);
			dispatch({
				type: N2_SELECT_DATE,
				payload: 0
			});

			Timer_N2 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);

		})
		.catch(err=>{
			console.log(err)
		})
	}
}

export const  StopTimer_N2_Plus_150 = () => dispatch =>{
	axios.get('/api/timer/stop_n2plus150_timer')
	.then(res=>{
		console.log(res.data)
	})
	.catch(err=>{
		console.log(err)
	})
	clearInterval(Timer_N2_Plus_150);
	dispatch({
		type: N2_PLUS_150_SELECT_DATE,
		payload: 0
	});
}



export const Get_N2_Plus_150_Timer  = () => dispatch =>{
	if(Timer_N2_Plus_150 === 0){
		axios.get('/api/timer/get_n2plus150_timer')
		.then(res=>{
			let seconds = res.data.value;

			Timer_N2_Plus_150 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_150)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_150_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);

	
		})
		.catch(err=>{
			console.log(err)
		})
	}
}


export const  StopTimer_N2_Plus_50 = () => dispatch =>{
	axios.get('/api/timer/stop_n2plus50_timer')
	.then(res=>{
		console.log(res.data)
	})
	.catch(err=>{
		console.log(err)
	})
	clearInterval(Timer_N2_Plus_50);
	dispatch({
		type: N2_PLUS_50_SELECT_DATE,
		payload: 0
	});
}


export const Get_N2_Plus_50_Timer  = () => dispatch =>{
	if(Timer_N2_Plus_50 === 0){
		axios.get('/api/timer/get_n2plus50_timer')
		.then(res=>{
			let seconds = res.data.value;

			Timer_N2_Plus_50 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_50)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_50_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);

	
		})
		.catch(err=>{
			console.log(err)
		})
	}

}
