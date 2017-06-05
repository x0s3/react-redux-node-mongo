const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const router = require('./routes/personaRoutes');


mongoose.connect('mongodb://localhost/pruebas', function (err, res) {
    if (err) throw err;
    console.log('Conexión con la base de datos correctamente');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(router);

app.listen(3001, function () {
    console.log("Servidor de node en marcha");
});