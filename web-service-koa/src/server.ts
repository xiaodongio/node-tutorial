import Koa from 'koa';
import Router from "koa-router";

const app:Koa = new Koa();
const router:Router = new Router();

router.get('/*', async (ctx) => {
  ctx.body = "Hello Koa";
})

app.use(router.routes());   // 使用路由

app.listen(3000);           // 监听8080端口

console.log("Server running on http://localhost:3000");
