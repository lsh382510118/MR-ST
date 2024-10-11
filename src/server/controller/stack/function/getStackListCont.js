const fs = require('fs');
const path = require('path');

const getApplicationListCont = async () => {
  try {
    const data = await fs.readFileSync(
      path.join(__dirname, './../data.json'),
      'utf8',
    );
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('读取或解析文件时出错:', err);
  }
  return {};
};

module.exports = getApplicationListCont;
