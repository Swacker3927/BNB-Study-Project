const getLimit = (page, rowsPerPage) => {
	const offset = (page - 1) * rowsPerPage;
	return { offset, limit: rowsPerPage }
}

const getOder = (sortBy, descending) => {
	if (sortBy) {
		return { order: [[sortBy, descending ? 'DESC' : 'ASC']] }
	} else {
		return { order: null }
	}
}

module.exports = {
	getLimit,
	getOder,
}