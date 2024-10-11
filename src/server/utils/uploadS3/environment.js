const REGION = 'us-east-1';

const BUCKET_MAP = {
  CHILE_DEV1: 'xxx',
};

const isProd = env => env === 'CHILE_PROD';

module.exports = {
  REGION,
  BUCKET_MAP,
  isProd,
};
