var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var latest = req.host + "/api/latest/imagesearch"
  var eks = req.host + "/api/imagesearch/car?offset=20"
  res.render('index', { latest: latest, eks: eks });
});

module.exports = router;
