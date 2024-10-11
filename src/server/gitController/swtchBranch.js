const nodegit = require('nodegit');  
const path = require('path');
  
async function switchToBranch(repoPath, branchName) {  
    try {  
        // 打开仓库  
        const repo = await nodegit.Repository.open(repoPath);  
  
        // 查找分支引用  
        const reference = await repo.getBranchCommit(`refs/heads/${branchName}`);  
  
        // 切换到分支  
        // 注意：nodegit的checkoutBranch方法可能在不同版本的nodegit中有所不同  
        // 这里的代码可能需要根据你使用的nodegit版本进行调整  
        await repo.checkoutBranch(branchName);  
  
        console.log(`已成功切换到分支 ${branchName}`);  
    } catch (err) {  
        if (err.message.includes('Reference not found')) {  
            console.error(`分支 ${branchName} 不存在`);  
        } else {  
            console.error('切换分支时出错', err);  
        }  
    }  
}  
  
// 使用示例  
switchToBranch(path.join(__dirname, './../application/utils/repositories'), 'release/202408B').catch(console.error);