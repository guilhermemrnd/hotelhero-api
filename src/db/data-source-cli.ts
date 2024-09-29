import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

type DBType = 'mysql' | 'postgres';

const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as DBType,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
