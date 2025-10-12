require('dotenv').config();
// console.log(process.env);
const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();
// DB 연결
const connectSequelize = require('./plugins/connectSequelize');
global.$DB = connectSequelize(__dirname + '/models');

// DB 연결 테스트
// $DB.user.findAll().then(users => {
// 	console.log(users);
// });

app.use(koaBody()); // Koa Body Parser

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listen at http://localhost:${PORT}`);
});
