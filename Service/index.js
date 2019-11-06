const http = require('http');
const https = require('https');
const Koa = require('koa');
const cors = require('koa-cors');
const app = new Koa();
app.use(cors());
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...${ctx.request.body}`);
    await next();
});
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
/**
 * 下载图片
 */
const send = require('koa-send');
router.get('/download/:name', async (ctx,next) =>{
    const name = ctx.params.name;
    const path = `upload/${name}`;
    ctx.attachment(path);
    await send(ctx, path);
     
 })
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
