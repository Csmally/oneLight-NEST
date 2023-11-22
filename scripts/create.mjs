// scripts/create.js

import { execSync } from 'child_process';

// 获取命令行参数
const args = process.argv.slice(2);
// 根据输入参数执行不同的命令
const length = args.length;
let command;
if (length === 1 || length === 2) {
  const resourceName = args[0];
  if (length === 1) {
    command = `nest g res ${resourceName} --no-spec`;
  } else {
    if (args[1] === 'sprc') {
      command = `nest g res ${resourceName}`;
    } else {
      console.error('脚本输入有误，执行失败');
      process.exit(1);
    }
  }
  // 执行命令
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else {
  console.error('脚本参数数量错误，执行失败');
  process.exit(1);
}
