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


function insertCellData() {
  let insertData = ``;
  insertData = new Object();
  let nowTime = "";
  nowTime = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
  insertData.cellValue = [0, 0];
  for (let i = 0; i < 180; i++)
    insertData.cellValue[i] = [(Math.random() * (2.4 - 1.75) + 1.75).toFixed(3), (Math.random() * (8.5 - 0.5) + 0.5).toFixed(3)];
  insertData.logDate = nowTime;
  insertData.ecode = 0;
  db.collection("bms_a").insertOne(insertData, (err, res) => {
    if (err) throw err;
    console.log("1 documnet inserted")
  });
  console.log(insertData);
}

router.post('/', (req, res) => {
  let query;
  let tableRef;
  tableRef = req.body.TableName[0];
  query = JSON.parse(req.body.TableName[1]);
  console.log(req.body);//.TableName[0]);
  //console.log(tableRef);

  //주어진 테이블과 쿼리를 갖고 데이타를 선택한후 리턴해 준다
  ///query = '';
  let cursor;

  if (tableRef == "bms_system") {
    //insertCellData();
    cursor = db.collection(req.body.TableName[0])
      .find(query);
  }
  else {
    console.log(tableRef);
    console.log(query);
    cursor = db.collection(tableRef).find(query).sort({ '_id': -1 });
  }
  var retString = [];

  cursor.forEach((doc) => {
    //console.log(doc);
    retString.push(doc);
  }).then(() => {
    //console.log(retString);
    console.log(`request from ${req.socket.remoteAddress}`);
    res.send(retString);
  });
})

router.post('/systemConfigure', (req, res) => {

  let query = JSON.parse(req.body.TableName[1]); //console.log(req.body.TableName[1]);
  var cursor = db.collection(req.body.TableName[0]).find(query);
  var retString = [];

  cursor.forEach((doc) => {
    retString.push(doc);
  }).then(() => {
    console.log(retString);
    res.send(retString);
  });
})

module.exports = router;

  //console.log(query);//{ table_id: 'bms_a' };
  //  console.log(retString);
  // const jsonFile = fs.readFileSync('databases/systemConfigureData.json', 'utf8');
  // console.log(req.body);
  // res.send(jsonFile);
  // cursor.then((cursor) => {
  //   console.log("OK");
  // });
  // cursor.then((result, rejected) => {
  //   if (result)
  //   if (rejected)
  //     console.log("Not OK");
  // });