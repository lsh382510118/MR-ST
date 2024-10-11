import React, { useState, useEffect } from 'react';
import {
  Button, Modal, Input, Table, Form
} from 'antd';
import { post, get } from '../../request/index';
import './index.less';

function Environment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [componentVariant, setComponentVariant] = useState('filled');
  const [form] = Form.useForm();

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getData = async () => {
    const res = await get('/api/environment/list');
    setList(res?.result?.list);
    console.log('🚀 ~ handleOk ~ res:', res);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Received values of form:', values);
        const res = await post('/api/environment/add', values);
        console.log('🚀 ~ .then ~ res:', res);
        getData();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'Env Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'BucketName',
      dataIndex: 'bucketName',
      key: 'bucketName',
    },
    // {
    //   title: '区域',
    //   dataIndex: 'region',
    //   key: 'region',
    // },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: () => <a href>Detail</a>,
    },
  ];
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="environment">
      <div className="app-operation">
        <Button type="primary" onClick={showModal}>
          Add Environment
        </Button>
      </div>

      <div className="table-box">
        <Table dataSource={list} columns={columns} />
      </div>
      <Modal
        title="Add Environment"
        open={isModalOpen}
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          onValuesChange={onFormVariantChange}
          variant={componentVariant}
          style={{ maxWidth: 600 }}
          initialValues={{ variant: componentVariant }}
          form={form}
          name="environmentForm"
          className="environment-form"
        >
          <Form.Item
            label="Environment Name"
            name="name"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="bucketName"
            name="bucketName"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Access Key ID"
            name="ak"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Access Key Secret"
            name="sk"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Environment;
