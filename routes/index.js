var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login/login', { title: 'Login Process' });
});
router.get('/systemConfigure', function (req, res, next) {
  res.render('systemConfigure/systemConfigure', { title: 'System Configuration ' });
});


router.post('/systemConfigure', (req, res) => {

  const jsonFile = fs.readFileSync('databases/systemConfigureData.json', 'utf8');
  console.log(req.body);
  //console.log(jsonFile);
  res.send(jsonFile);
})

module.exports = router;
