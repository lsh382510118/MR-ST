// const fs = require('fs');
// const path = require('path');
const { checkoutBranch } = require('./../../../utils/git');

const publishCont = async (params) => {
  const res = await checkoutBranch(params);
  console.log('🚀 ~ publishCont ~ res:', res);
  return res;
};

module.exports = publishCont;
