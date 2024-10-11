const fs = require('fs');
const path = require('path');

const addEnvironmentCont = async (params) => {
  const item = { ...params, id: Date.now() };
  const jsonPath = path.join(__dirname, './../environment.json');

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
};

module.exports = addEnvironmentCont;
