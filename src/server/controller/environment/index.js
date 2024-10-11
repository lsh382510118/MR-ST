const addEnvironmentCont = require('./function/addEnvironmentCont');
const getEnvironmentListCont = require('./function/getEnvironmentListCont');
const { resSuccess } = require('../../response/result');

const addEnvironment = async (req, res) => {
  const data = await addEnvironmentCont(req.body);
  const result = resSuccess(data);
  res.send(result);
};
const getEnvironmentList = async (req, res) => {
  const data = await getEnvironmentListCont();
  const result = resSuccess(data);
  res.send(result);
};

module.exports = {
  addEnvironment,
  getEnvironmentList,
};
