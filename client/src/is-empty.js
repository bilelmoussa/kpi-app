

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
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

export const isObEmpty = (obj) => {
	const values = Object.values(obj);
	const keys = Object.keys(obj);
	if(keys.includes("Remarks") && keys.length === 1){
		return false;
	}else{
		for (const key of values) {
			if(key === undefined){
				return true;
			}else if(typeof key === "string" && key.trim().length < 1){
				return true;
			}else{
				return false;
			}
		}
	}
}

			


export const  empty = (data) => {
	if(typeof(data) == 'number' || typeof(data) == 'boolean')
	{ 
	  return false; 
	}
	if(typeof(data) == 'undefined' || data === null)
	{
	  return true; 
	}
	if(typeof(data.length) != 'undefined')
	{
	  return data.length == 0;
	}
	if(typeof data === "string" &&  ( data === "" || data === null )){
		return true;
	}
	var count = 0;
	for(var i in data)
	{
	  if(data.hasOwnProperty(i))
	  {
		count ++;
	  }
	}
	return count == 0;
  }
