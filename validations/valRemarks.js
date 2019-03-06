const valRemarks = (value) => {
    return (
		(typeof value === 'object' && Object.values(value)[0] === null) ||
		(typeof value === 'object' && Object.values(value)[0] === undefined) ||
		(typeof value === 'object' && !Object.values(value)[0] === '')
    );
}

module.exports = valRemarks;