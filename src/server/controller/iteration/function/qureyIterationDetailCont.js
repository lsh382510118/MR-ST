const fs = require('fs');
const path = require('path');

const qureyIterationDetailCont = async (params) => {
  const { id } = params;

  const iterationJsonPath = path.join(
    __dirname,
    './../iteration.json',
  );
  const iterationList = await fs.readFileSync(iterationJsonPath, 'utf8');
  const iterationItem = JSON.parse(iterationList).list.filter(
    item => item.id.toString() === id,
  );
  console.log('🚀 ~ qureyIterationDetailCont ~ iterationItem:', iterationItem);
  return iterationItem[0];
};

module.exports = qureyIterationDetailCont;
