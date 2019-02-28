import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_N2, GET_N2_PLUS_150, GET_N2_PLUS_50, POST_N2, POST_N2_PLUS_150, POST_N2_PLUS_50 } from './types';
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
    history.push('/login');
}

export const delete_Error = () => dispatch =>{
	let new_err = { }
	dispatch({
		type: GET_ERRORS,
		payload: new_err
	})
}

export const GET_Token = ()=>{
	const Token = localStorage.getItem('jwtToken');
	console.log(Token);
	return Token || null;
}

 
export const post_N2 = (Part) => dispatch =>{
	axios.post('/api/N2/saveparts', Part)
			.then(res =>{
				dispatch({
					type: POST_N2,
					payload: res.data.part
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const get_N2 = () => dispatch =>{
	axios.get('/api/N2/findparts')
			.then(res =>{
				dispatch({
					type: GET_N2,
					payload: res.data.parts
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}


export const get_N2_Plus_50 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_50/saveparts', Part, {headers:{Authorization: GET_Token}})
			.then(res =>{
				console.log(res);
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}
