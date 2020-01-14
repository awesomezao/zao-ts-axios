const Mock=require('mockjs')
const Random = Mock.Random;
exports.testData = Mock.mock({
  'user|10': [
    {
      'id|+1': 1123,
      name: '@cname',
      email: '@email',
      avatar: '@image(300x300)'
    }
  ]
});
