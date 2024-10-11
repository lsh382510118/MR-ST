import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { post, get } from '../../request/index';
import './index.less';
import IterationInfo from './components/IterationInfo';
import EnvList from './components/EnvList';
import Title from '../../components/Title';

function Release() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [iterationInfo, setIterationInfo] = useState(null);
  const [envList, setEnvList] = useState(null);

  const getIterationInfo = async (id) => {
    const res = await post('/api/iteration/detail', { id });
    setIterationInfo(res.result);
  };

  const getEnvList = async () => {
    const res = await get('/api/environment/list');
    setEnvList(res?.result?.list);
  };

  useEffect(() => {
    getIterationInfo(id);
    getEnvList();
  }, []);

  return (
    <div className="release-wrap">
      <div className="iteration-box">
        <Title txt="Iteration Info" />
        {iterationInfo && <IterationInfo data={iterationInfo} />}
      </div>

      <div className="env-box">
        <Title txt="Environment Info" />
        {iterationInfo && envList && (
          <EnvList data={envList} iterationInfo={iterationInfo} />
        )}
      </div>
    </div>
  );
}

export default Release;
