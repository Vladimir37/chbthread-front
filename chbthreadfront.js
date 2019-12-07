const Koa = require('koa');
const static = require('koa-static');
const views = require('koa-views');
const cors = require('@koa/cors');
const config = require('./server-config');

const app = new Koa();

app.use(cors());

app.use(static('./dist'));

app.use(views('./dist'));

app.use(async function (ctx) {
    return await ctx.render('index.html');
});

app.listen(config.port);