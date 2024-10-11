const addStackCont = require('./function/addStackCont');
const getStackListCont = require('./function/getStackListCont');
const delStackCont = require('./function/delStackCont');
const { resSuccess } = require('./../../response/result');

const addStack = async (req, res) => {
  const data = await addStackCont(req.body);
  const result = resSuccess(data);
  res.send(result);
  console.log('🚀 ~ addApplication ~ data:', data);
};

const getStackList = async (req, res) => {
  const data = await getStackListCont();
  const result = resSuccess(data);
  // res.send()
  res.send(result);
};

const delStack = async (req, res) => {
  const data = await delStackCont(req.body);
  console.log('🚀 ~ delApplication ~ data:', data);
  const result = resSuccess(data);
  res.send(result);
};

module.exports = {
  addStack,
  getStackList,
  delStack,
};
