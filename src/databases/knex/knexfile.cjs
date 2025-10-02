// this file is the knex configuration file for use knex cli commands
// * knex cli want to read this file as commonjs module
// dot env-flow will load .env, .env.local, .env.[NODE_ENV], .env.[NODE_ENV].local

const path = require('path'); 
const dotenvFlow = require('dotenv-flow');
const ROOT = path.resolve(__dirname, '../../..');  // set root path for knexfile.cjs find .env files at the root directory, ../../.. ==> src/databases/knex
dotenvFlow.config({ path: ROOT, node_env: process.env.NODE_ENV, silent: true });

require('esbuild-register/dist/node').register({
    extensions: ['.ts'],
});

module.exports = require('./knex.connection.ts').default;
