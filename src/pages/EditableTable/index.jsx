import React, { useState, useContext, useRef, useEffect } from "react";
// import { useSetState, useMount } from "react-use";
import {
  Table,
  Input,
  Button,
  Col,
  Form,
  Row,
  Select,
  Space,
  Popconfirm,
  Typography,
  InputNumber,
  DatePicker
} from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import axios from 'axios';
import moment from "moment";

import "./index.scss";
import countryData from "@/mock/country.json";

const { Option } = Select;
const { RangePicker } = DatePicker;

const EditableTable = () => {
  const [searchForm] = Form.useForm();
  const [editableTableForm] = Form.useForm();
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  // 分页相关参数
  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/users').then(res => {
      console.log("res", res);
      if (res.status === 200) {
        setDataSource(res.data.data)
        setPage({
          pageNum: page.pageNum,
          pageSize: page.pageSize,
          // total: res.data.data.length,
        });
        setLoading(false);
      } else {
        setDataSource([]);
      }
    });
  }, []);

  const onSearch = () => {
    const values = searchForm.getFieldsValue();

    const params = {
      current_page: page.pageNum,
      page_size: page.pageSize,
      country: values.country || "",
      content: values.content || "",
      start_time: values.date_range
        ? moment(values.date_range[0])
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss")
        : "",
      end_time: values.date_range
        ? moment(values.date_range[1])
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss")
        : "",
    };

    console.log("onSearch", values, params);

  }

  // 表格页码改变
  const onTablePageChange = (pageNum, pageSize) => {
    onSearch({ pageNum, pageSize });
    setPage({
      pageNum,
      pageSize
    });
  };


  // Function to add a new row
  // This function creates a new data object and updates the dataSource state
  const handleAdd = () => {
    const newData = {
      key: count,
      name: ``,
      age: "",
      phone: "",
      email: "",
      address: ``,
    };
    setDataSource([newData, ...dataSource]);
    setEditingKey(count);
    setCount(count + 1);
  };

  const handleEdit = (record) => {
    editableTableForm.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleSave = async (key) => {
    try {
      const row = (await editableTableForm.validateFields()) || {};

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // component for editable cell
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const components = {
    body: {
      // row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: 120,
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: 100,
      editable: true,
    },
    {
      title: "phone",
      dataIndex: "phone",
      width: 120,
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: 120,
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: 200,
      editable: true,
      render: (value, record, index) => {
        return  value ? `${value} ${index}` : ""
      }
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: 200,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => handleSave(record.key)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => handleEdit(record)}
              style={{ marginInlineEnd: 8 }}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Typography.Link disabled={editingKey !== ""} type="danger">Delete</Typography.Link>
            </Popconfirm>
          </>
        );
      }
    },

  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text', // ro
        // todo 多类型的数据switch处理, select
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  const AdvancedSearchForm = ({ searchForm }) => {

    const getFields = () => {
      return (
        <React.Fragment>
          <Col span={6}>
            <Form.Item name="country" label="Country">
              <Select
                showSearch
                allowClear
                placeholder="please select country"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={countryData.map((ele) => ({
                  value: ele?.name.common,
                  label: ele?.name.common,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="content" label="Content" rules={[{ max: 50 }]}>
              <Input placeholder="please input" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="date_range" label="Date">
              <RangePicker allowClear />
            </Form.Item>
          </Col>
        </React.Fragment>
      );
    };

    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };

    return (
      <Form
        form={searchForm}
        name="advanced_search"
        className="advanced-searchForm"
      // onFinish={onFinish}
      >
        <Row gutter={24}>
          {getFields()}
          <Col span={6} style={{ textAlign: "right" }}>
            <Space size="small">
              <Button
                type="primary"
                onClick={onSearch}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  onSearch();
                }}
                icon={<SyncOutlined />}
              >
                Reset
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <>
      <AdvancedSearchForm searchForm={searchForm} />
      <div className="editable-table">
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Form form={editableTableForm} component={false}>
          <Table
            loading={loading}
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            pagination={{
              // total: page.total,
              current: page.pageNum,
              pageSize: page.pageSize,
              // showQuickJumper: true, // Go to XX Page
              showTotal: (t) => `Total ${t} items`,
              onChange: onTablePageChange,
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default EditableTable;
