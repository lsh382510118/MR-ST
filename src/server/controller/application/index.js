const addApplicationCont = require('./function/addApplicationCont');
const getApplicationListCont = require('./function/getApplicationListCont');
const delApplicationCont = require('./function/delApplicationCont');
const { resSuccess } = require('./../../response/result');

const addApplication = async (req, res) => {
  const data = await addApplicationCont(req.body);
  const result = resSuccess(data);
  res.send(result);
  console.log('🚀 ~ addApplication ~ data:', data);
};

const getApplicationList = async (req, res) => {
  const data = await getApplicationListCont();
  const result = resSuccess(data);
  // res.send()
  res.send(result);
};

const delApplication = async (req, res) => {
  const data = await delApplicationCont(req.body);
  console.log('🚀 ~ delApplication ~ data:', data);
  const result = resSuccess(data);
  res.send(result);
};

module.exports = {
  addApplication,
  getApplicationList,
  delApplication,
};
