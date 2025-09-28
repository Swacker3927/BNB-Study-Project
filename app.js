require('dotenv').config();
// console.log(process.env);
const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();

// DB 연결
require('./plugins/connectSequelize');



app.use(koaBody()); // 코아 바디 파서

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
	console.log(`Listen at http://localhost:${PORT}`);
});