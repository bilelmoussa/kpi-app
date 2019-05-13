const express = require('express');
const router = express.Router();
const passport = require('passport');


let Timer_N2 = 0;
let Timer_N2_Plus_150 = 0;
let Timer_N2_Plus_50 = 0;

let N2_Time = 0;
let N2_Plus_150_Time = 0;
let N2_Plus_50_Time = 0;



//N2 Timer

const  AddTimer_N2 = (values) =>{
	let seconds = values;

	Timer_N2 = setInterval(function(){
		let nextSeconds = seconds--
		if(nextSeconds === 0 ){
			clearInterval(Timer_N2)
			nextSeconds = 0;
    }
    
	N2_Time = nextSeconds;
	
	}, 1000);

}

const StopTimer_N2 = () =>{
	clearInterval(Timer_N2);
	N2_Time = 0;
}

const Save_N2_Date = (value) =>{
	StopTimer_N2();
	AddTimer_N2(value);
}

router.post('/start_n2_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "write"){
				let vals = req.body.values;
				Save_N2_Date(vals);
				res.status(200).json({success: true, msg: "counter has started"})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/stop_n2_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "write"){
				StopTimer_N2();
				res.status(200).json({success: true, msg: "counter has stopped", value: N2_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/get_n2_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "write"){
				let msgs = N2_Time > 0 ? "Timer is still on !" : "Timer has Stopped !";
				res.status(200).json({success: true, msg: msgs, value: N2_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});




//N2Plus150 Timer
const  AddTimer_N2_Plus_150 = (values) =>{
	let seconds = values;
	
	Timer_N2_Plus_150 = setInterval(function(){
		let nextSeconds = seconds--
		if(nextSeconds === 0 ){
			clearInterval(Timer_N2_Plus_150)
			nextSeconds = 0;
    }
    
	N2_Plus_150_Time = nextSeconds;
	
	}, 1000);

}

const StopTimer_N2_Plus_150 = () =>{
	clearInterval(Timer_N2_Plus_150);
	N2_Plus_150_Time = 0;
}

const Save_N2Plus150_Date = (value) =>{
	StopTimer_N2_Plus_150();
	AddTimer_N2_Plus_150(value);
}

router.post('/start_n2plus150_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				let vals = req.body.values;
				Save_N2Plus150_Date(vals);
				res.status(200).json({success: true, msg: "counter has started"})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/stop_n2plus150_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				StopTimer_N2_Plus_150();
				res.status(200).json({success: true, msg: "counter has stopped", value: N2_Plus_150_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/get_n2plus150_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				let msgs = N2_Plus_150_Time > 0 ? "Timer is still on !" : "Timer has Stopped !";
				res.status(200).json({success: true, msg: "counter has stopped", value: N2_Plus_150_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});




//N2Plus50 Timer
const  AddTimer_N2_Plus_50 = (values) =>{
	let seconds = values;
	
	Timer_N2_Plus_50 = setInterval(function(){
		let nextSeconds = seconds--
		if(nextSeconds === 0 ){
			clearInterval(Timer_N2_Plus_50)
			nextSeconds = 0;
    }
    
	N2_Plus_50_Time = nextSeconds;
	
	}, 1000);

}

const StopTimer_N2_Plus_50 = () =>{
	clearInterval(Timer_N2_Plus_50);
	N2_Plus_50_Time = 0;
}

const Save_N2Plus50_Date = (value) =>{
	StopTimer_N2_Plus_50();
	AddTimer_N2_Plus_50(value);
}

router.post('/start_n2plus50_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				let vals = req.body.values;
				Save_N2Plus50_Date(vals);
				res.status(200).json({success: true, msg: "counter has started"})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/stop_n2plus50_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				StopTimer_N2_Plus_50();
				res.status(200).json({success: true, msg: "counter has stopped", value: N2_Plus_50_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

router.get('/get_n2plus50_timer',  (req, res, next)=> {
	passport.authenticate('jwt', {session: false}, (err, user)=>{
		if(err){
			console.log(err);
			res.status(400).json("Server Error !")
		}
		else if(user){
			if(user.role === "admin" || user.role === "writer"){
				let msgs = N2_Plus_50_Time > 0 ? "Timer is still on !" : "Timer has Stopped !";
				res.status(200).json({success: true, msg: "counter has stopped", value: N2_Plus_50_Time})
			}else{
				res.status(404).json("Unauthorised !")
			}
		}else{
			res.status(404).json("Unauthorised !")
		}
	})(req, res, next)
});

module.exports = router;
