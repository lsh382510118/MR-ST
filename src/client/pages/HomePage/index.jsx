import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Modal, Input, Table, Form, Select, Row, Col
} from 'antd';
import { post, get } from '../../request/index';
import './index.less';
import { columns } from './constants/index';
import SubTitle from '../../components/SubTitle';

function HomePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentVariant, setComponentVariant] = useState('filled');
  const [list, setList] = useState([]);
  const [form] = Form.useForm();
  const [appList, setAppList] = useState([]);

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };


  const getList = async () => {
    const res = await get('/api/iteration/list');
    const iterationList = res?.result?.list;
    const apps = {};
    // eslint-disable-next-line array-callback-return
    iterationList.map((item) => {
      const { appId } = item;
      console.log('🚀 ~ getList ~ item:', item);
      if (!apps[appId]) {
        apps[appId] = [item];
      } else {
        apps[appId].push(item);
      }
    });
    console.log('🚀 ~ getList ~ apps:', apps);
    setList(apps);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Received values of form:', values);
        const res = await post('/api/iteration/add', values);
        console.log('🚀 ~ handleOk ~ res:', res);
        getList();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAppList = async () => {
    const res = await get('/api/application/list');
    setAppList(res?.result?.list);
    console.log('🚀 ~ handleOk ~ res:', res);
  };

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
    getAppList();
    getList();
  }, []);

  const onClickItem = (item) => {
    navigate(`/release?id=${item?.id}`);
  };

  return (
    <div className="home-wrap">
      <div className="app-operation">
        <Button type="primary" onClick={showModal}>
          Add Iteration
        </Button>
      </div>

      <div className="home-box">
        <Row gutter={16}>
          {list
            && Object.keys(list).map((app) => {
              console.log(app);
              console.log(list);
              return (
                <Col span={8}>
                  <div className="app-iteration-box">
                    <SubTitle title={list[app][0].appName} />

                    <Table
                      onRow={record => ({
                        onClick: () => {
                          onClickItem(record);
                        },
                      })}
                      pagination={false}
                      dataSource={list[app]}
                      columns={columns}
                    />
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>

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
            label="App Name"
            name="appId"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Select>
              {appList.map(app => (
                <Select.Option key={app.id} value={app.id}>
                  {app.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Iteration Name"
            name="iterationName"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Branch Name"
            name="branchName"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default HomePage;
