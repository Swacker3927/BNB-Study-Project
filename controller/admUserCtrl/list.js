const sequlelizeHelper = require('../../lib/sequlizeHelper');
const { Op } = require('sequelize');
module.exports = async (query) => {

	const where = {};
	if (query.search) {
		where[Op.or] = {
			email: { [Op.like]: `%${query.search}%` },
			name: { [Op.like]: `%${query.search}%` },
			tel: { [Op.like]: `%${query.search}%` },
		}
	}

	const data = await $DB.vw_user.findAndCountAll({
		where,
		...sequlelizeHelper.getLimit(query.page, query.rowsPerPage),
		...sequlelizeHelper.getOder(query.sortBy, query.descending),
	})
	return data;
}