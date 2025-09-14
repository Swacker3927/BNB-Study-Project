const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/test', (ctx, next) => {
  ctx.body = 'Hello BNB Study';
});

router.get('/bnb', (ctx, next) => {
  ctx.body = 'BNB Get router 연결 확인';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
