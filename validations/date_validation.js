const validate_date = (d) =>{
	console.log("firstTime: ", d);
	let a = new Date(d);
	let year = a.getFullYear();
	let month = a.getMonth();
	let day = a.getDate();
	let hours = a.getHours() +1;
	let minutes = a.getMinutes();
	let seconds = a.getSeconds();
	let aa = new Date(year, month, day, hours, minutes, seconds);
	console.log("second Time: ", aa)
	return aa
}

module.exports = validate_date;