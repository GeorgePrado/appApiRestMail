'use strict';

 var mysql = require('mysql');

 //local mysql db connection
 var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'ItPulpos2021#',
    database    : 'test_rest'
 });

 connection.connect(function(err){
     if (err) throw err;
 });

 module.exports = connection;