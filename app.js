const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();
app.use(koaBody()); // 코아 바디 파서

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

app.listen(3000);