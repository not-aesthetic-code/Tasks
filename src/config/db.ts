import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  autoLoadEntities: Boolean(true),
  synchronize: Boolean(true),
};
