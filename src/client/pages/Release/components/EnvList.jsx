import React from 'react';
import { post, get } from './../../../request/index';
import {
  Button, Card, Col, Row, Statistic
} from 'antd';

const IterationInfo = (props) => {
  const { data, iterationInfo } = props;
  console.log('🚀 ~ IterationInfo ~ data:', data);
  if (!iterationInfo || !data) {
    return false;
  }

  const onPublish = async (item) => {
    console.log('🚀 ~ onPublish ~ item:', item);
    console.log('🚀 ~ onPublish ~ IterationInfo:', iterationInfo);
    const res = await post('/api/publish', {
      bucketName: item?.bucketName,
      envName: item?.name,
      appName: iterationInfo?.appName,
      branchName: iterationInfo?.branchName,
      appId: iterationInfo?.appId,
    });
  };

  return (
    <Row gutter={16}>
      {data.map((item) => {
        return (
          <Col span={8} key={item.key}>
            <Card bordered={false}>
              <Statistic
                title={item?.name}
                value={item?.description}
                precision={2}
              />
              <Button
                type="primary"
                className="publish-btn"
                onClick={() => {
                  onPublish(item);
                }}
              >
                Publish
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default IterationInfo;
