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
  //pouzivatel
  this.bindBtn('#step-31-btn', function(e){
    ParseRequest.postNewUser();
    e.preventDefault();
  })
  //recept
  this.bindBtn('#step-21-btn', function(e){
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

// ParseRequest.postData = function() {
//   XHR.setCallback(function(data){
//     // store objectID
//     Store.objectId = JSON.parse(data).objectId;
//     // close first step
//     Steps.closeStep('#step-1');
//     Steps.fillStepOutput('#step-1-output', data);
//     Steps.fillBtn('#step-1-btn', 'Posted');
//     // open second step
//     Steps.openStep('#step-2');
//     Steps.bindBtn('#step-2-btn', function(e){
//       ParseRequest.getData();
//       e.preventDefault();
//     });
//   },
//   function(error) {
//        Steps.fillStepError('#step-1-error', 'There was a failure: ' + error);
//    });
//   XHR.POST('/parse/classes/GameScore');
// };
//
// ParseRequest.getData = function() {
//   XHR.setCallback(function(data){
//     // close second step
//     Steps.closeStep('#step-2');
//     Steps.fillStepOutput('#step-2-output', data);
//     Steps.fillBtn('#step-2-btn', 'Fetched');
//     // open third step
//     Steps.openStep('#step-3');
//     Steps.bindBtn('#step-3-btn', function(e){
//       ParseRequest.postCloudCodeData();
//       e.preventDefault();
//       });
//     },
//     function(error) {
//     	Steps.fillStepError('#step-2-error', 'There was a failure: ' + error);
//   });
//   XHR.GET('/parse/classes/GameScore');
// }

// ParseRequest.postCloudCodeData = function() {
//   XHR.setCallback(function(data){
//     // close second step
//     Steps.closeStep('#step-3');
//     Steps.fillStepOutput('#step-3-output', data);
//     Steps.fillBtn('#step-3-btn', 'Tested');
//     // open third step
//     //Steps.showWorkingMessage();
//     // POST noveho usera
//     Steps.openStep('#step-5');
//     Steps.bindBtn('#step-5-btn', function(e){
//       ParseRequest.postNewUser();
//       e.preventDefault();
//       });
//     },
//     function(error) {
//     	Steps.fillStepError('#step-3-error', 'There was a failure: ' + error);
//     });
//     XHR.POST('/parse/functions/hello');
// }

//API call na POST noveho receptu
ParseRequest.postReceptData = function() {
  XHR.setCallback(function(data){
    // store objectID
    Store.objectId = JSON.parse(data).objectId;
    // close first step
    Steps.closeStep('#step-21');
    Steps.fillStepOutput('#step-21-output', data);
    Steps.fillBtn('#step-21-btn', 'Posted');
    // open second step
    Steps.openStep('#step-22');
    Steps.bindBtn('#step-22-btn', function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  },
  function(error) {
       Steps.fillStepError('#step-21-error', 'There was a failure: ' + error);
   });
  XHR.POSTR('/parse/classes/recept');
};

//API call na GET noveho receptu
ParseRequest.getData = function() {
  XHR.setCallback(function(data){
    // close second step
    Steps.closeStep('#step-22');
    Steps.fillStepOutput('#step-22-output', data);
    Steps.fillBtn('#step-22-btn', 'GET');
    // open third step
    Steps.openStep('#step-23');
    Steps.bindBtn('#step-23-btn', function(e){
      ParseRequest.putRecept();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-22-error', 'There was a failure: ' + error);
  });  
  XHR.GET('/parse/classes/recept');
}

//API call PUT na recept
ParseRequest.putRecept = function() {
  XHR.setCallback(function(data){
        Steps.closeStep('#step-23');
        Steps.fillStepOutput('#step-23-output', data);
        Steps.fillBtn('#step-23-btn', 'Recept put Tested');
        Steps.openStep('#step-24');
        Steps.bindBtn('#step-24-btn', function(e){
          ParseRequest.getReceptsData();
          e.preventDefault();
        });
      },
      function(error) {
        Steps.fillStepError('#step-23-error', 'There was a failure: ' + error);
      });
  XHR.PUTR('/parse/classes/recept');
};

//API call GET na receptov
ParseRequest.getReceptsData = function() {
  XHR.setCallback(function(data){
        Steps.closeStep('#step-24');
        Steps.fillStepOutput('#step-24-output', data);
        Steps.fillBtn('#step-24-btn', 'Recepts Tested');
        Steps.openStep('#step-25');
        Steps.bindBtn('#step-25-btn', function(e){
          ParseRequest.deleteRecept();
          e.preventDefault();
        });
      },
      function(error) {
        Steps.fillStepError('#step-24-error', 'There was a failure: ' + error);
      });
  XHR.GETR('/parse/classes/recept');
};




//API call DELETE  recept
ParseRequest.deleteRecept = function() {
  XHR.setCallback(function(data){
        Steps.closeStep('#step-25');
        Steps.fillStepOutput('#step-25-output', data);
        Steps.fillBtn('#step-25-btn', 'Recept delete Tested');
        // ukaz success po tomto DELETE
        Steps.showWorkingMessage();

      },
      function(error) {
        Steps.fillStepError('#step-25-error', 'There was a failure: ' + error);
      });
  XHR.DEL('/parse/classes/recept');
};



// //API call na cloud code
// ParseRequest.postCloudCodeData2 = function() {
//   XHR.setCallback(function(data){
//     // close third step
//     Steps.closeStep('#step-9');
//     Steps.fillStepOutput('#step-9-output', data);
//     Steps.fillBtn('#step-9-btn', 'Tested');
//     // POST noveho usera
//     Steps.openStep('#step-5');
//     Steps.bindBtn('#step-5-btn', function(e){
//       ParseRequest.postNewUser();
//       e.preventDefault();
//       });
//     },
//     function(error) {
//     	Steps.fillStepError('#step-9-error', 'There was a failure: ' + error);
//     });
//     XHR.POST('/parse/functions/hello');
// }

//API call na POST noveho usera
ParseRequest.postNewUser = function() {
  XHR.setCallback(function(data){
    Store.objectId = JSON.parse(data).objectId;
    Steps.closeStep('#step-31');
    Steps.fillStepOutput('#step-31-output', data);
    Steps.fillBtn('#step-31-btn', 'New User');
    // get na userov
    Steps.openStep('#step-32');
    Steps.bindBtn('#step-32-btn', function(e){
      ParseRequest.getUser();
      e.preventDefault();
      });
    },
    function(error) {
    	Steps.fillStepError('#step-31-error', 'There was a failure: ' + error);
  });  
  XHR.POSTU('/parse/classes/pouzivatel');
};

//API call na GET noveho pouzivatela
ParseRequest.getUser= function() {
  XHR.setCallback(function(data){
        // close second step
        Steps.closeStep('#step-32');
        Steps.fillStepOutput('#step-32-output', data);
        Steps.fillBtn('#step-32-btn', 'Get user');
        // open third step
        Steps.openStep('#step-33');
        Steps.bindBtn('#step-33-btn', function(e){
          ParseRequest.putUser();
          e.preventDefault();
        });
      },
      function(error) {
        Steps.fillStepError('#step-32-error', 'There was a failure: ' + error);
      });
  XHR.GET('/parse/classes/pouzivatel');
}

//API call PUT na user
ParseRequest.putUser = function() {
  XHR.setCallback(function(data){
        Steps.closeStep('#step-33');
        Steps.fillStepOutput('#step-33-output', data);
        Steps.fillBtn('#step-33-btn', 'Put user tested');
        Steps.openStep('#step-34');
        Steps.bindBtn('#step-34-btn', function(e){
          ParseRequest.getUsers();
          e.preventDefault();
        });
      },
      function(error) {
        Steps.fillStepError('#step-33-error', 'There was a failure: ' + error);
      });
  XHR.PUTU('/parse/classes/pouzivatel');
};

//API call GET na userov
ParseRequest.getUsers = function() {
  XHR.setCallback(function(data){
      Steps.closeStep('#step-34');
      Steps.fillStepOutput('#step-34-output', data);
      Steps.fillBtn('#step-34-btn', 'Users Tested');
        Steps.openStep('#step-35');
        Steps.bindBtn('#step-35-btn', function(e){
          ParseRequest.deletePouzivatel();
          e.preventDefault();
        });
    },
    function(error) {
    	Steps.fillStepError('#step-34-error', 'There was a failure: ' + error);
  });  
  XHR.GETU('/parse/classes/pouzivatel');
};

//API call DELETE  pouzivatel
ParseRequest.deletePouzivatel = function() {
  XHR.setCallback(function(data){
        Steps.closeStep('#step-35');
        Steps.fillStepOutput('#step-35-output', data);
        Steps.fillBtn('#step-35-btn', 'Pouzivatel DELETE Tested');
        // ukaz success po tomto DELETE
        Steps.showWorkingMessage();

      },
      function(error) {
        Steps.fillStepError('#step-34-error', 'There was a failure: ' + error);
      });
  XHR.DEL('/parse/classes/pouzivatel');
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
  var seed = {"nazov":"Medovy Kolac","obsah":"nejaky obsah"
    ,"fotka":{"__type" : "File","name":"/public/assets/images/parse-logo.png"},
    "hviezdy":5,"datum":JSON.stringify(new Date()),"pouzivatel":{"autorId":"nejaky autor"}};
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

//DELETE recept, pouzivatel
XHR.DEL = function(path, callback) {
  this.xhttp.open("DELETE", Config.getUrl() + path + '/' + Store.objectId, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}


//PUT recept
XHR.PUTR = function(path, callback) {
  var seed = {"obsah":"updated recept"};
  this.xhttp.open("PUT", Config.getUrl() + path+ '/' + Store.objectId, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

//PUT user
XHR.PUTU = function(path, callback) {
  var seed = {"username":"updatedAdmin"};
  this.xhttp.open("PUT", Config.getUrl() + path+ '/' + Store.objectId, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(JSON.stringify(seed));
}

//GET ZOZNAM RECEPTOV
XHR.GETR = function(path, callback) {
  this.xhttp.open("GET", Config.getUrl() + path, true);
  this.xhttp.setRequestHeader("X-Parse-Application-Id", $('#appId').val());
  this.xhttp.setRequestHeader("Content-type", "application/json");
  this.xhttp.send(null);
}

/**
 *  Boot
 */

Steps.init();
