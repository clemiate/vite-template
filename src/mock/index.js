import user from './user';

export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => ({
      code: 200,
      data: { name: 'Mock User', age: 25 },
    }),
  },
];