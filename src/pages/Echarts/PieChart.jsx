
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import _ from "lodash";

export default function PieChart({ option }) {
  const pieChartRef = useRef(null);
  console.log("option", option);
  
  useEffect(() => {
    const myChart = echarts.init(pieChartRef.current);
    
    const myOption = {
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 80,
      },
      series: [
        {
          name: 'population',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    if (!_.isEmpty(option) ) {
      myChart.setOption({
        ...myOption,
        ...option,
        series: {...myOption.series[0], ...option?.series[0]}
      });
    } else {
      myChart.setOption(myOption);
    }
    
    return () => {
      myChart.dispose();
    };
  }, [option]);

  return <div ref={pieChartRef} style={{ width: '100%', height: '400px' }} />;
}
