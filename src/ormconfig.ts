import { ConnectionOptions } from 'typeorm';
import config from './config';

const ormconfig : ConnectionOptions = {
    type: 'postgres',
    host: config.postgresDB.host,
    port: config.postgresDB.port,
    username: config.postgresDB.username,
    password: config.postgresDB.password,
    database: config.postgresDB.database,
    synchronize: false,
    subscribers: [],
    logger: 'simple-console',
    entities: [
      `${__dirname}/domain/*.js`,
      `${__dirname}/domain/*.ts`
    ],
    migrationsTableName: 'custom_migration_table',
    migrations: [
      `${__dirname}/migration/*.js`,
      `${__dirname}/migration/*.ts`
    ],
    cli: {
      'migrationsDir': 'migration'
    }
}

export default ormconfig;