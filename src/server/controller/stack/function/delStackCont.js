const path = require('path');
const { find, remove } = require('lodash');
const { deleteFolder, readJosn, writeJosn } = require('@utils/file');

const repositoriesBasePath = path.join(__dirname, './../../../../repositories');
const jsonPath = path.join(__dirname, './../data.json');
const delApplicationCont = async (params) => {
  const { id } = params;

  const data = await readJosn(jsonPath);
  const jsonData = JSON.parse(data);

  const itemData = find(jsonData.list, ['id', id]);
  const { name } = itemData;
  const repositoriePath = `${repositoriesBasePath}/${name}`;
  await deleteFolder(repositoriePath);
  remove(jsonData.list, n => n.id === id);
  writeJosn({
    folderPath: jsonPath,
    data: jsonData,
  });
  return {};
};

module.exports = delApplicationCont;
