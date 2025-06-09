
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function VerticalBarCharts() {
  const barChartRef = useRef(null);
  
  useEffect(() => {
    const myChart = echarts.init(barChartRef.current);
    
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
          data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      };

    myChart.setOption(option);
    
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={barChartRef} style={{ width: '100%', height: '400px' }} />;
}
