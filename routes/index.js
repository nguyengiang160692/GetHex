var express    = require('express');
var Decaptcher = require("de-captcher").decaptcher;
var Tesseract  = require('tesseract.js')
var request    = require('request')
var fs         = require('fs')

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
router.get('/capcha2', function(req, res, next){
    var filename        = Date.now() + '.png';
    var writeFileStream = fs.createWriteStream(__dirname + `/images/${filename}`);
    console.log(writeFileStream);
    request(req.query.url)
        .pipe(writeFileStream)
        .on('close', function(){
            Tesseract.recognize(filename)
                .then(function(result){
                    res.send(result.text);
                })
        })
})

module.exports = router;

