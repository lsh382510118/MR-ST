const addIterationCont = require('./function/addIterationCont');
const getIterationListCont = require('./function/getIterationListCont');
const qureyIterationDetailCont = require('./function/qureyIterationDetailCont');

const { resSuccess } = require('./../../response/result');

const addIteration = async (req, res) => {
  const data = await addIterationCont(req.body);
  const result = resSuccess(data);
  res.send(result);
  console.log('🚀 ~ addApplication ~ data:', data);
};
const getIterationList = async (req, res) => {
  const data = await getIterationListCont();
  const result = resSuccess(data);
  // res.send()
  res.send(result);
};
const qureyIterationDetail = async (req, res) => {
  const data = await qureyIterationDetailCont(req.body);
  const result = resSuccess(data);
  res.send(result);
};

module.exports = {
  getIterationList,
  addIteration,
  qureyIterationDetail,
};
