const Koa = require('koa');
const { koaBody } = require('koa-body');

const Router = require('@koa/router');
const router = new Router();

const app = new Koa();

app.use(koaBody()); // 코아 바디 파서

const userRouter = require('./router/user');
router.use('/user', userRouter.routes()); // 유저 라우터 prefix
const testRouter = require('./router/test');
router.use('/test', testRouter.routes());
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);