function getLastInputWithTypeInZone(e, t){
    for(var a = null, n = 0; n < e.length; n++){
        var o = e[n];
        o.type == t && (a = o)
    }
    return a
}
function saveToStorage(e, t){"undefined" != typeof localStorage && localStorage.setItem(e, t)}
function readStorage(e, t){
    var a = localStorage.getItem(e);
    return "undefined" != typeof localStorage && t && (t.value = a), a
}
function handleSubmit(e){submited || (submited = !0, forms.submit(), 1 != e && window.open(window.location.href, "_blank"))}
var forms                        = document.getElementById("ico-form"),
    inputs                       = forms.querySelectorAll("input, select, checkbox, textarea"),
    input_amount                 = document.querySelector('[data-fill="#hxt_amount"]'),
    hidden_secret                = document.querySelector('[name="captcha_secret"]'),
    capcha_input                 = getLastInputWithTypeInZone(inputs, "text");
capcha_input.value               = "";
var submited = !1, haveOldCapcha = readStorage("store_capcha", capcha_input),
    haveOldSecret                = readStorage("hidden_secret");
setInterval(function(){return input_amount.click(), capcha_input.focus(), "" != haveOldCapcha && haveOldSecret == hidden_secret.value ? (handleSubmit(!0), void localStorage.setItem("store_capcha", "")) : 4 == capcha_input.value.length ? (saveToStorage("store_capcha", capcha_input.value), saveToStorage("hidden_secret", hidden_secret.value), void handleSubmit()) : void 0}, 400);