//validations
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var test = re.test(String(email).toLowerCase());
	var mailValidatorEl = document.getElementById('emailvalidator');
	if(test){
		mailValidatorEl.src = 'img/couponok.png';
	}
	else{
		mailValidatorEl.src = 'img/couponwrong.png';
		var mailInputEl = document.getElementById('buyermail');
		mailInputEl.placeholder = 'please type a valid email !';
	}
	mailValidatorEl.style.display = 'block';
	return test;
}
function validateInt(val){
    var temp = parseInt(val);
    return (!isNaN(temp) && isFinite(temp));
}
function validateCep(val){
    if(!val)
        return false;

    var regexp = /^[0-9]{5}-?[0-9]{3}$/;
    val = val.trim();
    return regexp.test(val);
}

//loading overlay
var shybunnyLoadingOverlay;
function showLoadingOverlay(){
	shybunnyLoadingOverlay = document.createElement('div');
	shybunnyLoadingOverlay.style.background = 'rgba(255, 255, 255, 0.3)';
	shybunnyLoadingOverlay.style.zIndex = 99999999;
	shybunnyLoadingOverlay.style.position = 'fixed';
	shybunnyLoadingOverlay.style.top = 0;
	shybunnyLoadingOverlay.style.left = 0;
	shybunnyLoadingOverlay.style.right = 0;
	shybunnyLoadingOverlay.style.bottom = 0;
	shybunnyLoadingOverlay.style.width = '100%';
	shybunnyLoadingOverlay.style.height = '100%';
	document.body.insertBefore(shybunnyLoadingOverlay, document.body.firstChild);
}

function hideLoadingOverlay(){
	if(shybunnyLoadingOverlay)
		shybunnyLoadingOverlay.remove();
}

var middlepotQueryParams = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
function getQueryParam(param){
	return middlepotQueryParams[param];
}
