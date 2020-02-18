var baseUrl = 'https://4dm5wtnzqc.execute-api.us-east-1.amazonaws.com/production/';
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var Http = createCORSRequest('GET', baseUrl);
if (!Http) {
  throw new Error('CORS not supported');
}

Http.onreadystatechange = function(){
  if(Http.readyState == 4){
    console.log(Http.status);
    if(Http.status == 200){
        var result = this.responseText;
        var jsonResult = JSON.parse(result);
        switch(jsonResult.function) {
          case 'subscribe':

          default:
            //
        }
    }
    else{
      console.log("Error: ", Http.response);
    }
  }
};

function getRequest(url){
  Http.open('GET',url, true);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send();
}

function postRequest(url, obj){
  Http.open('POST',url,true);
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
}

var subscribeInput = document.getElementById("subscribeInputId");
subscribeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        saveSubscriber();
    }
});

function saveSubscriber() {
    let email = subscribeInput.value;
    email = email && typeof email ? email.replace(/\s/g, '') : '';    //strip spaces
    if(isValidEmail(email)) {
      var url = 'https://4dm5wtnzqc.execute-api.us-east-1.amazonaws.com/production/subscribe';
      postRequest(url, { email: email });
      subscribeInput.value = '';
      subscribeInput.style.setProperty("border", "1px solid green");
      showToast(true);
    } else {
      subscribeInput.style.setProperty("border", "1px solid red");
      showToast(false);
    }

}

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

var subscribeToast = document.getElementById("subscribeToastId");
function showToast(isSuccess) {
    if(isSuccess) {
        subscribeToast.innerHTML = "Thank you for subscribing to Piriko.";
        subscribeToast.style.setProperty("background-color", "lightgreen");
        setTimeout(()=>{
            subscribeInput.style.setProperty("border", "1px solid #ced4da");
            subscribeToast.style.setProperty("display", "none");
        }, 3000);
    } else {
        subscribeToast.innerHTML = "There is a problem with the email. Please check.";
        subscribeToast.style.setProperty("background-color", "#FF3232");
    }
    subscribeToast.style.setProperty("display", "block");

}