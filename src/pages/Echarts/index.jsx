import React, { useState, useContext, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Col, Form, Row, Select } from 'antd';
import _ from "lodash";
import PieChart from './PieChart';
import BarChart from "./BarChart";
import VerticalBarChart from './VerticalBarChart';
import MultipleYChart from './MultipleYChart';
import StackedLineChat from './StackedLineChat';

const timestampId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

const mockdata = [
  {
    id: timestampId(),
    date: "2025",
    country: "India",
    population: 14.94,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌China‌",
    population: 14.86,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌United States",
    population: 3.64,
    region: "North America",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Indonesia‌",
    population: 3.17,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Nigeria‌",
    population: 2.89,
    region: "Africa",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Pakistan‌",
    population: 2.57,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Brazil‌",
    population: 2.33,
    region: "South America",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Bangladesh‌",
    population: 2.33,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Russia‌",
    population: 1.43,
    region: "Europe",
  },
  {
    id: timestampId(),
    date: "2025",
    country: "‌Mexico‌",
    population: 1.35,
    region: "North America",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "India",
    population: 14.33,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌China‌",
    population: 14.09,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌United States",
    population: 3.37,
    region: "North America",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Indonesia‌",
    population: 2.81,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Pakistan‌",
    population: 2.4,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Nigeria‌",
    population: 2.23,
    region: "Africa",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Brazil‌",
    population: 2.16,
    region: "South America",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Bangladesh‌",
    population: 1.73,
    region: "Asia",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Russia‌",
    population: 1.43,
    region: "Europe",
  },
  {
    id: timestampId(),
    date: "2024",
    country: "‌Mexico‌",
    population: 1.28,
    region: "North America",
  },
];


const Echarts = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [defaultDataSource, setDefaultDataSource] = useState([]);
  const [allData, setAllData] = useState([]);
  const [defaultAllData, setDefaultAllData] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [defaultCountryList, setDefaultCountryList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025');
  const [barChartOption, setBarChartOption] = useState({});
  const [pieChartOption, setPieChartOption] = useState({});

  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // const data = { message: "data load successfully" };
        resolve(mockdata); // 成功时调用resolve
      }, 1000); // 模拟1秒后返回数据
    });
  }

  console.log("selectedDate", selectedDate);

  useEffect(() => {
    // 使用Promise
    fetchData()
      .then((data) => {
        const countryList = _.uniq(data.map((ele) => ele.country));
        const dateList = _.uniq(data.map((ele) => ele.date));
        const regionList = _.uniq(data.map((ele) => ele.region));
        console.log("data", data, countryList, dateList);

        // setDataSource(data);
        // setDefaultDataSource(data);

        setAllData(data);
        setDefaultAllData(data);
        // setCountryList(countryList);
        setDefaultCountryList(countryList);
        setDateList(dateList);
        setRegionList(regionList)
        if (selectedDate) {
          const filtereData = data.filter(ele => ele.date === selectedDate);
          setDataSource(filtereData);
          setDefaultDataSource(filtereData);
        }
      })
      .catch((error) => {
        console.error(error); // 如果出错，这里会捕获错误
      });
  }, []);

  useEffect(() => {

    const barChartOption = {
      title: {
        text: `Latest ${selectedDate}  World's Top 10 Most Populous Countries`,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: dataSource.map(ele => ele.country),
          axisLabel: {
            interval: 0,
            rotate: 40  // 倾斜40度，空间不足时增加角度 :ml-citation{ref="3,5" data="citationList"}
          }
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} 亿",
          },
        },
      ],
      series: [
        {
          name: "亿",
          type: "bar",
          barWidth: "60%",
          data: dataSource.map(ele => ele.population),
        },
      ],
    };
    setBarChartOption(barChartOption);

    const pieChartOption = {
      title: {
        text: `Latest ${selectedDate}  World's Top 10 Most Populous Countries`,
      },
      series: [
        {
          data: dataSource.map(ele => ({
            name: ele.country,
            value: ele.population
          }))
        }
      ]
    }

    setPieChartOption(pieChartOption)

  }, [selectedDate, dataSource]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const _dataSource = allData.filter(ele => ele.date === date);
    setDataSource(_dataSource);
    setDataSource(_dataSource);
  }

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    let _dataSource = [];
    let _countryList = [];
    let _allData = [];

    if (region) {
      _dataSource = defaultDataSource.filter(ele => ele.region === region); 
      _countryList = _.uniq(_dataSource.map((ele) => ele.country));
      _allData = defaultAllData.filter(ele => ele.region === region);
    } else {
      _dataSource = defaultDataSource;
      _countryList = defaultCountryList;
      _allData = defaultAllData;
    }
  
    setDataSource(_dataSource);
    setCountryList(_countryList);
    setSelectedCountry("");
    form.setFieldValue("Country", "");
    setAllData(_allData);
  }

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    let _dataSource = [];
    let _allData = [];

    if (country) {
      _dataSource = defaultDataSource.filter(ele => ele.country === country); 
      _allData = defaultAllData.filter(ele => ele.country === country); 
    } else {
      if (selectedRegion) {
        _dataSource = defaultDataSource.filter(ele => ele.region === selectedRegion); 
        _allData = defaultAllData.filter(ele => ele.region === selectedRegion); 
      } else {
        _dataSource = defaultDataSource;
        _allData = defaultAllData;
      }
    }
  
    setDataSource(_dataSource);
  }

  console.log("dataSource", dataSource, allData);

  return (
    <div>
      <Form form={form}
        initialValues={{
          Year: selectedDate,
          Region: selectedRegion,
          Country: selectedCountry
        }}
      >
        <Row gutter={24}>
          <Col lg={8} md={12}>
            <Form.Item
              name="Region"
              label="Region"
            >
              <Select
                allowClear
                placeholder="please select region"
                options={regionList.map((ele) => ({
                  value: ele,
                  label: ele,
                }))}
                style={{ minWidth: 200 }}
                onChange={handleRegionChange}
                value={selectedRegion}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={12}>
            <Form.Item
              name="Country"
              label="Country"
            >
              <Select
                allowClear
                placeholder="please select country"
                options={countryList.map((ele) => ({
                  value: ele,
                  label: ele,
                }))}
                value={selectedCountry}
                style={{ minWidth: 200 }}
                onChange={handleCountryChange}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={12}>
            <Form.Item
              name="Year"
              label="Year"
            >
              <Select
                // allowClear
                placeholder="please select year"
                options={dateList.map((ele) => ({
                  value: ele,
                  label: ele,
                }))}
                onChange={handleDateChange}
                style={{ minWidth: 200 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col lg={12} md={24}> 
          <PieChart option={pieChartOption} dataSource={dataSource}/>
        </Col>
        <Col lg={12} md={24}> 
          <BarChart option={barChartOption} />
        </Col>
        <Col lg={12} md={24}> 
          <VerticalBarChart allData={allData} />
        </Col>
        <Col lg={12} md={24}> 
          <StackedLineChat allData={allData} />
        </Col>
        <Col lg={12} md={24}> 
          <MultipleYChart allData={allData} />
        </Col>
      </Row>
     
    </div>
  );
}

export default Echarts;
