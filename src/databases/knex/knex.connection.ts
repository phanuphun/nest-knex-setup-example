import { Knex } from 'knex';
import { config } from 'dotenv';
import * as path from 'path';
config();
/**
 * - Knex connection instance for Knex CLI and default export
 * - use in knexfile.cjs and app.module.ts  to set up KnexModule.forRoot()
 */
const KnexConnInstant: Knex.Config = {
    client: process.env.DB_DRIVER || 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost-dev-default',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root-dev-default',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'db-dev-default',
    },
    pool: { min: 2, max: 10 },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.resolve(__dirname, 'migrations'),
        extension: 'ts',
        loadExtensions: ['.ts', '.js'],
    },
    seeds: {
        directory: path.resolve(__dirname, 'seeds'),
        extension: 'ts',
        loadExtensions: ['.ts', '.js'],
    },
    debug: false,
}

export default KnexConnInstant;