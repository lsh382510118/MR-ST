const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
require('module-alias/register');
const {
  addEnvironment,
  getEnvironmentList,
} = require('./controller/environment/index');
const {
  addApplication,
  getApplicationList,
  delApplication,
} = require('./controller/application/index');
const {
  getIterationList,
  addIteration,
  qureyIterationDetail,
} = require('./controller/iteration/index');
const { publish } = require('./controller/publish/index');

const app = express();
app.use(express.static('dist'));
app.use(express.json());

app.get('/api/application/list', getApplicationList);
app.post('/api/application/add', addApplication);
app.post('/api/application/del', delApplication);

app.get('/api/environment/list', getEnvironmentList);
app.post('/api/environment/add', addEnvironment);

app.get('/api/iteration/list', getIterationList);
app.post('/api/iteration/add', addIteration);
app.post('/api/iteration/detail', qureyIterationDetail);

app.post('/api/publish', publish);

app.listen(process.env.PORT || 9052, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});
