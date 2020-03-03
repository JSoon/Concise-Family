const Koa = require('koa');
const Router = require('@koa/router');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path')
const app = new Koa();
const router = new Router();
const publicPath = '/concise-family'

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// error
app.on('error', async (err, ctx) => {
  console.error('server error', err, ctx)
});

// routes
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
})
// router.get('/concise-slider', async (ctx, next) => {
//   ctx.body = 'Hello World';
// })

app.use(router.routes())

// static assets
const servePublic = serve(path.resolve(__dirname, 'public'))
app.use(servePublic)

// mount route & static assets to specific path
const mountedApp = new Koa()
mountedApp.use(mount(publicPath, app))

mountedApp.listen(4000);