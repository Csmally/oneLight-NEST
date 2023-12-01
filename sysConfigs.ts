import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';

const configs = JSON.parse(
  fs.readFileSync(`env.${process.env.NODE_ENV}.json`, 'utf-8'),
);

const dbConfig: TypeOrmModuleOptions = {
  type: configs.dbType, // 数据库类型
  username: configs.dbUsername, // 数据库账号
  password: configs.dbPassword, // 数据库密码
  host: configs.dbHost, // 数据库host
  port: configs.dbPort, // 数据库端口号
  database: configs.dbName, // 数据库名称
  synchronize: configs.dbSynchronize, // 连接到数据库时会自动检查实体类和数据库表之间的差异，并尝试将它们同步（生产环境禁用！！！）
  retryDelay: configs.dbRetryDelay, // 重试连接数据库间隔
  retryAttempts: configs.dbRetryAttempts, // 重试连接数据库次数
  autoLoadEntities: configs.dbAutoLoadEntities, // 自动查找并加载指定目录中的所有实体类
};

const httpsSecretKey = configs.httpsSecretKey;

export { dbConfig, httpsSecretKey };
