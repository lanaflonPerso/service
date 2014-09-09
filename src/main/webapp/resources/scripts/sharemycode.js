/* Set the Log level */
xw.Log.logLevel = "DEBUG";

var ShareMyCode = {
  registerUser: function(props) {
    var cb = function(message, response) {
      ShareMyCode.registerCallback(message, response.status);
    };
    xw.Sys.getWidget("registrationService").post({content:JSON.stringify(props), callback: cb});
  },
    createClassCallback: function(response) {
    xw.Popup.close();
  },
  registerCallback: function(message, status) {
	  var r  = xw.Sys.getObject("serverResponse");
	  var d = xw.Sys.getObject("responseMessage");
      xw.Sys.clearChildren(d);
      var m = document.createTextNode(message);
      d.appendChild(m);
      ShareMyCode.updateResponseStatus(status);
      r.style.display = "block";
  },
  updateResponseStatus: function(status) {
    var s = xw.Sys.getObject("successResponse");
    var f = xw.Sys.getObject("failureResponse");
    switch(status) {
      case 200:
        s.style.display = "block";
        f.style.display = "none";
        break;
      case 400:
      case 404:
      case 500:     
      default:
        s.style.display = "none";
        f.style.display = "block";
    }
  }
};
