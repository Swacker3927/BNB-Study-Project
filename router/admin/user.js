const Router = require('@koa/router');
const router = new Router();
const admUserCtrl = require('../../controller/admUserCtrl');
const checkRole = require('../../middlewares/checkRole');

router.use(checkRole(['Admin']));

// 목록
router.get('/', $API_CALL(async (ctx) => {
	const page = Number(ctx.query.page || '1');
	const rowsPerPage = Number(ctx.query.rowsPerPage || '10');
	const sortBy = ctx.query.sortBy || 'createdAt';
	const descending = ctx.query.descending == 'true';
	const query = {
		...ctx.query,
		page,
		rowsPerPage,
		sortBy,
		descending,
	}
	const data = await admUserCtrl.list(query);
	return data;
}))

router.post('/', $API_CALL(async (ctx) => {
	return { "post": "post" }
}))

router.put('/', $API_CALL(async (ctx) => {

}))

router.delete('/', $API_CALL(async (ctx) => {

}))

module.exports = router;