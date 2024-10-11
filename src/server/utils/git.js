/* eslint-disable import/no-extraneous-dependencies */
const NodeGit = require('nodegit');
const path = require('path');
const fs = require('fs');
const { deleteFolder } = require('./file');
const { buildProject } = require('./build');
const uploadS3 = require('./uploadS3/upload');

let repository = null;
const basePath = './../../repositories';
const cloneRepository = (params) => {
  const {
    name, repoUrl, account, psw
  } = params;
  // const {url, name, psw} = params;
  // const url = 'http://globaltech-code.alipay.com/Banco/adw-h5-demo.git';
  // const account = 'lian.junqiang@iwhalecloud.com';
  // const branchName = '9A-chore-nodegittest';
  // const psw = 'LuvZ7wTgYmdMzpUGXoae';

  return new Promise(async (resolve) => {
    try {
      const localPath = path.resolve(__dirname, `${basePath}/${name}`);
      await deleteFolder(localPath);
      // 克隆仓库
      const repo = await NodeGit.Clone.clone(repoUrl, localPath, {
        fetchOpts: {
          callbacks: {
            // credentials: function () {
            //   // 返回 NodeGit.Cred.sshKeyNew(...) 或其他认证方式
            //   // return NodeGit.Cred.userpassPlaintextNew("username", "password");
            //   return NodeGit.Cred.userpassPlaintextNew(account, psw);
            // },
            credentials: () => NodeGit.Cred.userpassPlaintextNew(account, psw),
          },
        },
      });
      if (repo) {
        resolve({ state: true });
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
};

const getCredentialsInfo = async (appId) => {
  const jsonPath = path.join(__dirname, './../data/application.json');
  try {
    const data = await fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(data);
    const appInfo = jsonData.list.filter(
      item => item.id.toString() === appId,
    )[0];
    return appInfo;
  } catch (err) {
    console.error('读取或解析文件时出错:', err);
  }
  return {};
};

const checkoutBranch = async (params) => {
  const {
    appId, appName, branchName, bucketName, envName
  } = params;

  const localPath = path.resolve(__dirname, `${basePath}/${appName}`);
  const appInfo = await getCredentialsInfo(appId);
  const { account, psw } = appInfo;

  return new Promise((resolve, reject) => {
    NodeGit.Repository.open(localPath)
      .then((repo) => {
        repository = repo;
        return repository.fetchAll({
          callbacks: {
            credentials: () => NodeGit.Cred.userpassPlaintextNew(account, psw),
          },
        });
      })
      // Now that we're finished fetching, go ahead and merge our local branch
      // with the new one
      .then(() => repository.mergeBranches('master', `origin/${branchName}`))
      .then(() => buildProject(localPath).then((res) => {
        if (res) {
          uploadS3({
            appId,
            appName,
            branchName,
            bucketName,
            envName,
          });
        }
        resolve(res);
      }).catch((err) => {
        reject(err);
      }));
  });
};

// cloneRepository();

module.exports = {
  cloneRepository,
  checkoutBranch,
};
