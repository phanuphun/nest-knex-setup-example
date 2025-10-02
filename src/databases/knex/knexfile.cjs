// this file is the knex configuration file for use knex cli commands
// *knex cli want to read this file as commonjs module

require('dotenv').config();
require('esbuild-register/dist/node').register({
    extensions: ['.ts'],
});

module.exports = require('./knex.connection.ts').default;
