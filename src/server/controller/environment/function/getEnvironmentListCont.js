const fs = require('fs');
const path = require('path');


const getEnvironmentListCont = async () => {
  const jsonPath = path.join(__dirname, './../environment.json');
  try {
    const data = await fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('读取或解析文件时出错:', err);
  }
  return {};
};

module.exports = getEnvironmentListCont;
