import React, { useState, useContext, useRef, useEffect } from "react";
import PieChart from './PieChart';
import BarChart from "./BarCharts";
import VerticalBarCharts from './VerticalBarCharts'

const Echarts = () => {
    return (
        <div>
            <h1>ECharts 饼图</h1>
            <PieChart />
            <h1>ECharts 柱状图</h1>
            <BarChart />
            <VerticalBarCharts />
        </div>
    );
}

export default Echarts;
