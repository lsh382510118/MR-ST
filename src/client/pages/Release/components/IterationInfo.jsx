import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';

const IterationInfo = (props) => {

  const { data } = props;
  if (!data) {
    return
  }
  const { appName, branchName, iterationName } = data;
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="应用名称"
            value={appName}
            precision={2}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="分支名称"
            value={branchName}
            precision={2}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="迭代名称"
            value={iterationName}
            precision={2}
          />
        </Card>
      </Col>
    </Row>
  )
};

export default IterationInfo;