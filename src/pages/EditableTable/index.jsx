import React, { useState, useContext, useRef, useEffect } from "react";
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
  InputNumber
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from 'axios';


import "./index.scss";

const { Option } = Select;

const AdvancedSearchForm = ({ searchForm }) => {
  const [expand, setExpand] = useState(false);

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Select something!",
                },
              ]}
              initialValue="1"
            >
              <Select>
                <Option value="1">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={searchForm}
      name="advanced_search"
      className="advanced-searchForm"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <div style={{ textAlign: "right" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              searchForm.resetFields();
            }}
          >
            Reset
          </Button>
          {/* <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a> */}
        </Space>
      </div>
    </Form>
  );
};

const EditableTable = () => {
  const [searchForm] = Form.useForm();
  const [editableTableForm] = Form.useForm();
  const [count, setCount] = useState(2);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    axios.get('/api/users').then(res => {
      console.log("res", res);
      if (res.status === 200) {
        setDataSource(res.data.data)
      } else {
        setDataSource([]);
      }
    });
  }, []);

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
    setDataSource([newData,...dataSource]);
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
              <Typography.Link  disabled={editingKey !== ""} type="danger">Delete</Typography.Link>
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


  return (
    <>
      <AdvancedSearchForm searchForm={searchForm} />
      <div className="editable-table">
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Form form={editableTableForm} component={false}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
          />
        </Form>
      </div>
    </>
  );
};

export default EditableTable;
