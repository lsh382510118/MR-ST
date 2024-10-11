const AWS = require('aws-sdk');
const { REGION } = require('./environment');

const PAK = 'xxx';
const PSK = 'xxxx';

AWS.config.update({
  region: REGION,
  accessKeyId: PAK,
  secretAccessKey: PSK,
  httpOptions: {
    timeout: 30 * 1000,
  },
  s3ForcePathStyle: true,
  sslEnabled: false,
});

const s3 = new AWS.S3();


const uploadFile = (params) => {
  console.log('🚀 ~ uploadFile ~ params:', params);
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = { uploadFile };