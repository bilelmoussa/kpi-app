function validate_date(d){
    var date = new Date(d);
    var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    
    return (date.toLocaleDateString("fr", options))
}

module.exports = validate_date;