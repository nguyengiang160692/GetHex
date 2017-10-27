var express    = require('express');
var Decaptcher = require("de-captcher").decaptcher;
var Tesseract  = require('tesseract.js')
var request    = require('request')
var fs         = require('fs')
var cloudscraper = require('cloudscraper');

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
    var file_path       = `${global.appRoot}/images/${Date.now() + '.png'}`;
	
	
	  cloudscraper.request({method: 'GET',
                      url:req.query.url,
                      encoding: null,
                      }, function(err, response, body) {

				fs.writeFile(file_path, body,  "binary",function(err) {
			if(err) {
				console.log(err);
			} else {
				 Tesseract.recognize(file_path)
		  .then(function(result){
			   res.send(result.text);
			   console.log('Capcha is: ' +result.text);
		  })
				
			}
		});
		});
})

module.exports = router;

