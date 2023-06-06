import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'ketoan',
  username: 'admin',
  password: 'IifOrAyD',
  port: 16677,
  host: 'mysql-130464-0.cloudclusters.net',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false, // false để khi bạn thay đổi trong entities nó sẽ không tự update DB
  dropSchema: false,
  logging: [/*'query',*/ 'error'],
};

export default config;
