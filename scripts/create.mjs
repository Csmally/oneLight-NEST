// scripts/create.js

import { execSync } from 'child_process';

// 获取命令行参数
const args = process.argv.slice(2);
// 根据输入参数执行不同的命令
if (args.length === 1) {
  const resourceName = args[0];
  const command = `nest g res ${resourceName} --no-spec`;
  // 执行命令
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else {
  console.error('执行失败');
  process.exit(1);
}
