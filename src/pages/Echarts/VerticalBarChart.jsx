
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import _ from "lodash";

export default function VerticalBarChart({ allData }) {
  console.log("allData", allData);
  const barChartRef = useRef(null);
  
  useEffect(() => {
    const myChart = echarts.init(barChartRef.current);
    const groupByDate = _.groupBy(allData, "date")
    const keys = _.keys(groupByDate);
    const groupByDateArr = keys.map((ele) => {
      return {
        name: ele,
        type: "bar",
        data: groupByDate[ele].map(item => item.population),
        country: groupByDate[ele].map(item => item.country),
      }
    })

    console.log("groupByDate", groupByDate,keys, groupByDateArr);

    
    const option = {
        title: {
          text: 'World Population'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: groupByDateArr.length > 1 ? [...(groupByDateArr[0].country).reverse(), "World"] : []
        },
        series: groupByDateArr.map((ele) => ({
          ...ele,
          data: [...(ele.data).reverse(), _.reduce(ele.data, function(sum, n) {
            return sum + n;
          }, 0)]
        }))
      };

    myChart.setOption(option);
    
    return () => {
      myChart.dispose();
    };
  }, [allData]);

  return <div ref={barChartRef} style={{ width: '100%', height: '400px' }} />;
}
