
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function BarChart() {
  const barChartRef = useRef(null);

  const data = [{
    id: "1",
    date: "2024-01",
    value: 10
  }];
  
  useEffect(() => {
    const myChart = echarts.init(barChartRef.current);
    
    const option = {
      title: {
        text: '示例柱状图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} ml'
          }
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
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
