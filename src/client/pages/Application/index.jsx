import React, { useState, useEffect } from 'react';
import {
  Button, Modal, Input, Table, Form, Segmented, message
} from 'antd';
import { post, get } from '../../request/index';
import './index.less';
import { columns } from './constants/index';

function Applications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentVariant, setComponentVariant] = useState('filled');
  const [list, setList] = useState([]);
  const [form] = Form.useForm();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [deleteItem, setDeleteItemData] = useState(null);

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getData = async () => {
    const res = await get('/api/application/list');
    setList(res?.result?.list);
    console.log('🚀 ~ handleOk ~ res:', res);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Received values of form:', values);
        const res = await post('/api/application/add', values);
        console.log('🚀 ~ handleOk ~ res:', res);
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

  const handleCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const openDelConfirm = async (itemData) => {
    setDeleteItemData(itemData);
    setIsCancelModalOpen(true);
  };

  const showAppInfo = async (itemData) => {
    console.log('🚀 ~ showAppInfo ~ itemData:', itemData);
  };

  const deleteApp = async () => {
    const { id } = deleteItem;
    const res = await post('/api/application/del', { id });
    if (res) {
      message.success('delete successful!!', 3);
      setIsCancelModalOpen(false);
      getData();
    }
    console.log('🚀 ~ delApp ~ res:', res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="applications">
      <div className="app-operation">
        <Button type="primary" onClick={showModal}>
          Add Application
        </Button>
      </div>

      <div className="table-box">
        <Table
          dataSource={list}
          columns={[
            ...columns,
            {
              title: 'Action',
              dataIndex: 'index',
              key: 'index',
              render: (text, record) => (
                <>
                  <span
                    className="table-action info"
                    onClick={() => {
                      showAppInfo(record);
                    }}
                  >
                    Detail
                  </span>
                  <span
                    className="table-action del"
                    onClick={() => {
                      openDelConfirm(record);
                    }}
                  >
                    Del
                  </span>
                </>
              ),
            },
          ]}
        />
      </div>
      <Modal
        title="Delete Comfirm"
        open={isCancelModalOpen}
        onOk={deleteApp}
        onCancel={handleCancelModal}
      >
        <p>Are you sure you want to delete this app?</p>
      </Modal>
      <Modal
        title="Add Application"
        open={isModalOpen}
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
            label="Application Name"
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
          <Form.Item label="Type" name="type">
            <Segmented options={['QA', 'PROD']} />
          </Form.Item>
          <Form.Item
            label="RepoUrl"
            name="repoUrl"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account"
            name="account"
            rules={[{ message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="psw"
            rules={[{ message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Applications;
