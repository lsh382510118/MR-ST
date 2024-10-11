#!/bin/bash  
  
# 设置你的项目目录路径  
PROJECT_DIR="/path/to/your/project"  
  
# 切换到项目目录  
cd "$PROJECT_DIR" || exit  
  
# 安装依赖  
echo "安装依赖..."  
npm install  
  
# 执行构建命令  
echo "执行构建..."  
npm run build  
  
echo "构建完成！"