const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();
app.use(koaBody()); // Koa Body Parser

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

app.listen(3000);
