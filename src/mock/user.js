import Mock from 'mockjs';

export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => ({
      code: 200,
      data: { name: 'Mock User', age: 25 },
    }),
  },
]