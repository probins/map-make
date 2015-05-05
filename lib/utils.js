module.exports = {
  // Promise-based XHR (from http://www.html5rocks.com/en/tutorials/es6/promises/)
  // Replace with fetch()?
  httpGet: function (url) {
  return new Promise(
    function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          // success: resolve the promise with the response text
          var response;
          // parse JSON if needed
          if (req.getResponseHeader('content-type').indexOf('application/json') != -1) {
            response = JSON.parse(req.response);
          } else {
            response = req.response;
          }
          resolve(response);
        }
        else {
          // Otherwise reject with the status text
          reject(Error(req.statusText));
        }
      };
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
  });
}
};
