const validate_date = (d) =>{
<<<<<<< HEAD
	console.log("firstTime: ", d);
=======
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
	let a = new Date(d);
	let year = a.getFullYear();
	let month = a.getMonth();
	let day = a.getDate();
	let hours = a.getHours() +1;
	let minutes = a.getMinutes();
	let seconds = a.getSeconds();
	let aa = new Date(year, month, day, hours, minutes, seconds);
<<<<<<< HEAD
	console.log("second Time: ", aa)
=======

>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
	return aa
}

module.exports = validate_date;