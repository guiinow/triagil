import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'db',
  port: Number(process.env.TYPEORM_PORT || 5432),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
  migrations: [path.join(__dirname, 'src/migrations/*{.ts,.js}')],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
});
