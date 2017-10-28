var express      = require('express');
var Decaptcher   = require("de-captcher").decaptcher;
var Tesseract    = require('tesseract.js')
var request      = require('request')
var fs           = require('fs')
var cloudscraper = require('cloudscraper');

var router     = express.Router();
var decaptcher = new Decaptcher("nhantruong", "32541234");
/* GET home page. */
var walkSync = function(dir, filelist){
    var fs   = fs || require('fs'), files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file){
        if(fs.statSync(dir + '/' + file)
                .isDirectory()){
            filelist = walkSync(dir + '/' + file, filelist);
        }else{
            filelist.push(file);
        }
    });
    return filelist;
};
router.get('/', function(req, res, next){
    var file_list  = [];
    var btc_amount = [200, 300];
    walkSync(`${global.appRoot}/public/Hextracoin_files/images`, file_list);
    res.render('index', {
        title     : 'Express',
        image     : file_list[Math.floor(Math.random() * file_list.length)],
        btc_amount: btc_amount[Math.floor(Math.random() * btc_amount.length)]
    });
});
router.get('/capcha', function(req, res, next){
    decaptcher.postPicture(req.query.url, "image/png", function(err, result){
        res.send(result.Text);
    });
});
router.get('/capcha2', function(req, res, next){
    var file_path = `${global.appRoot}/images/${Date.now() + '.png'}`;
    cloudscraper.request({
        method  : 'GET',
        url     : req.query.url,
        encoding: null,
    }, function(err, response, body){
        fs.writeFile(file_path, body, "binary", function(err){
            if(err){
                console.log(err);
            }else{
                Tesseract.recognize(file_path)
                    .then(function(result){
                        res.send(result.text);
                        console.log('Capcha is: ' + result.text);
                    })
            }
        });
    });
})

module.exports = router;

