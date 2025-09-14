const Koa = require('koa');
const Router = require('@koa/router');
const { koaBody } = require('koa-body');

const app = new Koa();

app.use(koaBody()); // Koa Body Parser

const router = new Router();
/*
router.get('/bnb', (ctx, next) => {
  ctx.body = 'BNB Get router 연결 확인';
});

router.post('/bnb', (ctx, next) => {
  ctx.body = 'BNB Post router 연결 확인';
});
*/
router.get('/user', (ctx, next) => {
  // DB에 연결해서 사용자 목록 가져 와서 줘야 겠지만!
  ctx.body = {
    rows: '사용자 목록 배열'
  };
});

router.get('/user/:id', (ctx, next) => {
  const id = ctx.params.id;
  console.log("userID: ", id);
  ctx.body = {
    rows: '유저 정보',
    id
  };
});

router.post('/user', (ctx, next) => {
  const payload = ctx.request.body;
  ctx.body = {
    rows: '유저 회원가입',
    payload
  };
});

router.put('/user/:id', (ctx, next) => {
  const id = ctx.params.id;
  const payload = ctx.request.body;
  console.log("userID: ", id);
  ctx.body = {
    rows: '유저 정보 수정',
    id,
    payload
  };
});

router.delete('/user/:id', (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = {
    rows: '유저 정보 삭제',
    id
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
