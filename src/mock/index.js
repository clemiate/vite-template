import Mock from "mockjs";
export default [
  // 模拟用户列表接口
  {
    url: "/api/users",
    method: "get",
    response: {
      status: 200,
      "data|18": [
        {
          // 生成10条数据
          id: "@id", // 随机ID
          key: "@id",
          name: "@name",
          email: "@email",
          "age|18-60": 1,
          phone: /^1[3-9]\d{9}$/,
          address: "London, Park Lane no. 1",
        },
      ],
    },
  },
];

// Mock.Random.extend({
//   customCountry: function() {
//     const countries = ['USA', 'UK', 'Canada', 'Australia'];
//     return this.pick(countries);  // 随机选取预设英文国家名:ml-citation{ref="5,9" data="citationList"}
//   }
// });

// const data = Mock.mock({
//   'country': '@customCountry'  // 输出如"Canada":ml-citation{ref="5" data="citationList"}
// });
