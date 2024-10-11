const { exec } = require('child_process');
const fs = require('fs');

function deleteFolder(folderPath) {
  return new Promise((resolve) => {
    exec(
      //   `rm -rf "${folderPath}" && mkdir -p "${folderPath}"`,
      `rm -rf "${folderPath}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`Deleted and recreated folder: ${folderPath}`);
        resolve(true);
      },
    );
  });
}

function readJosn(folderPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.readFileSync(folderPath, 'utf8');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function writeJosn(params) {
  const { folderPath, data } = params;
  return new Promise(async (resolve, reject) => {
    try {
      await fs.writeFile(
        folderPath,
        JSON.stringify(data, null, 2),
        (err) => {
          if (err) throw err;
          return data;
        },
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  deleteFolder,
  readJosn,
  writeJosn,
};
