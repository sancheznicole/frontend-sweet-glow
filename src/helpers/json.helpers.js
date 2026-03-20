
export const buildJson = (data, keyField, valueField) => {
	return data.reduce((acc, item) => {
		acc[item[keyField]] = item[valueField]
		return acc
	}, {})
}