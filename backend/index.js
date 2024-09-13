import express from 'express'
import setupDatabase from './dbConnection/dbConnection.js';

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  console.log('start');
  await setupDatabase()
  console.log('end');
});