/**
 *  Steps handler
 */

var Steps = {};

Steps.init = function() {
  this.buildParseUrl();
  this.bindBtn('#step-1-btn', function(e){
    ParseRequest.postData();
    e.preventDefault();
  })
  this.bindBtn('#step-7-btn', function(e){
    ParseRequest.postReceptData();
    e.preventDefault();
  })
}

Steps.buildParseUrl = function() {
  var url = Config.getUrl();
  $('#parse-url').html(url + '/parse');
}

Steps.bindBtn = function(id, callback) {
  $(id).click(callback);
}

Steps.closeStep = function(id) {
  $(id).addClass('step--disabled');
}

Steps.openStep  = function(id) {
  $(id).removeClass('step--disabled');
}

Steps.fillStepOutput  = function(id, data) {
  $(id).html('Output: ' + data).slideDown();
}

Steps.fillStepError  = function(id, errorMsg) {
  $(id).html(errorMsg).slideDown();
}

Steps.fillBtn  = function(id, message) {
  $(id).addClass('success').html('✓  ' + message);
}

Steps.showWorkingMessage = function() {
  $('#step-4').delay(500).slideDown();
}

/**
 *  Parse requests handler
 */

var ParseRequest = {};

ParseRequest.postData = function() {
  XHR.setCallback(function(data){
    // store objectID
    Store.objectId = JSON.parse(data).objectId;
    // close first step
    Steps.closeStep('#step-1');
    Steps.fillStepOutput('#step-1-output', data);
    Steps.fillBtn('#step-1-btn', 'Posted');
    // open second step
    Steps.openStep('#step-2');
    Steps.bindBtn('#step-2-btn', function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  },
  function(error) {
       Steps.fillStepError('#step-1-error', 'There was a failure: ' + error);
   });
  XHR.POST('/parse/classes/GameScore');
};

ParseRequest.getData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-2');
    Steps.fillStepOutput('#step-2-output', data);
    Steps.fillBtn('#step-2-btn', 'Fetched');
    // open third step
    Steps.openStep('#step-3');
    Steps.bindBtn('#step-3-btn', function(e){
      ParseRequest.postCloudCodeData();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-2-error', 'There was a failure: ' + error);
  });  
  XHR.GET('/parse/classes/GameScore');
}

ParseRequest.postCloudCodeData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-3');
    Steps.fillStepOutput('#step-3-output', data);
    Steps.fillBtn('#step-3-btn', 'Tested');
    // open third step
    //Steps.showWorkingMessage();
    // POST noveho usera
    Steps.openStep('#step-5');
    Steps.bindBtn('#step-5-btn', function(e){
      ParseRequest.postNewUser();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-3-error', 'There was a failure: ' + error);
    });  
    XHR.POST('/parse/functions/hello');
}

//API call na POST noveho receptu
ParseRequest.postReceptData = function() {
  XHR.setCallback(function(data){
    // store objectID
    Store.objectId = JSON.parse(data).objectId;
    // close first step
    Steps.closeStep('#step-7');
    Steps.fillStepOutput('#step-7-output', data);
    Steps.fillBtn('#step-7-btn', 'Posted');
    // open second step
    Steps.openStep('#step-8');
    Steps.bindBtn('#step-8-btn', function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  },
  function(error) {
       Steps.fillStepError('#step-7-error', 'There was a failure: ' + error);
   });
  XHR.POSTR('/parse/classes/recept');
};

//API call na GET noveho receptu
ParseRequest.getData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-8');
    Steps.fillStepOutput('#step-8-output', data);
    Steps.fillBtn('#step-8-btn', 'Fetched');
    // open third step
    Steps.openStep('#step-9');
    Steps.bindBtn('#step-9-btn', function(e){
      ParseRequest.postCloudCodeData2();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-8-error', 'There was a failure: ' + error);
  });  
  XHR.GET('/parse/classes/recept');
}
//API call na cloud code
ParseRequest.postCloudCodeData2 = function() {
  XHR.setCallback(function(data){
    // close third step
    Steps.closeStep('#step-9');
    Steps.fillStepOutput('#step-9-output', data);
    Steps.fillBtn('#step-9-btn', 'Tested');
    // POST noveho usera
    Steps.openStep('#step-5');
    Steps.bindBtn('#step-5-btn', function(e){
      ParseRequest.postNewUser();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-9-error', 'There was a failure: ' + error);
    });  
    XHR.POST('/parse/functions/hello');
}

//API call na POST noveho usera
ParseRequest.postNewUser = function() {
  XHR.setCallback(function(data){
    Steps.closeStep('#step-5');
    Steps.fillStepOutput('#step-5-output', data);
    Steps.fillBtn('#step-5-btn', 'New User');
    // get na userov
    Steps.openStep('#step-6');
    Steps.bindBtn('#step-6-btn', function(e){
      ParseRequest.getUserData();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-5-error', 'There was a failure: ' + error);
  });  
  XHR.POSTU('/parse/users');
};

//API call GET na userov
ParseRequest.getUserData = function() {
  XHR.setCallback(function(data){
      Steps.closeStep('#step-6');
      Steps.fillStepOutput('#step-6-output', data);
      Steps.fillBtn('#step-6-btn', 'Users Tested');
      // ukaz success po tomto GETE
      Steps.showWorkingMessage();
    },
    function(error) {
    	Steps.fillStepError('#step-6-error', 'There was a failure: ' + error);
  });  
  XHR.GETU('/parse/users');
};

/**
 * Store objectId and other references
 */

var Store = {
  objectId: ""
};

var Config = {};

Config.getUrl = function() {
  if (url) return url;
  var port = window.location.port;
  var url = window.location.protocol + '//' + window.location.hostname;
  if (port) url = url + ':' + port;
  return url;
}


/**
 * XHR object
 */

var XHR = {};

XHR.setCallback = function(callback, failureCallback) {
  this.xhttp = new XMLHttpRequest();
  var _self = this;
  this.xhttp.onreadystatechange = function() {
    if (_self.xhttp.readyState == 4) {
      if (_self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
        callback(_self.xhttp.responseText);
      } else {
        failureCallback(_self.xhttp.responseText);
      }
    }
  };
}

XHR.POST = function(path, callback) {
  var seed = {"score":1337,"playerName":"Sean Plott","cheatMode":false}
  this.xhttp.open("POST", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

XHR.POSTR = function(path, callback) {
  var seed = {"nazov":"Medovy Kolac","obsah":"nejaky obsah","fotka":{"__type" : "File","name":"/public/assets/images/parse-logo.png"},"hviezdy":5,"datum":JSON.stringify(new Date()),"autorId":"nejaky autor"}
  this.xhttp.open("POST", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

XHR.POSTU = function(path, callback) {
  var seed = {"username":"admin3","password":"admin3","email":"meno3@meno3.sk"}
  this.xhttp.open("POST", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

XHR.GET = function(path, callback) {
  this.xhttp.open("GET", Config.getUrl() + path + '/' + Store.objectId, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}

XHR.GETU = function(path, callback) {
  this.xhttp.open("GET", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}

/**
 *  Boot
 */

Steps.init();
