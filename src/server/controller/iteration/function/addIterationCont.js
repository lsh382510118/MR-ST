const fs = require('fs');
const path = require('path');

const addIterationCont = async (params) => {
  const { appId } = params;

  const appJsonPath = path.join(
    __dirname,
    './../../application/application.json',
  );
  const appsList = await fs.readFileSync(appJsonPath, 'utf8');

  const appItem = JSON.parse(appsList).list.filter(item => item.id.toSring() === appId);

  const item = { ...params, id: Date.now(), appName: appItem[0].name };

  const jsonPath = path.join(__dirname, './../iteration.json');

  try {
    const data = await fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.list.push(item);
    fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) throw err;
      return jsonData;
    });
  } catch (err) {
    console.error('读取或解析文件时出错:', err);
  }
  return {};
};

module.exports = addIterationCont;
