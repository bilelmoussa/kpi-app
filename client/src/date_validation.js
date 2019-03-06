function get_time(value){
		var pretty = [
			value.getHours(),
			':',
			value.getMinutes()
		].join('');
		return pretty;
}
function get_date_format(value){
	return value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');
}

function get_dateTime_format(value){
	return value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$1/$2/$3  $4:$5');
}

export { get_time, get_date_format, get_dateTime_format }