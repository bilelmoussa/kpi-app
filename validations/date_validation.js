function validate_date(d){
    var date = new Date(d);
    var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    console.log(date.toLocaleDateString("fr", options));
    return (date.toLocaleDateString("fr", options))
}

module.exports = validate_date;