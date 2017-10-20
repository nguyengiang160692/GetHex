var express    = require('express');
var Decaptcher = require("de-captcher").decaptcher;
var router     = express.Router();
var decaptcher = new Decaptcher("nhantruong", "32541234");
/* GET home page. */
router.get('/', function(req, res, next){
    res.render('index', {title: 'Express'});
});

router.get('/capcha', function(req, res, next){
    
    decaptcher.postPicture(req.query.url, "image/png", function(err, result){
        res.send(result.Text);
    });
});

module.exports = router;
