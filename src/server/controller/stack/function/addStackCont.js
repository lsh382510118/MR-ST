const fs = require('fs');
// eslint-disable-next-line import/no-unresolved
const { cloneRepository } = require('@utils/git');
const path = require('path');

const addApplicationCont = async (params) => {
  const item = { ...params, id: Date.now() };
  try {
    const data = await fs.readFileSync(
      path.join(__dirname, './../data.json'),
      'utf8',
    );
    const jsonData = JSON.parse(data);
    const cloneResult = await cloneRepository(params);
    if (cloneResult.state) {
      jsonData.list.push(item);
      fs.writeFile(
        './../data.json',
        JSON.stringify(jsonData, null, 2),
        (err) => {
          if (err) throw err;
          return jsonData;
        },
      );
    } else {
      return 'failed';
    }
  } catch (err) {
    console.error('读取或解析文件时出错:', err);
  }
  return {};
};

module.exports = addApplicationCont;
