const Router = require('@koa/router');
const router = new Router();

router.get('/', (ctx, next) => {
	// DB에 연결해서 사용자 목록 가져 와서 줘야겠지만!
	ctx.body = {
		rows: '사용자 목록 배열'
	};
});

router.get('/:id', (ctx, next) => {
	const id = ctx.params.id;
	console.log("userID:", id);
	ctx.body = {
		row: '유저 정보',
		id
	};
});

// 회원가입
router.post('/', $API_CALL(async (ctx, next) => {
	const payload = ctx.request.body;
	// console.log(payload)
	const files = ctx.request.files;
	// throw new Error("에외 발생")
	return { payload, files };
}));

router.put('/:id', (ctx, next) => {
	const id = ctx.params.id;
	const payload = ctx.request.body;
	ctx.body = {
		row: '유저 정보 수정',
		id,
		payload
	};
});

router.delete('/:id', (ctx, next) => {
	const id = ctx.params.id;
	ctx.body = {
		row: '유저 정보 삭제',
		id
	};
});

module.exports = router;
