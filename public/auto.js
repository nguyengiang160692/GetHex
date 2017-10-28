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
var input_amount   = document.querySelector('[data-fill="#hxt_amount"]');
var capcha_input   = getLastInputWithTypeInZone(inputs, 'text');
var current_btc    = document.getElementById('btc_amount');
capcha_input.value = '';
var submited       = false;
var oldBTC         = readStorage('btc_amount');
var haveOldCapcha  = readStorage('store_capcha', capcha_input);

function saveToStorage(name, value){
    if(typeof(localStorage) !== "undefined"){
        localStorage.setItem(name, value);
    }
}
function readStorage(name, ele){
    var value = localStorage.getItem(name);
    if(typeof(localStorage) !== "undefined")
        if(ele && oldBTC == current_btc.value) ele.value = value;
    return value;
}
function handleSubmit(haveOldCap){
    if(!submited){
        submited = true;
        forms.submit();
        if(haveOldCap != true) window.open(window.location.href, '_blank');
    }
}

setInterval(function(){
    input_amount.click();
    capcha_input.focus();
    if(haveOldCapcha != ''){
        localStorage.setItem('store_capcha', '');
        handleSubmit(true);
        return;
    }
    if(capcha_input.value.length == 4){
        saveToStorage('store_capcha', capcha_input.value);
        saveToStorage('btc_amount', current_btc.value);
        handleSubmit();
        return;
    }
}, 400);

