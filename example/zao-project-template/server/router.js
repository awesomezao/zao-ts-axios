const Router=require('koa-router')
const {testData}=require('../mock/data')

const mockRouter = new Router();

mockRouter.get('/', async (ctx) => {
  ctx.body = testData
});
mockRouter.post('/', async (ctx) => {
  ctx.body = testData
});

module.exports=mockRouter
