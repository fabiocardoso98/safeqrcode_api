const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');
const app = express();
const config = require('./config.js');
//const swaggerUi = require('swagger-ui-express');
//const swaggersjsDoc = require('swagger-jsdoc');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));

//Routes
//app.use('/models', require('./routes/modelos'));

app.get('/', function (req, res) {
    res.send('Bem-vindo a API do safe qr code')
  })

  
{ force: true }

sequelize.sync().then(() => {
  app.listen(config.PORT,config.HOST, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
  });
});

