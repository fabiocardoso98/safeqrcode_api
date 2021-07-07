const dotenv = require('dotenv');
const { resolve } = require('path');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, 'process.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 6000,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'safeqrcode',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql'
  
} 