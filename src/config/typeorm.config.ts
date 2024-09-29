import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

type DBType = 'mysql' | 'postgres';

const isProd = process.env.NODE_ENV === 'prod';

export default (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<DBType>('DB_TYPE')!,
  host: config.get<string>('DB_HOST'),
  port: +config.get<number>('DB_PORT')!,
  database: config.get<string>('DB_NAME'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: !isProd,
});
