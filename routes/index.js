var express = require('express');
var router = express.Router();
var fs = require('fs');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/impedancedb');
// console.log("mongodb connection...");
// var db = mongoose.connection;
// db.on('error', function () {
//   console.log('mongodb connetion Failed!');
// });
var db = require('../backend/database')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'BMS관리 시스템' });
});
router.get('/login', function (req, res, next) {
  res.render('login/login', { title: 'Login Process' });
});
router.get('/systemConfigure', function (req, res, next) {
  res.render('systemConfigure/systemConfigure', { title: 'System Configuration ' });
});


router.post('/systemConfigure', (req, res) => {

  var cursor = db.collection('bms_system').find();
  var retString = [];
  cursor.forEach((doc) => {
    retString.push(doc);
  }).then(() => {
    res.send(retString);
  });
})

module.exports = router;

  //  console.log(retString);
  // const jsonFile = fs.readFileSync('databases/systemConfigureData.json', 'utf8');
  // console.log(req.body);
  // res.send(jsonFile);