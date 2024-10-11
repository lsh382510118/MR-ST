const AUTO_DETECT_CONTENT_TYPE = [
  '.html',
  '.xml',
  '.css',
  '.js',
  '.otf',
  '.woff2',
  '.woff',
  '.eot',
  '.ttf',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.svg',
  '.json',
  '.ogg',
  '.txt',
  '.wasm',
  '.gz',
];

const AASA = 'apple-app-site-association';
const AASA_MIME = 'application/json; charset=utf-8';
const MARMOT_CDN_URL = 'https://marmot-local-dev.oss-accelerate.aliyuncs.com';
const TEST_MARMOT_CDN_URL = 'http://icash-dev-oss.marmot-cloud.com';

const PUBLIC_PATH_MAPS = {
  CHILE_DEV1: 'https://h5-saas-dev1-cirrus.bancoestado.cl',
  CHILE_TEST1: 'https://h5-saas-dev1-cirrus.bancoestado.cl',
  CHILE_UAT1: 'https://h5-saas-uat-cirrus.bancoestado.cl',
  CHILE_SIT1: 'https://h5-saas-sit-cirrus.bancoestado.cl',
  CHILE_PRE: 'h5.saas.pre.cirrus.bestado.cl',
  CHILE_PROD: 'h5z1.saas.cirrus.bestado.cl',
}

module.exports = {
  AASA, AASA_MIME, AUTO_DETECT_CONTENT_TYPE, MARMOT_CDN_URL, TEST_MARMOT_CDN_URL, PUBLIC_PATH_MAPS,
};