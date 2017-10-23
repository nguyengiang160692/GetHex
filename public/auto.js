function getLastInputWithTypeInZone(_inputs, _type){
    var last = null;
    for(var x = 0; x < _inputs.length; x++){
        var child = _inputs[x];
        if(child.type == _type){
            last = child;
        }
    }
    return last;
}

var api_key = "PDMXB4543888A";

var inputs         = document.getElementById('ico-form')
    .querySelectorAll("input, select, checkbox, textarea");
var imgs           = document.getElementById('ico-form')
    .querySelectorAll("img");
var input_amount   = document.querySelector('[data-fill="#hxt_amount"]');
var capcha_input   = getLastInputWithTypeInZone(inputs, 'text');
capcha_input.value = '';
var submited       = false;
setInterval(function(){
    input_amount.click();
    capcha_input.focus();
    
    if(capcha_input.value.length == 4 && submited == false){
        document.forms["ico-form"].submit();
        submited = !submited;
        window.open(window.location.href, '_blank');
    }
}, 100);
setInterval(function(){
    var hour           = document.getElementById('ico-in-hh').innerHTML;
    var minutes        = document.getElementById('ico-in-mm').innerHTML;
    var seconds        = document.getElementById('ico-in-ss').innerHTML;
    var password_input = document.getElementById('password');
    if(password_input == null && (hour == '00' || hour == '23') && (minutes == '00' || minutes == '59') && (parseInt(seconds) < 2 || parseInt(seconds) > 45)){
        window.location.reload();
    }
}, 1000);
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://apipro1.ocr.space/parse/imageurl?apikey=" + api_key + "&url=" + encodeURI(imgs[0].currentSrc), true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200 && capcha_input.value == ''){
        var capcha         = JSON.parse(xhr.responseText).ParsedResults[0].ParsedText.trim();
        capcha_input.value = capcha;
    }
};
xhr.send();

