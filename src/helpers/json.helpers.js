
export const buildJson = (data, keyField, valueField) => {
	return data.reduce((acc, item) => {
		acc[item[keyField]] = item[valueField]
		return acc
	}, {})
}

export const parsePrice = (decimal) => {
	return	`$${parseInt(decimal).toLocaleString('en-US')}`
}


export const normalizeProducts = (data) => {
    return Object.values(data)
}