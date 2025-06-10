import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import moment from "moment";
import _ from "lodash";
import { Col, Form, Row, Select } from 'antd';

export default function StackedLineChat({ option, allData }) {
  const stackedLineChatRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(stackedLineChatRef.current);
    const groupByDate = _.groupBy(allData, "date")
    const keys = _.keys(groupByDate);
    const groupByDateArr = keys.map((ele) => {
      return {
        name: ele,
        type: 'line',
        // stack: 'Total',
        data: groupByDate[ele].map(item => item.population),
        country: groupByDate[ele].map(item => item.country),
      }
    })
    const myoption = {
      title: {
        text: 'Stacked Line',
        align: "left"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: keys
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: groupByDateArr.length > 1 ? groupByDateArr[0].country : []
      },
      yAxis: {
        type: 'value'
      },
      series: groupByDateArr,
      ...option
    };

    myChart.setOption(myoption);

    return () => {
      myChart.dispose();
    };
  }, [option, allData]);


  return (<div ref={stackedLineChatRef} style={{ width: "100%", height: "400px" }} />);
}
