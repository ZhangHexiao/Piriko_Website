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
    console.log(Http.status)
    hideSearchSpinnerEndPoint();
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
}

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

function saveSubscriber() {
    var email = document.getElementById("subscribeInputId").value;
    email = email && typeof email ? email.replace(/\s/g, '') : '';    //strip spaces
    if(isValidEmail(email)) {
      var url = 'https://4dm5wtnzqc.execute-api.us-east-1.amazonaws.com/production/subscribe';
      postRequest(url, { email: email });
      //Todo - show success message
    } else {
      //Todo - show there is a problem with the email error message
    }
}


function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}