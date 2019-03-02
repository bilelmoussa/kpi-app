

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

 

export const  isObEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const isChanged = (obj) => {
	const keys = Object.values(obj)
	for (const key of keys) {
		if(key === undefined){
			return true;
		}else{
			return false;
		}
	}
}

			


