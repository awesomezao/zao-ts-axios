const Router=require('koa-router')
const {testData}=require('../mock/data')

const mockRouter = new Router();

mockRouter.get('/', async (ctx) => {
  console.log(ctx.request)
  ctx.body = testData
});
mockRouter.post('/', async (ctx) => {
  console.log(ctx)
  
  ctx.body = testData
});

module.exports=mockRouter
