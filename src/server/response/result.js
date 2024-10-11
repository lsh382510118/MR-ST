const resSuccess = (res, msg = 'successfil') => {
  return {
    resultCode: '0000',
    resultStatue: 'successful',
    resultMessage: msg,
    result: res,
  };
};

const resFailed = (res, msg = 'failed') => {
  return {
    resultCode: '0000',
    resultStatue: 'failed',
    resultMessage: msg,
    result: res,
  };
};

module.exports = {
  resSuccess,
  resFailed,
};
