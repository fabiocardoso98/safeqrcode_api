const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var http = require("http");
const app = express();
const config = require('./config.js');
//const swaggerUi = require('swagger-ui-express');
//const swaggersjsDoc = require('swagger-jsdoc');

app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));

//Routes
app.use('/models', require('./routes/modelos'));
app.use('/dataset', require('./routes/datasets'));
app.use('/source', require('./routes/source'));
app.use('/extension', require('./routes/extension'));
app.use('/loadingMethod', require('./routes/loadingMethod'));
app.use('/scripts', require('./routes/scripts'));

app.get('/', function (req, res) {
    res.send('Bem-vindo a API do projeto 3')
  })

  
{ force: true }

sequelize.sync().then(() => {
  app.listen(config.PORT,config.HOST, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
  });
});

