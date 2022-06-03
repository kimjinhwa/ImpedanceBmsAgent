var express = require('express');
var router = express.Router();

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
  console.log(req.body);
  res.send(req.body);
  //res.send("OK Well");

})

module.exports = router;
