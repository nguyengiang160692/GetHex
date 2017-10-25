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

router.get('/recap', function(req, res, next){
    var filename        = Date.now() + '.png';
    var writeFileStream = fs.createWriteStream(`./images/${filename}`);
    request(req.query.url)
        .pipe(writeFileStream)
        .on('close', function(){
            console.log(req.query.url, 'saved to', filename)
            Tesseract.recognize(filename)
                .then(function(result){
                    console.log(result.text)
                    res.send(result.text);
                })
            
        })
})

module.exports = router;

