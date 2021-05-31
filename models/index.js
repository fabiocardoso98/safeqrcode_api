const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const db = {}
const config = require('../config.js');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: config.DB_DIALECT
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
