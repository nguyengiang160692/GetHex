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
var forms          = document.getElementById('ico-form');
var inputs         = forms
    .querySelectorAll("input, select, checkbox, textarea");
var imgs           = forms
    .querySelectorAll("img");
var input_amount   = document.querySelector('[data-fill="#hxt_amount"]');
var capcha_input   = getLastInputWithTypeInZone(inputs, 'text');
capcha_input.value = '';

forms.addEventListener('submit', function(){
    //window.open(window.location.href, '_blank');
    alert('Đã submit rùi chờ may mắn thôi !');
});
var timeout    = 1000;
var time_count = 0;
setInterval(function(){
    if(time_count < timeout){
        input_amount.click();
        capcha_input.focus();
        time_count += 100;
    }
}, 100);

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://188.166.246.121:8080/capcha2?url=" + encodeURI(imgs[0].currentSrc), true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200 && capcha_input.value == ''){
        var capcha         = xhr.responseText.trim();
        capcha_input.value = capcha;
    }
};
xhr.send();

