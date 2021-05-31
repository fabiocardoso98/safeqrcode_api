const dotenv = require('dotenv');
const { resolve } = require('path');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, 'process.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 5000,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'proj3',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',

  PATH_DATASET: process.env.PATH_DATASET || "./data/dataset/",
  PATH_UPLOADS: process.env.PATH_UPLOADS || "./uploads/",
  PATH_SCRIPT_PY: "C:/Users/FAAVM/Documents/PROJ_3/SCRIPTS_DB/",
  PATH_SCRIPTS_TEMPLATE: process.env.PATH_SCRIPTS_TEMPLATE || "./data/templateScripts/",
  PATH_SCRIPTS: process.env.PATH_SCRIPTS || "./data/createdScripts/",
  PATH_OUTPUTS: process.env.PATH_OUTPUTS || "./data/saveOutputs/",
  PATH_SAVE_MODELS: process.env.PATH_SAVE_MODELS || "./data/saveModels/",
  
} 