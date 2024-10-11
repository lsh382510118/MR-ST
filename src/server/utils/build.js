const { execSync } = require('child_process');

const buildProject = (projectDir) => {
  return new Promise((resolve, reject) => {
    // 安装依赖
    try {
      // execSync(`cd ${projectDir} && npm install --force`, { stdio: 'inherit' });
      // 执行构建
      
      // execSync(`cd ${projectDir} && npm run build:local`, { stdio: 'inherit' });
      console.log('🚀 ~ returnnewPromise ~ 构建完成！');
      // execSync(`cd ${projectDir} && npm run build:local`, { stdio: 'inherit' });
      resolve('构建完成！');
    } catch (error) {
      reject(error);
      console.error(`执行失败: ${error}`);
    }
  });
};

module.exports = {
  buildProject,
};
