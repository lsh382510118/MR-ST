const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const { BUCKET_MAP, isProd } = require('./environment');
const { REGION } = require('./environment');
const { AASA, AASA_MIME, AUTO_DETECT_CONTENT_TYPE } = require('./constant');

const generateUploadParams = (s3Key, localFile, filename, envName) => {
  const fileContent = fs.readFileSync(localFile);
  const extname = path.extname(localFile);
  const bucketFilePath = BUCKET_MAP[envName];

  const params = {
    Bucket: bucketFilePath,
    Key: s3Key,
    Body: fileContent,
    ContentType: '',
  };

  if (AUTO_DETECT_CONTENT_TYPE.includes(extname.toLowerCase())) {
    params.ContentType = mime.contentType(extname) || '';
  } else if (filename.endsWith(AASA)) {
    params.ContentType = AASA_MIME;
  }

  return params;
};
const uploadFile = (params, s3) => {
  console.log('🚀 ~ uploadFile ~ params:', params);
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const uploadDirectory = (
  s3Path,
  localPath = './dist',
  envName,
  s3,
) => {
  // 根据路径读取文件夹/文件 - 文件(夹)名称
  const files = fs.readdirSync(localPath);
  files.forEach((file) => {
    const fullPath = path.join(localPath, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      // 递归
      uploadDirectory(path.join(s3Path, file), fullPath, envName, s3);
    } else {
      // 判断为文件, 通过generateUploadParams方法构造asw-sdk所需要的参数
      const params = generateUploadParams(
        path.join(s3Path, file),
        fullPath,
        file,
        envName,
        s3,
      );
      uploadFile(params, s3);
    }
  });
};

const bucketBaseFilesPath = 'page/';
const repositoriesBasePath = path.join(__dirname, './../../../repositories');

const preUpload = async (opt) => {
  const { appName, envName } = opt;
  //   const { appName } = opt;
  // const envName = 'CHILE_PROD';
  const bucketFilesPath = `${bucketBaseFilesPath}${appName}`;
  const localPath = `${repositoriesBasePath}/${appName}/dist`;
  const PAK = '123';
  const PSK = '123';
  const AK = '123';
  const SK = '123';

  AWS.config.update({
    region: REGION,
    accessKeyId: isProd(envName) ? PAK : AK,
    secretAccessKey: isProd(envName) ? PSK : SK,
    httpOptions: {
      timeout: 30 * 1000,
    },
    s3ForcePathStyle: true,
    sslEnabled: false,
  });

  const s3 = new AWS.S3();

  try {
    uploadDirectory(bucketFilesPath, localPath, envName, s3);
  } catch (error) {
    console.error('An error occurred during pre-upload:', error);
  }
};

module.exports = preUpload;
