const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app = express();
port = process.env.PORT || 3000;

const mc = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'ItPulpos2021#',
    database    : 'test_rest'
});
// conexion para base de datos
mc.connect();


app.listen(port);
console.log('todo list RESTful API server ejecuta sobre: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes.js'); //importamos route
routes(app); // registramos la route