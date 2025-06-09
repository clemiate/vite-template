import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import moment from "moment";
import _ from "lodash";

const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const mockdata = [
  {
    id: generateUUID(),
    date: "2025",
    country: "India",
    population: 14.94,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌China‌",
    population: 14.86,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌United States",
    population: 3.64,
    region: "North America",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Indonesia‌",
    population: 3.17,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Nigeria‌",
    population: 2.89,
    region: "Africa",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Pakistan‌",
    population: 2.57,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Brazil‌",
    population: 2.33,
    region: "South America",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Bangladesh‌",
    population: 2.33,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Russia‌",
    population: 1.43,
    region: "Europe",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Mexico‌",
    population: 1.35,
    region: "North America",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "India",
    population: 14.33,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌China‌",
    population: 14.09,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌United States",
    population: 3.37,
    region: "North America",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌Indonesia‌",
    population: 2.81,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌Pakistan‌",
    population: 2.4,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌Nigeria‌",
    population: 2.23,
    region: "Africa",
  },
  {
    id: generateUUID(),
    date: "2024",
    country: "‌Brazil‌",
    population: 2.16,
    region: "South America",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Bangladesh‌",
    population: 1.73,
    region: "Asia",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Russia‌",
    population: 1.43,
    region: "Europe",
  },
  {
    id: generateUUID(),
    date: "2025",
    country: "‌Mexico‌",
    population: 1.28,
    region: "North America",
  },
];
export default function BarChart() {
  const barChartRef = useRef(null);
  // 示例输出："d1b3a8e2-4f6c-4a2b-b1c7-3e5f6a8b9c0d"

  console.log("data", mockdata);

  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // const data = { message: "data load successfully" };
        resolve(mockdata); // 成功时调用resolve
      }, 1000); // 模拟1秒后返回数据
    });
  }

  useEffect(() => {
    // 使用Promise
    fetchData()
      .then((data) => {
        console.log(data.data); // 输出：{ message: "数据加载成功" }
        const countryList = _.uniq(data.map((ele) => ele.country));
        const dateList = _.uniq(data.map((ele) => ele.date));
        const region = _.uniq(data.map((ele) => ele.date));
        console.log("data", data, countryList, dateList);
      })
      .catch((error) => {
        console.error(error); // 如果出错，这里会捕获错误
      });
    const myChart = echarts.init(barChartRef.current);
    const option = {
      title: {
        text: "示例柱状图",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} ml",
          },
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <>
      <div></div>

      <div ref={barChartRef} style={{ width: "100%", height: "400px" }} />
    </>
  );
}
