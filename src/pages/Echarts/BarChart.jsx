import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import moment from "moment";
import _ from "lodash";
import { Col, Form, Row, Select } from 'antd';

export default function BarChart({ option }) {
  const barChartRef = useRef(null);

  useEffect(() => {
    const barChart = echarts.init(barChartRef.current);

    const myoption = {
      ...option
    };

    barChart.setOption(myoption);

    return () => {
      barChart.dispose();
    };
  }, [option]);


  return (<div ref={barChartRef} style={{ width: "100%", height: "400px" }} />);
}
