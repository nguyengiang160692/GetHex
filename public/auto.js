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

var forms          = document.getElementById('ico-form');
var inputs         = forms
    .querySelectorAll("input, select, checkbox, textarea");
var imgs           = forms
    .querySelectorAll("img");
var input_amount   = document.querySelector('[data-fill="#hxt_amount"]');
var capcha_input   = getLastInputWithTypeInZone(inputs, 'text');
capcha_input.value = '';
forms.addEventListener('submit', function(){
    window.open(window.location.href, '_blank');
});
setInterval(function(){
    input_amount.click();
    capcha_input.focus();
}, 100);

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://apipro1.ocr.space/parse/imageurl?apikey=" + api_key + "&url=" + encodeURI(imgs[0].currentSrc), true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200 && capcha_input.value == ''){
        var capcha         = JSON.parse(xhr.responseText).ParsedResults[0].ParsedText.trim();
        capcha_input.value = capcha;
    }
};
xhr.send();

